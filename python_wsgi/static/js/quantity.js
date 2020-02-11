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


//Add Button
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

function dropdown() {
    var dropdown = document.getElementById("dropdown-content");
    //var dropdown2 = dropdown.document.querySelectorAll('h1,a');
    console.log(dropdown);
    //console.log(dropdown.classList);
    var x = dropdown.style.display = 'block';
    dropdown.classList.toggle(x);

    console.log("clicked");
}