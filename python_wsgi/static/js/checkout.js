function checkout() {
    //AJAX PORTION
    var file = "http://localhost:8000/json_test";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var info = document.getElementById('order-details');

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/html"); //getting page from response text
            var info2 = xmlDoc.getElementById('order-details');

            info.innerHTML = info2.innerHTML;
            console.log('After: ', info.innerHTML);
        }
    };

    xhttp.open("GET", file, true);
    xhttp.send();
}
function del_button(id) {
    var z;

    if (id == "ins-btn") {
        z = "del-ins-text";
    } else if (id == "cash") {
        z = "cash-display";
    } else if (id == "card") {
        z = "credit-display";
    }
    var x = document.getElementById(z);
    var y = x.style.display = 'block';
    x.classList.toggle(y);



}
window.onload = checkout();