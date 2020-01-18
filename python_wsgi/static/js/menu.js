function loadCategory(currentDiv, file) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      window.onload = plusButton();
      document.getElementById(currentDiv).innerHTML = xhttp.responseText;
    }
  };

  xhttp.open("GET", file, true);
  //console.log(xhttp.send());
  xhttp.send();
}
function plusButton() {
  //create condition here to run, based on true or false of user logged in or not
  //if user is logged in then continue on with the script and create the buttons,
  // if not then do nothing
  /**
   * if valid is 1 in json, then run this function
   */
  //   <button class="plus-btn"><i class="fa fa-plus"></i></button>
  var file = "http://localhost:8000/check_session";

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log('MENU RESPONSE TEXT: ', this.responseText);
      var session_active = JSON.parse(this.responseText);
      if (session_active.active == 1) { //BEGIN IF STATEMENT
        var paragraphs = document.querySelectorAll("[id='food']");

        for (var i = 0; i < paragraphs.length; i++) {// BEGIN FOR LOOP
          var buttonTag = document.createElement('button');
          buttonTag.className = 'plus-btn';
          //buttonTag.addEventListener("click", modalControl(), false);

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




//function modalControl() {
var btn = document.getElementsByClassName('plus-btn');
if (btn) {
  console.log("exsists");
}
var modal = document.getElementById('modal');
var closebtn = document.getElementById('modal-close');
console.log("clicked1");
btn.onclick = function () {
  console.log("clicked");
  modal.style.display = 'block';
}
closebtn.onclick = function () {
  modal.style.display = 'none';
}
window.onclick = function () {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
//}

