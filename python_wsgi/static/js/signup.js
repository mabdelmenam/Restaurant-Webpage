const signupButton = document.getElementById("sign-up-btn");

var username = document.getElementById("username");
var password = document.getElementById("password");
var fname = document.getElementById("first-name");
var lname = document.getElementById("last-name");
var email = document.getElementById("email");
var pnumber = document.getElementById("phone-number");
var address = document.getElementById("address");
var zipcode = document.getElementById("zipcode");

var user_error = document.getElementById("user-error");
var pass_error = document.getElementById("pass-error");
var fname_error = document.getElementById("Fname-error");
var email_error = document.getElementById("email-error");
var pnumber_error = document.getElementById("phone-error");
var address_error = document.getElementById("address-error");
var zipcode_error = document.getElementById("zip-error");

//Username Validation
username.addEventListener("keyup", function(event) {
  userRegex = /^([a-zA-Z0-9_!~]{5,16})$/;
  if (userRegex.test(username.value)) {
    user_error.innerHTML = " ";
    signupButton.disabled = false;
  } else if (username.value == "" || username.value == " ") {
    user_error.innerHTML = "Please do not leave blank";
    signupButton.disabled = true;
  } else {
    user_error.innerHTML =
      "Username must consist of 5-16 characters with no spaces,</br>Can only include characters, '_ ! ~'";
    signupButton.disabled = true;
  }
});
//Password Validation
password.addEventListener("keyup", function(event) {
  passRegex = /^([a-zA-Z0-9@!~$#]{8,21})$/;
  if (password.value == "password") {
    pass_error.innerHTML = "Password cannot be ' password ' ";
    signupButton.disabled = true;
  } else if (passRegex.test(password.value)) {
    pass_error.innerHTML = " ";
    signupButton.disabled = false;
  } else if (password.value == "" || password.value == " ") {
    pass_error.innerHTML = "Please do not leave blank";
    signupButton.disabled = true;
  } else {
    pass_error.innerHTML =
      "Password must consist of 8-21 characters,</br>Can only include characters, '@ ! ~ $ #";
    signupButton.disabled = true;
  }
});
//First Name Validation
fname.addEventListener("keyup", function(event) {
  var nameRegex = /^[a-zA-Z]+$/;
  if (nameRegex.test(fname.value)) {
    fname_error.innerHTML = " ";
    signupButton.disabled = false;
  } else if (fname.value == "" || fname.value == " ") {
    fname_error.innerHTML = "Please do not leave blank";
    signupButton.disabled = true;
  } else {
    fname_error.innerHTML =
      "Please remove any non-alphabetical characters, spaces, or numbers.";
    signupButton.disabled = true;
  }
});

//Last Name Validation
lname.addEventListener("keyup", function(event) {
  var nameRegex = /^[a-zA-Z]+$/;
  if (nameRegex.test(lname.value)) {
    fname_error.innerHTML = " ";
    signupButton.disabled = false;
  } else if (lname.value == "" || lname.value == " ") {
    fname_error.innerHTML = "Please do not Last name leave blank";
    signupButton.disabled = true;
  } else {
    fname_error.innerHTML =
      "Please remove any non-alphabetical characters, spaces, or numbers.";
    signupButton.disabled = true;
  }
});
//Email Validation
email.addEventListener("keyup", function(event) {
  isValidEmail = email.checkValidity();

  if (isValidEmail) {
    email_error.innerHTML = " ";
    signupButton.disabled = false;
  } else if (email.value == "" || email.value == " ") {
    email_error.innerHTML = "Please do not leave blank";
    signupButton.disabled = true;
  } else {
    email_error.innerHTML = "Please enter a correct email.";
    signupButton.disabled = true;
  }
});
//Phone Number Validation
pnumber.addEventListener("keyup", function(event) {
  var phoneRegex = /^[\d]{3}[\s-]?[\d]{3}[\s-]?[\d]{4}$/;
  console.log("Test function: ", phoneRegex.test(pnumber.value));

  if (phoneRegex.test(pnumber.value)) {
    pnumber_error.innerHTML = " ";
    signupButton.disabled = false;
  } else if (pnumber.value == "" || pnumber.value == " ") {
    pnumber_error.innerHTML = "Please do not leave blank";
    signupButton.disabled = true;
  } else {
    pnumber_error.innerHTML =
      "Please follow these formats: </br>2013334444,</br>201-333-4444 , or</br>201 333 4444";
    signupButton.disabled = true;
  }
});

//Address Validation
address.addEventListener("keyup", function(event) {
  if (address.value == "" || address.value == " ") {
    address_error.innerHTML = "Please do not leave blank";
    signupButton.disabled = true;
  } else {
    address_error.innerHTML = " ";
    signupButton.disabled = false;
  }
});

//ZipCode Validation
zipcode.addEventListener("keyup", function(event) {
  var zipRegex = /^\b\d{5}(?:-\d{4})?\b$/;

  if (zipRegex.test(zipcode.value)) {
    zipcode_error.innerHTML = " ";
    signupButton.disabled = false;
  } else if (zipcode.value == "" || zipcode.value == " ") {
    zipcode_error.innerHTML = "Please do not leave blank";
    signupButton.disabled = true;
  } else {
    zipcode_error.innerHTML =
      "Please follow one or the other format: </br>12345 ,</br>12345-6789";
    signupButton.disabled = true;
  }
});

function ajaxSignup() {
  var file = "http://localhost:8000/json_test";

  var info = {
    user: username.value,
    password: password.value,
    fname: fname.value,
    lname: lname.value,
    email: email.value,
    phone_num: pnumber.value,
    home_address: address.value,
    zipcode: zipcode.value
  };

  var finalData = JSON.stringify(info);

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // getting Unexpected token error because of the response text coming from the <h1>Data Stored</h1>, it is not a json so
      //parsing that text will lead to this error, due to trying to parse something that is not Json and is just a string
      var userValidity = JSON.parse(this.responseText);
      console.log("JSON: ", this.responseText, "\n", userValidity);
      if (userValidity.valid == 0) {
        user_error.innerHTML = "Username already exists.";
        signupButton.disabled = true;
      } else if (userValidity.valid == 1) {
        window.location =
          "http://localhost:8000/loginPage";
      }
    } else {
      console.log(
        "Status: ",
        this.status,
        "\nFALSE: ",
        this.responseText,
        "\n"
      );
    }
  };

  xhttp.open("POST", file, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(finalData);

  //console.log(finalData);
}
