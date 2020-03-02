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
            //console.log('After: ', info.innerHTML);
        }
    };

    xhttp.open("GET", file, true);
    xhttp.send();
}
function food_details() {
    var file = "http://localhost:8000/final_details";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var table = document.getElementById('final-table');
            var subtotal = document.getElementById('subtotal-value')
            var tax = document.getElementById('tax-value')


            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/html"); //getting page from response text
            var tds = xmlDoc.getElementById('final-table');

            var subtotalValue = xmlDoc.getElementById('subtotal-value');
            var taxValue = xmlDoc.getElementById('tax-value');
            table.innerHTML = tds.innerHTML;
            subtotal.innerHTML = subtotalValue.innerHTML;
            tax.innerHTML = taxValue.innerHTML;
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

    var tip = document.getElementById("tip-title");
    var tip_value = document.getElementById('tip-value');
    var checkout_btn = document.getElementById('checkout-btn');

    if (id == "ins-btn") {
        z = "del-ins-text";
        var x = document.getElementById(z);
        var y = x.style.display = 'block';
        x.classList.toggle(y);
    } else if (id == "cash") {
        display.innerHTML = cash_display.innerHTML;
        tip.style.display = 'none'; // Making the tip display in the total values not appear since a tip would be given cash
        tip_value.style.display = 'none';

        send_Tips(0); //call the ajax function with the tip set as ' 0 ' so it would by default send back the subtotal and tax
        checkout_btn.disabled = false;


    } else if (id == "card") {
        display.innerHTML = credit_display.innerHTML;
        tip.style.display = 'inline-block';
        tip_value.style.display = 'block';
    }
}
window.onload = checkout();
window.onload = food_details();


