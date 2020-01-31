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
}