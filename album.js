
// This condition makes sure the JS file will only execute after HTML body is fully loaded,
// so the JS code can manipulate the HTML elements inside the DOM Tree.
// It's important to have this at the beginning of all JS files.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}




// The ready() is kind of like main(), it contains the main logic of the program and calls other functions
function ready() {

    // -- remove buttons --
    // This variable is an array that contains all buttons that has the class name 'danger-btn'
    var remove_cart_item_buttons = document.getElementsByClassName('danger-btn')
    console.log(remove_cart_item_buttons)  // debugging purpose
    for (var i = 0; i < remove_cart_item_buttons.length; i += 1) {
        remove_cart_item_buttons[i].addEventListener('click', remove_cart_item)
    }

    // -- quantity input fields --
    var quantity_inputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantity_inputs.length; i += 1) {
        quantity_inputs[i].addEventListener('change', quantity_changed)
    }

    // -- Add to cart buttons --
    var add_to_cart_buttons = document.getElementsByClassName('add-to-cart-btn')
    for (var i = 0; i < add_to_cart_buttons.length; i += 1) {
        add_to_cart_buttons[i].addEventListener('click', add_to_cart_clicked)
    }

    // -- Purchase button --
    document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchased_clicked)


}






function remove_cart_item(event) {
    var button_clicked = event.target
    button_clicked.parentElement.parentElement.remove()
    update_cart_total()
}

function update_cart_total() {
    // The getElementsByClassName returns an array of elements, but we only want the first element
    var cart_item_container = document.getElementsByClassName('cart-items')[0]
    var cart_rows = cart_item_container.getElementsByTagName("tr")

    var total = 0

    // It starts from the second row, since the first row is the headers
    for (var i = 1; i < cart_rows.length; i += 1) {
        // Again, we only want the first one
        var price_element = cart_rows[i].getElementsByClassName('cart-item-price')[0]
        var quantity_element = cart_rows[i].getElementsByClassName('cart-quantity-input')[0]

        // The above only gets the element, now we get the actual values we want inside these elements
        // The replace method will strip away the $ sign
        // The parseFloat method will convert the string to float, so we can do math on it
        var price = parseFloat(price_element.innerText.replace('$', ''))
        var quantity = quantity_element.value

        total += price * quantity
    }
    // This rounds the total to 2 decimal places
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-price')[0].innerText = '$' + total
}


function quantity_changed(event) {
    var input = event.target
    // isNaN = is Not a Number. The user might leave the input field blank or enter negative numbers
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    update_cart_total()
}


// To add an item to cart, we need the [image, name, price]
function add_to_cart_clicked(event) {
    var button = event.target
    var shop_item = button.parentElement.parentElement
    var image_src = shop_item.getElementsByTagName('img')[0].src
    var name = shop_item.getElementsByClassName('shop-item-name')[0].innerText
    var price = shop_item.getElementsByClassName('shop-item-price')[0].innerText

    add_item_to_cart(image_src, name, price)
    update_cart_total()
}


// We first create a new row, give it the same HTML code, give it the same class name (so CSS applies),
// and append it to the shopping cart table.  This syntax ${} creates a JS variable inside HTML code
function add_item_to_cart(image_src, name, price) {
    var cart_row = document.createElement('tr')
    cart_row.classList.add('cart-row')
    var cart_items = document.getElementsByClassName('cart-items')[0]
    // To make sure the users don't add the same shop-item to the cart
    var cart_item_names = cart_items.getElementsByClassName('cart-item-name')
    for (var i = 0; i < cart_item_names.length; i += 1) {
        if (cart_item_names[i].innerText === name) {
            alert('This item is already added to the cart')
            return
        }
    }

    cart_row.innerHTML = `
            <td><img src="${image_src}" width="50" height="50" alt="How you like that album"><span class="cart-item-name">${name}</span></td>
            <td class="cart-item-price"> ${price} </td>
            <td><input class="cart-quantity-input" type="number" value="1"><button class="danger-btn">REMOVE</button></td>`
    cart_items.append(cart_row)
    // The new remove buttons don't have EventListener, because the adding EventListeners was done when the page was loaded.
    cart_row.getElementsByClassName('danger-btn')[0].addEventListener('click', remove_cart_item)
    // The same for the new quantity inputs.
    cart_row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantity_changed)
}


function purchased_clicked() {
    alert('Thank you for your purchase')
    var cart_rows = document.getElementsByClassName('cart-row')
    // This clears the array
    while (cart_rows.length > 0) {
        cart_rows[0].remove()
    }
    update_cart_total()
}




