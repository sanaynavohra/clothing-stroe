document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');
    const checkoutForm = document.getElementById('checkout-form');
    const popupMessage = document.getElementById('popup-message');
    const closePopupButton = document.getElementById('close-popup');

    // Load the cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartUI(); // Initialize the cart UI

    // Function to update the cart UI
    function updateCartUI() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            checkoutButton.disabled = true;
            totalPriceElement.innerText = '0.00';
        } else {
            let total = 0;
            cartItemsContainer.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody id="cart-table-body">
                    </tbody>
                </table>
            `;
            const cartTableBody = document.getElementById('cart-table-body');

            cart.forEach((item, index) => {
                const itemRow = document.createElement('tr');
                itemRow.innerHTML = `
                    <td>${item.name}</td>
                    <td>$${item.price}</td>
                    <td><button class="remove-item" data-index="${index}">Remove</button></td>
                `;
                cartTableBody.appendChild(itemRow);
                total += parseFloat(item.price);
            });

            totalPriceElement.innerText = total.toFixed(2);
            checkoutButton.disabled = false;

            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', removeItemFromCart);
            });
        }

        // Update cart count
        cartCountElement.innerText = cart.length;
    }

    // Function to remove an item from the cart
    function removeItemFromCart(event) {
        const itemIndex = event.target.getAttribute('data-index');
        cart.splice(itemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI(); // Call this to update the UI after removal
    }

    // Add event listener for the checkout button
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            console.log('Checkout button clicked'); // Debugging line
            console.log('Cart contents:', cart); // Debugging line
            if (cart.length > 0) {
                window.location.href = 'checkout.html'; // Navigate to checkout.html
            } else {
                console.log('Cart is empty, cannot proceed to checkout.'); // Debugging line
            }
        });
    }

    // Handle form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the form from submitting normally

            // Display the popup message
            popupMessage.style.display = 'block';

            // Optional: Redirect after a delay
            setTimeout(() => {
                window.location.href = 'thank-you.html'; // Redirect to a thank you page or similar
            }, 3000); // 3 seconds delay
        });
    }

    // Close the popup
    if (closePopupButton) {
        closePopupButton.addEventListener('click', () => {
            popupMessage.style.display = 'none';
        });
    }
});
