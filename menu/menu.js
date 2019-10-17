function loadCategory(currentDiv, file){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById(currentDiv).innerHTML = xhttp.responseText;
        }
    }

    xhttp.open('GET', file, true);
    xhttp.send();
}