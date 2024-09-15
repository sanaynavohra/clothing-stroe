// Function to update the cart display (optional)
function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('#cart-count').textContent = cartCount; // Update the cart count in the UI
}

// Function to handle 'Add to Cart' button clicks
function addToCart(event) {
    const button = event.target;
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Event listeners to 'Add to Cart' buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Initialize the cart display
    updateCartDisplay();
});
