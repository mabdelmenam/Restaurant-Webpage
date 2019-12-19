var username = document.getElementById("user");
var password = document.getElementById("password");

var login_error = document.getElementById("login-error");

function ajaxLogin() {
  //function start
  var file = "http://localhost:8000/login_validate";

  var info = {
    user: username.value,
    password: password.value
  };

  var finalData = JSON.stringify(info);

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log("RESPONSE TEXT == ", this.responseText);
      var redirectLink = "http://localhost/delivery-project/menu/menu.html";
      var loginValidity = JSON.parse(this.responseText);

      if (loginValidity.valid == 0) {
        login_error.innerHTML = "Invalid Credentials, try again.";
        setTimeout(function () {
          login_error.innerHTML = "";
        }, 3500);
      }
      else {
        window.location = redirectLink;

      }
    }
  };
  xhttp.open("POST", file, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(finalData);
} //function end

function login(id) {
  if (id == "login") {
    window.location.replace("/delivery-project/login-signup/loginPage.html");
  } else if (id == "title") {
    window.location.replace("/delivery-project/index.html");
  } else if (id == "sign-up-btn") {
    window.location.replace("/delivery-project/login-signup/sign-up.html");
  }
}
