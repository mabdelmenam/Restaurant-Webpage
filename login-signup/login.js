var username = document.getElementById("user");
var password = document.getElementById("password");

var user_error = document.getElementById("user-login-error");
var password_error = document.getElementById("pass-login-error");

/*username.addEventListener("keyup", function(event) {
  // Use both these functions after response text
});

password.addEventListener("keyup", function(event) {});*/

function ajaxLogin() {
  //function start
  var file = "";

  var info = {
    user: username.value,
    password: password.value
  };

  var finalData = JSON.stringify(info);

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.readyState == 200) {
      var redirectLink = "http://localhost/delivery-project/menu/menu.html";
      console.log(this.responseText);
    }
  };
  xhttp.open("POST", file, true);
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
