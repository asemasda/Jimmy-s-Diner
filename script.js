import { menuArray } from './data.js';

let totalAmount = 0;

const menuContainer = document.getElementById('menuItemDiv');
const completeBtn=document.getElementById('completeBtn')
const paymentForm =document.getElementById('paymentForm')
menuContainer.innerHTML = ''; 

menuArray.forEach((item) => {
    const menuItemDiv = document.createElement('div');
    menuItemDiv.classList.add('all');

    const emoji = document.createElement('span');
    emoji.textContent = item.emoji;
    emoji.classList.add('item-icon');

    const containerText = document.createElement('div');
    containerText.classList.add('item-details');

    const name = document.createElement('h3');
    name.textContent = item.name;

    const ingredients = document.createElement('p');
    ingredients.textContent = `Ingredients: ${item.ingredients.join(', ')}`;

    const price = document.createElement('p');
    price.textContent = `Price: $${item.price}`;

    containerText.appendChild(name);
    containerText.appendChild(ingredients);
    containerText.appendChild(price);

    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('add-item');
    addButton.addEventListener('click', () => addToOrder(item));

    menuItemDiv.appendChild(emoji);
    menuItemDiv.appendChild(containerText);
    menuItemDiv.appendChild(addButton);
    menuContainer.appendChild(menuItemDiv);
});


function addToOrder(item) {
    console.log(`Added: ${item.name}`);

    const yourOrder = document.getElementById('order-item');
    yourOrder.classList.add('order');

    let orderHeading = document.querySelector('.order-title');
    if (!orderHeading) {
        orderHeading = document.createElement('h2');
        orderHeading.classList.add('order-title');
        orderHeading.textContent = 'Your Order';
        yourOrder.prepend(orderHeading);
    }

    const orderItem = document.createElement('div');
    orderItem.classList.add('order-click');

    const itemName = document.createElement('span');
    itemName.classList.add('order-name');
    itemName.textContent = item.name;
    orderItem.appendChild(itemName);

    const orderPrice = document.createElement('span');
    orderPrice.classList.add('order-price');
    orderPrice.textContent = ` $${item.price}`;
    orderItem.appendChild(orderPrice);

    const removeClick = document.createElement('span');
    removeClick.classList.add('remove-click');
    removeClick.textContent = ' remove';
    removeClick.addEventListener('click', () => removeFromOrder(orderItem, item.price));

    orderItem.appendChild(removeClick);
    yourOrder.appendChild(orderItem);

    totalAmount += item.price;
    updateTotalPrice();
}


function removeFromOrder(orderItem, price) {
    orderItem.remove();
    totalAmount -= price;
    updateTotalPrice();

    const yourOrder = document.getElementById('order-item');
    
    if (yourOrder.children.length === 1) { 
        document.querySelector('.order-title')?.remove();
        document.querySelector('.total-price')?.remove();
        document.querySelector('.order')?.remove();
    }
}


function updateTotalPrice() {
    let totalPriceElement = document.querySelector('.total-price');

    if (totalAmount > 0) {
        if (!totalPriceElement) {
            totalPriceElement = document.createElement('h2');
            totalPriceElement.classList.add('total-price');
            completeBtn.classList.add('complete-order')
            totalPriceElement.innerHTML = `<span class="total-label">Total price:</span> <span class="total-amount">$${totalAmount.toFixed(2)}</span>`;
            completeBtn.style.display = 'block';
            

            
            document.getElementById('order-item').insertAdjacentElement('afterend', totalPriceElement);
        } else {
            let totalAmountSpan = totalPriceElement.querySelector('.total-amount');
            totalAmountSpan.textContent = `$${totalAmount.toFixed(2)}`;
        }
    
    } else {
        totalPriceElement?.remove();
        completeBtn.style.display = 'none';
    }
    completeBtn.addEventListener('click',()=>{
        paymentForm.style.visibility = 'visible';  
        paymentForm.style.opacity = '1';
    })
    
}

const payBtn = document.getElementById('payBtn');
payBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const thanksInput = document.getElementById('thanksInput');
    const fullName = document.getElementById('fullName').value;
    const yourOrder = document.getElementById('order-item'); 

    if (fullName.trim() !== "") {
        thanksInput.textContent = `Thanks, ${fullName}! Your order is on its way!`;
    }

    
    paymentForm.style.display = "none";
    thanksInput.style.visibility="visible"

    yourOrder.innerHTML = "";
    yourOrder.style.display = "none"; 

    const totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.remove();
    }

    totalAmount = 0;

    completeBtn.style.display = "none";
});

