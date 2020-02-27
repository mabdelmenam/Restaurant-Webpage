function customTip() { // onkeyup function for checking the format of the tip value entered
    const custom_btn = document.getElementById('custom-tip-btn');
    var custom_tip = document.getElementById('custom-tip');
    var custom_err = document.getElementById('custom-err');
    tipRegex = /^\d*(\.\d{1,2})?$/;
    if (tipRegex.test(custom_tip.value)) {
        custom_err.innerHTML = " ";
        custom_btn.disabled = false;
    }
    else if (custom_tip.value == "" || custom_tip.value == " ") {
        custom_err.innerHTML = 'Do not leave blank';
        custom_btn.disabled = true;
    }
    else {
        custom_err.innerHTML = 'No characters except decimals';
        custom_btn.disabled = true;
    }
    return custom_tip.value
}
function cardInfo(id) { // onkey up function for checking the format of the card information
    var checkout_btn = document.getElementById('checkout-btn');

    var cardnum = document.getElementById('cardnum');
    var expiration = document.getElementById('expiration');
    var code = document.getElementById('code');

    var cardnum_error = document.getElementById('cardnum-error');
    var expiration_error = document.getElementById('expiration-error');
    var code_error = document.getElementById('code-error');

    if (id == "cardnum") {
        cardRegex = /\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b/;
        if (cardRegex.test(cardnum.value)) {
            cardnum_error.innerHTML = " ";
            checkout_btn.disabled = false;
        }
        else if (cardnum.value == "" || cardnum.value == " ") {
            cardnum_error.innerHTML = "Do not leave blank";
            checkout_btn.disabled = true;
        }
        else {
            cardnum_error.innerHTML = "Please Enter the correct format";
            checkout_btn.disabled = true;
        }
    }
    else if (id == "expiration") {
        expirationRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
        if (expirationRegex.test(expiration.value)) {
            expiration_error.innerHTML = " ";
            checkout_btn.disabled = false;
        }
        else if (expiration.value == "" || expiration.value == " ") {
            expiration_error.innerHTML = "Do not leave blank";
            checkout_btn.disabled = true;
        }
        else {
            expiration_error.innerHTML = "Please Enter the correct format";
            checkout_btn.disabled = true;
        }
    }
    else if (id == "code") {
        codeRegex = /^[0-9]{3,4}$/;
        if (codeRegex.test(code.value)) {
            code_error.innerHTML = " ";
            checkout_btn.disabled = false;
        }
        else if (code.value == "" || code.value == " ") {
            code_error.innerHTML = "Do not leave blank";
            checkout_btn.disabled = true;
        }
        else {
            code_error.innerHTML = "Please Enter the correct format";
            checkout_btn.disabled = true;
        }
    }
}

var deliveryTips;

function send_Tips(x) { //function for calculating subtotal, tax, tip, and total, while changing the html display
    if (x == "custom-tip-btn") {
        x = customTip();
    }
    var file = "http://localhost:8000/visual_change";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var tip = document.getElementById("tip-value");
            var subtotal = document.getElementById('subtotal-value');
            var tax = document.getElementById('tax-value');
            var total = document.getElementById('total-value');

            var subandTax = parseFloat(subtotal.innerHTML) + parseFloat(tax.innerHTML);
            if (x == customTip()) { // if the number in the tip is a custom one then just print it out
                tip.innerHTML = x;
            } else {// if its not then take the subtotal and multiply it by ' x ' which will only  be a percent
                tip.innerHTML = (x * parseFloat(subandTax)).toFixed(2);
            }
            deliveryTips = tip.innerHTML;

            total.innerHTML = (subandTax + parseFloat(tip.innerHTML)).toFixed(2); //subtotal + tax + the tips that are in either of the if statements
        }
    };

    xhttp.open("GET", file, true);
    xhttp.send();
}
/**--------------------------------------------------------------------------------------------------------------------------------- */
function paymentFinal() {
    console.log(deliveryTips);
    var cardnum = document.getElementById('cardnum');
    var expiration = document.getElementById('expiration');
    var code = document.getElementById('code');
    var instruction = document.getElementById('del-ins-text');
    var total = document.getElementById('total-value');

    var file = "http://localhost:8000/final_details";

    var info = {
        tip: deliveryTips,
        cardnum: cardnum.value,
        expiration: expiration.value,
        code: code.value,
        total: total.innerHTML,
        ins: instruction.value
    };

    var finalData = JSON.stringify(info);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        }
    };

    xhttp.open("POST", file, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(finalData);
}