var names = [];
var prices = [];
var foodDisplay = document.getElementById("modal-food-heading");
var priceDisplay = document.getElementById("modal-food-price");
var finalPrice = document.getElementById("final-price");
var modal = document.getElementsByClassName('modal');
var closebtn = document.getElementById('modal-close');

/**Loading into different HTML files */
function loadCategory(currentDiv, file) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      names = [];
      prices = [];
      window.onload = plusButton();
      setTimeout(function () { //setting a timer waiting for plusButton to completely finish
        window.onload = food();
      }, 100);
      document.getElementById(currentDiv).innerHTML = xhttp.responseText;
    }
  };

  xhttp.open("GET", file, true);
  xhttp.send();
}

/**Plus Button functionality, and checking current session status */
function plusButton() {
  var file = "http://localhost:8000/check_session";

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var session_active = JSON.parse(this.responseText);

      if (session_active.active == 1) { //BEGIN IF STATEMENT
        var paragraphs = document.querySelectorAll("[id='food']");

        for (var i = 0; i < paragraphs.length; i++) {// BEGIN FOR LOOP
          var foodName = paragraphs[i].childNodes[1].innerHTML;
          var foodPrice = paragraphs[i].getElementsByTagName('b')[0].innerHTML;
          prices.push(foodPrice)
          names.push(foodName);
          //console.log(foodName + " " + i);
          var buttonTag = document.createElement('button');
          buttonTag.className = 'plus-btn';
          buttonTag.id = i;

          var iTag = document.createElement('i');
          iTag.className = 'fa fa-plus';

          buttonTag.appendChild(iTag);
          paragraphs[i].insertBefore(buttonTag, paragraphs[i].childNodes[2]);

        } // END FOR LOOP
      }// END IF STATEMENT
    }
  };
  xhttp.open("GET", file, true);
  //xhttp.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
  xhttp.withCredentials = true;
  xhttp.send(null);
}
window.onload = plusButton();
window.onload = food();


/**Creating onclick functions for plus buttons in buttonClass, and modal functionality */
var buttonClass = document.getElementsByClassName('plus-btn');
var num;

function food() {
  setTimeout(function () {
    console.log(prices);

    var handler = function (index) {
      modal[0].style.display = 'block';

      foodDisplay.innerHTML = names[index];
      priceDisplay.innerHTML = prices[index];
      finalPrice.innerHTML = "$" + 0;

      num = parseFloat(prices[index].replace("$", "")); //Taking the food price and converting it to a float, removing the ' $ '

      console.log();
    };
    console.log("ButtonClass: ", buttonClass);
    console.log("Button Class Length: ", buttonClass.length);
    for (var i = 0; i < buttonClass.length; i++) {
      buttonClass[i].onclick = (function () {
        var currI = i;
        return function () {
          handler(currI);
        }
      })();
    }
  }, 400);
}
//modal functionality
closebtn.onclick = function () {
  modalReset();
}

function modalReset() {
  modal[0].style.display = 'none';
  document.getElementById("food-instructions").value = "";
  document.getElementById('quantity').innerHTML = 0;
  counter = 0;
  num2 = 0;
}