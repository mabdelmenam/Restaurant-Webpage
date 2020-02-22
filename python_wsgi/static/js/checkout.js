function checkout() {
    // AJAX PORTION
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
    var display = document.getElementById('display');
    var cash_display = document.getElementById('cash-display');
    var credit_display = document.getElementById('credit-display');

    if (id == "ins-btn") {
        z = "del-ins-text";
        var x = document.getElementById(z);
        var y = x.style.display = 'block';
        x.classList.toggle(y);
    } else if (id == "cash") {
        display.innerHTML = cash_display.innerHTML;
    } else if (id == "card") {
        display.innerHTML = credit_display.innerHTML;
    }
}
window.onload = checkout();