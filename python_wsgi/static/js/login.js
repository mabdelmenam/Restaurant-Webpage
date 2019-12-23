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
      var redirectLink = "http://localhost:8000/menu";
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
    window.location.replace("http://localhost:8000/loginPage");
  } else if (id == "title") {
    window.location.replace("http://localhost:8000");
  } else if (id == "sign-up-btn") {
    window.location.replace("http://localhost:8000/signup");
  }
}

function logout() {
  var xhttp = new XMLHttpRequest();

  route = 'http://localhost:8000/drop_session';
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      window.location = "http://localhost:8000/loginPage";
    }
  };
  xhttp.open('POST', route, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.withCredentials = true;
  xhttp.send(null);
}


/*window.onload = (function check_UserActivity() {
  var file = "http://localhost:8000/check_session";
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log('MENU RESPONSE TEXT: ', this.responseText);
      // var session_active = JSON.parse(this.responseText);
      //if(session_active == 1){
      //remove login button and show logout button, or just show logout button
      // }
    }
  };
  xhttp.open("GET", file, true);
  xhttp.withCredentials = true;
  xhttp.send(null);
})*/