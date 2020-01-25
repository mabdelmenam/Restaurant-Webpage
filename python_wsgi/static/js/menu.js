var arr = [];
var foodDisplay = document.getElementById("modal-food-heading");
var modal = document.getElementsByClassName('modal');
var closebtn = document.getElementById('modal-close');

function loadCategory(currentDiv, file) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      window.onload = plusButton();
      window.onload = food();
      document.getElementById(currentDiv).innerHTML = xhttp.responseText;
    }
  };

  xhttp.open("GET", file, true);
  xhttp.send();
}
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
          arr.push(foodName);
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
  xhttp.withCredentials = true;
  xhttp.send(null);
}
window.onload = plusButton();
window.onload = food();

function food(){
  var buttonClass = document.getElementsByClassName('plus-btn');
  setTimeout(function () {
    console.log(buttonClass)
  console.log(buttonClass.length)
      var handler = function (index) {
      console.log("3")
      // var u = document.getElementById(index);
      modal[0].style.display = 'block';
      foodDisplay.innerHTML = arr[index];
      //console.log(u);
      console.log();
    };
  
    for (var i = 0; i < buttonClass.length; i++) {
      buttonClass[i].onclick = (function () {
        var currI = i;
        return function () {
          handler(currI);
        }
      })();
    }
  }, 15);
}

//modal functionality
closebtn.onclick = function () {
  modal[0].style.display = 'none';
}