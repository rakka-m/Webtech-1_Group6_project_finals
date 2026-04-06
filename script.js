// All the elements in menubar buttons
const searchForm = document.querySelector('.search-form');
const shoppingCart = document.querySelector('.shopping-cart');
const loginForm = document.querySelector('.login-form');
const navbar = document.querySelector('.nav-links');

// 2. Menu Button (This makes the Home/About links show up)
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
};

// 3. Search Button
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
};

// 4. Shopping Cart Button
document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
};

// 5. Login Button
document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
};

// 6. Close everything when you scroll
window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
};

//nav links for phone
// Select all dropdown items
let dropdowns = document.querySelectorAll('.nav-links .dropdown');

dropdowns.forEach(drop => {
    drop.onclick = (e) => {
        // Toggle the 'active' class on the clicked dropdown
        drop.classList.toggle('active');
        
        // This prevents the link from actually navigating to index.html 
        // if the user is just trying to open the menu
        if(window.innerWidth <= 768) {
            e.stopPropagation(); 
        }
    }
});



//Shop now page!!!
let cart = [];

// Listen for Add to Cart clicks
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.price} x ${item.quantity}</small>
                </div>
                <span>${item.price * item.quantity}</span>
            </div>
        `;
    });

    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('tax').innerText = tax.toFixed(2);
    document.getElementById('total-price').innerText = total.toFixed(2);
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function checkout() {
    if (cart.length === 0) {
        alert("Warning: Your cart is empty!");
        return;
    }

    let receipt = "Thank you for purchasing at Aling Nena Store!\n\n--- RECEIPT ---\n";
    cart.forEach(item => {
        receipt += `${item.name} (x${item.quantity}): ${item.price * item.quantity}\n`;
    });
    receipt += `\nTotal Paid (Inc. Tax): ${document.getElementById('total-price').innerText}`;
    
    alert(receipt);
    clearCart();
}

//shop recipt

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const receiptDetails = document.getElementById('receipt-details');
    const receiptTotal = document.getElementById('receipt-total');
    let detailsHTML = "";

    // Loop through cart to create the "Name x Quantity - Price" lines
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        detailsHTML += `
            <div class="receipt-item">
                <span>${item.name} (x${item.quantity})</span>
                <span>₱${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    // Set the HTML and the Final Price
    receiptDetails.innerHTML = detailsHTML;
    receiptTotal.innerText = document.getElementById('total-price').innerText;

    // Show the Modal
    document.getElementById('receipt-modal').style.display = "block";
}

function closeReceipt() {
    document.getElementById('receipt-modal').style.display = "none";
    clearCart(); // Resets the store after the customer is done
}
