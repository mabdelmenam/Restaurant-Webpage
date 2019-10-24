function login(id) {
  if (id == "login") {
    window.location.replace("/delivery-project/login-signup/loginPage.html");
  } else if (id == "title") {
    window.location.replace("/delivery-project/index.html");
  } else if (id == "sign-up-btn") {
    window.location.replace("/delivery-project/login-signup/sign-up.html");
  }
}
const email = document.getElementById("email");
const signupButton = document.getElementById("sign-up-btn");

if (email) {
  console.log("Yes");
} else {
  console.log("No");
}
email.addEventListener("keyup", function(event) {
  isValidEmail = email.checkValidity();

  if (isValidEmail) {
    signupButton.disabled = false;
  } else {
    signupButton.disabled = true;
  }
});
