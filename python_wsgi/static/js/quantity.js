/**Quantity counter */
var counter = 0;
var num2 = 0;
function foodQuantity(id) {
    var quantity = document.getElementById("quantity");
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
            console.log(subtotalValue)
            table.innerHTML = tds.innerHTML;
            subtotal.innerHTML = subtotalValue.innerHTML;
            console.log('After: ', table.innerHTML);
        }
    };

    xhttp.open("GET", file, true);
    xhttp.send();

}