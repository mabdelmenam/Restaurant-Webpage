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
window.onload = function plusButton() {
  /**
   * if valid is 1 in json, then run this function
   */
  //   <button class="plus-btn"><i class="fa fa-plus"></i></button>
  var paragraphs = document.querySelectorAll("[id='food']");
 
  for(var i = 0; i< paragraphs.length; i++){
    console.log(paragraphs[i]);
    var buttonTag = document.createElement('button');
    buttonTag.className = 'plus-btn';

    var iTag = document.createElement('i');
    iTag.className = 'fa fa-plus';

    buttonTag.appendChild(iTag);

    paragraphs[i].insertBefore(buttonTag, paragraphs[i].childNodes[2]);
  }
}
