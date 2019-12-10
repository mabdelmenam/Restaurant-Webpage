function loadCategory(currentDiv, file) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(xhttp.responseText);
      document.getElementById(currentDiv).innerHTML = xhttp.responseText;
    }
  };

  xhttp.open("GET", file, true);
  //console.log(xhttp.send());
  xhttp.send();
}
function plusButton() {
  /*var content = document.getElementById('content');
  var paragraphs = document.getElementsByTagName('p').content;
  var plusBtn = document.getElementsByClassName("plus-btn");*/

  /**
   * if valid is 1 in json, then run this function
   */

  var paragraphs = document.querySelector('.content p').style.color = 'red';
  console.log(paragraphs);
}
