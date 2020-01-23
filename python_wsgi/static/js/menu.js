var arr = [];
var foodDisplay = document.getElementById("modal-food-heading");
var modal = document.getElementsByClassName('modal');
var closebtn = document.getElementById('modal-close');

function loadCategory(currentDiv, file) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      window.onload = plusButton();
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

          var iTag = document.createElement('i');
          iTag.className = 'fa fa-plus';

          buttonTag.appendChild(iTag);
          paragraphs[i].insertBefore(buttonTag, paragraphs[i].childNodes[2]);

          buttonTag.onclick = function () {
            modal[0].style.display = 'block';
          }
        } // END FOR LOOP
      }// END IF STATEMENT
      var buttonClass = document.getElementsByClassName('plus-btn');
      console.log("Button Class Length: ", buttonClass.length);
      x = buttonClass.length;
      console.log("X: " + x);
      for (var i = 0; i < buttonClass.length; i++) {
        console.log(buttonClass[i]);
        buttonClass[i].onclick = (function (i) {
          food(arr[i]);
        })(i);
      }
    }
  };
  xhttp.open("GET", file, true);
  xhttp.withCredentials = true;
  xhttp.send(null);
}
window.onload = plusButton();

/*document.getElementById('cell' + i).onclick = (function (i) {
  return function () { select(i); }
})(i);*/
function food(foodName) {
  console.log("yo: ", foodName);
  foodDisplay.innerHTML = foodName;
}
//modal functionality
closebtn.onclick = function () {
  modal[0].style.display = 'none';
}
