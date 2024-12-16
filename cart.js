// Select elements for interaction
const cartItems = [];
const cartList = document.querySelector('.cart ul');
const cartTotal = document.querySelector('.total');
const confirmOrderButton = document.querySelector('.confirm-order');

// Add functionality for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', (event) => {
    const itemElement = event.target.closest('.item');
    const itemName = itemElement.querySelector('h3').textContent;
    const itemPrice = parseFloat(itemElement.querySelector('p').textContent.replace('$', ''));
    const existingItem = cartItems.find((item) => item.name === itemName);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    }

    updateCart();
  });
});

// Update the cart UI
function updateCart() {
  cartList.innerHTML = '';

  let total = 0;

  cartItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${item.name} (${item.quantity}x)</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    `;

    cartList.appendChild(listItem);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Order Total: $${total.toFixed(2)}`;
}

// Add functionality for quantity buttons (for selected items)
document.querySelectorAll('.quantity button').forEach((button) => {
  button.addEventListener('click', (event) => {
    const action = event.target.textContent; // "+" or "-"
    const quantitySpan = event.target.parentElement.querySelector('span');
    const itemElement = event.target.closest('.item');
    const itemName = itemElement.querySelector('h3').textContent;
    const itemPrice = parseFloat(itemElement.querySelector('p').textContent.replace('$', ''));

    const existingItem = cartItems.find((item) => item.name === itemName);

    if (action === '+') {
      existingItem ? existingItem.quantity++ : cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
    } else if (action === '-' && existingItem) {
      existingItem.quantity--;
      if (existingItem.quantity <= 0) {
        const index = cartItems.indexOf(existingItem);
        cartItems.splice(index, 1);
      }
    }

    quantitySpan.textContent = existingItem ? existingItem.quantity : 0;
    updateCart();
  });
});

// Confirm order
confirmOrderButton.addEventListener('click', () => {
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert('Thank you for your order!');
    cartItems.length = 0;
    updateCart();
  }
});
