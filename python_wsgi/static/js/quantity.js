/**Quantity counter */
var counter = 0;
var num2 = 0;
function foodQuantity(id) {
    var quantity = document.getElementById("quantity");
    var add_button = document.getElementById("add-button");
    //console.log("num in quanitty: ", num);
    if (id == "quantity-plus") {
        counter++;
        num2 += num;
        finalPrice.innerHTML = "$" + num2;
    } else {
        counter--;
        num2 -= num;
        finalPrice.innerHTML = "$" + num2;
        if (counter < 0 || num2 < 0) {
            num2 = 0;
            counter = 0;
            finalPrice.innerHTML = "$" + num2;
            quantity.innerHTML = counter;
            return;
        }
    }
    quantity.innerHTML = counter;
    if (counter > 0) {
        add_button.disabled = false;
    } else {
        add_button.disabled = true;
    }
    console.log(num2);
}


//Add Button inside of modal
var addButton = document.getElementById("add-button");
addButton.onclick = function () {
    var foodDB = foodDisplay.innerHTML;
    var finalPriceDB = num2.toFixed(2);
    var quantityDB = parseInt(document.getElementById("quantity").innerHTML);
    var instructionsDB = document.getElementById('food-instructions').value;

    var info = {
        food: foodDB,
        price: finalPriceDB,
        quantity: quantityDB,
        food_instructions: instructionsDB
    };
    console.log(info.price);
    var finalData = JSON.stringify(info);
    var file = "http://localhost:8000/food_database";

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log("RESPONSE: ", this.responseText);
        }
    };

    xhttp.open("POST", file, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(finalData);

    modalReset();
}
//END OF ADD BUTTON FOR MODAL

function dropdown() {
    var dropdown = document.getElementById("dropdown-content");
    var y = dropdown.style.display = 'block';
    dropdown.classList.toggle(y);

    window.addEventListener("mouseup", function () { //Clicking anywhere out of dropdown to close it
        if (!dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });

    //AJAX PORTION
    var file = "http://localhost:8000/food_database";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var table = document.getElementById('dropdown-table');
            var subtotal = document.getElementById('subtotal-value')

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(this.responseText, "text/html"); //getting page from response text
            var tds = xmlDoc.getElementById('dropdown-table');

            var subtotalValue = xmlDoc.getElementById('subtotal-value');
            //console.log(subtotalValue)
            table.innerHTML = tds.innerHTML;
            subtotal.innerHTML = subtotalValue.innerHTML;
            //console.log('After: ', table.innerHTML);
        }
    };

    xhttp.open("GET", file, true);
    xhttp.send();

}

function deleteFood(rowClient, rowID) {
    data = JSON.stringify(rowID);
    var file = "http://localhost:8000/visual_change";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var subtotal = document.getElementById('subtotal-value');
            var singlePrice = document.getElementById(`single-price-${rowID}`);

            deleteR(rowClient); //deleting row clicked on, display only ----> data variable will be deleted in backend SQL
            var x = document.getElementById(rowID);
            if (x == null) {
                return;
            }
            x.onclick(); // deleting the second row with the description

            subtotal.innerHTML = (parseFloat(subtotal.innerHTML) - parseFloat(singlePrice.innerHTML)).toFixed(2);

        }
    };

    xhttp.open("POST", file, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(data);

}
/************************************************************************************************************ */
// Helper function:
function upTo(el, tagName) {
    tagName = tagName.toLowerCase();

    //console.log("ELEMENT: ", el, "\nPARENT NODE: ", el.parentNode);

    while (el && el.parentNode) {
        el = el.parentNode;
        if (el.tagName && el.tagName.toLowerCase() == tagName) {
            return el;
        }
    }
    return null;
}

function deleteR(el) {
    var row = upTo(el, 'tr')
    if (row) {
        row.parentNode.removeChild(row);
    }
}