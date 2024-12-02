let quantity = 0;
const quantityDisplay = document.getElementById("quantity");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const largeImage = document.querySelector(".large-image img");
const thumbnails = document.querySelectorAll(".thumbnail");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const addToCartBtn = document.querySelector(".add-to-cart-button");
const cartIconNum = document.querySelector(".cart-icon-num");
const cartDropdown = document.querySelector(".cart-dropdown");
const cartItemsContainer = document.querySelector("#cart-items");
const cartIcon = document.querySelector("#cart-icon");
const checkoutButton = document.getElementById("checkout");

let currentThumbnailIndex = 0;
let cart = [];

// Update quantity display
const updateQuantityDisplay = () => {
    quantityDisplay.textContent = quantity;
};

// Increment/Decrement quantity
incrementBtn.addEventListener("click", () => {
    quantity++;
    updateQuantityDisplay();
});

decrementBtn.addEventListener("click", () => {
    if (quantity > 0) quantity--;
    updateQuantityDisplay();
});

// Add item to the cart
addToCartBtn.addEventListener("click", () => {
    const productName = document.querySelector(".product-details h1").textContent;
    const productPrice = parseFloat(
        document.querySelector(".discounted-price").textContent.replace("$", "")
    );

    if (quantity > 0) {
        const existingItemIndex = cart.findIndex(item => item.name === productName);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({ name: productName, price: productPrice, quantity });
        }

        updateCartDisplay();
        quantity = 0;
        updateQuantityDisplay();
    }
});

// Update the cart dropdown
const updateCartDisplay = () => {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartIconNum.style.display = "none";
        return;
    }

    let totalItems = 0;
    cart.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        totalItems += item.quantity;

        const cartItemHTML = `
            <div class="cart-item">
                <img src="path-to-thumbnail" alt="Product Image" />
                <p>${item.name}<br>
                    <span>$${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal}</span>
                </p>
                <i class="fa fa-trash remove-item" data-name="${item.name}"></i>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItemHTML;
    });

    cartIconNum.textContent = totalItems;
    cartIconNum.style.display = "flex";

    // Add remove functionality to trash icons
    const removeButtons = cartItemsContainer.querySelectorAll(".remove-item");
    removeButtons.forEach(button => {
        button.addEventListener("click", event => {
            const itemName = event.target.getAttribute("data-name");
            removeFromCart(itemName);
        });
    });
};

// Remove an item from the cart
const removeFromCart = (itemName) => {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
};

// Toggle cart dropdown visibility
cartIcon.addEventListener("click", () => {
    cartDropdown.style.display =
        cartDropdown.style.display === "block" ? "none" : "block";
});

// Checkout button functionality
checkoutButton.addEventListener("click", () => {
    window.location.href = "/index.html"; // Redirect to the home page
});

// Lightbox functionality
largeImage.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImage.src = largeImage.src;
});

lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none";
});

prevButton.addEventListener("click", () => {
    currentThumbnailIndex =
        (currentThumbnailIndex - 1 + thumbnails.length) % thumbnails.length;
    updateLightboxImage();
});

nextButton.addEventListener("click", () => {
    currentThumbnailIndex = (currentThumbnailIndex + 1) % thumbnails.length;
    updateLightboxImage();
});

// Thumbnail functionality
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        currentThumbnailIndex = index;
        largeImage.src = thumbnail.src.replace("-thumbnail", "");
        updateLightboxImage();

        thumbnails.forEach(thumb => thumb.classList.remove("active-thumbnail"));
        thumbnail.classList.add("active-thumbnail");
    });
});

// Update lightbox image
const updateLightboxImage = () => {
    lightboxImage.src = thumbnails[currentThumbnailIndex].src.replace("-thumbnail", "");
};
