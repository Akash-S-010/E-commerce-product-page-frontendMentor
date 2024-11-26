// Quantity Increment and Decrement
let quantity = 0; // Initialize quantity
const quantityDisplay = document.getElementById("quantity")
const incrementBtn = document.getElementById("increment")
const decrementBtn = document.getElementById("decrement")

// Update the quantity display
const updateQuantityDisplay = () => {
    quantityDisplay.textContent = quantity;
}

// Increment quantity
incrementBtn.addEventListener("click", () => {
    quantity++
    updateQuantityDisplay()
})

// Decrement quantity
decrementBtn.addEventListener("click", () => {
    if (quantity > 0) {
        quantity--
    }
    updateQuantityDisplay()
})

// Cart Functionality
const addToCartBtn = document.querySelector(".add-to-cart-button")
const cartIconNum = document.querySelector(".cart-icon-num")
const cartDropdown = document.querySelector(".cart-dropdown")
const cartItemsContainer = document.querySelector("#cart-items")
const cartIcon = document.querySelector("#cart-icon")

let cart = [] // Cart array to store items

// Product Details
const productName = document.querySelector(".product-details h1").textContent
const productPrice = parseFloat(
    document.querySelector(".discounted-price").textContent.replace("$", "")
)

// Add to Cart Functionality
addToCartBtn.addEventListener("click", () => {
    if (quantity > 0) {
        // Check if item already exists in the cart
        const existingItemIndex = cart.findIndex(item => item.name === productName)
        
        if (existingItemIndex > -1) {
            // Update quantity if item already in cart
            cart[existingItemIndex].quantity += quantity
        } else {
            // Add new item to cart
            cart.push({ name: productName, price: productPrice, quantity })
        }

        // Update cart icon count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
        cartIconNum.textContent = totalItems
        cartIconNum.style.display = totalItems > 0 ? "flex" : "none"

        // Reset quantity
        quantity = 0
        updateQuantityDisplay()

        // Update dropdown content
        updateCartDropdown()
    }
})

// Update the cart dropdown content
const updateCartDropdown = () => {
    cartItemsContainer.innerHTML = "" // Clear existing content

    let totalPrice = 0

    // Add items to the dropdown
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity
        totalPrice += itemTotal

        const cartItemHTML = `
            <div class="cart-item">
                <img src="path-to-thumbnail" alt="product image" />
                <p>${item.name}<br>
                    <span>$${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</span>
                </p>
                <i class="fa fa-trash remove-item" data-name="${item.name}"></i>
            </div>
        `
        cartItemsContainer.innerHTML += cartItemHTML
    })


    // Add functionality to remove items
    const removeButtons = cartItemsContainer.querySelectorAll(".remove-item")
    removeButtons.forEach(button => {
        button.addEventListener("click", event => {
            const itemName = event.target.getAttribute("data-name")
            removeItemFromCart(itemName)
        })
    })
}

// Remove item from cart
const removeItemFromCart = (itemName) => {
    cart = cart.filter(item => item.name !== itemName)

    // Update cart icon count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    cartIconNum.textContent = totalItems
    cartIconNum.style.display = totalItems > 0 ? "flex" : "none"

    // Update dropdown content
    updateCartDropdown()
}

// Show/Hide Cart Dropdown
cartIcon.addEventListener("click", () => {
    cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block"
})
const checkoutButton = document.getElementById("checkout")

checkoutButton.addEventListener("click", () => {
    window.location.href = "/index.html"; // Redirect to home
});


// Lightbox Functionality
const largeImage = document.querySelector(".large-image img")
const thumbnails = document.querySelectorAll(".thumbnail-container img")
const lightbox = document.querySelector(".lightbox")
const lightboxImage = document.querySelector(".lightbox-image")
const lightboxClose = document.querySelector(".lightbox-close")
const prevButton = document.querySelector(".prev-button")
const nextButton = document.querySelector(".next-button")
let currentThumbnailIndex = 0

// Open lightbox
largeImage.addEventListener("click", () => {
    lightbox.style.display = "flex"
    lightboxImage.src = largeImage.src
})

// Close lightbox
lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none"
})

// Change lightbox image
const updateLightboxImage = () => {
    lightboxImage.src = thumbnails[currentThumbnailIndex].src
}

// Previous Image
prevButton.addEventListener("click", () => {
    currentThumbnailIndex =
        (currentThumbnailIndex - 1 + thumbnails.length) % thumbnails.length
    updateLightboxImage()
})

// Next Image
nextButton.addEventListener("click", () => {
    currentThumbnailIndex = (currentThumbnailIndex + 1) % thumbnails.length
    updateLightboxImage()
})

// Highlight active thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        currentThumbnailIndex = index
        updateLightboxImage()
        thumbnails.forEach(thumb => thumb.classList.remove("active-thumbnail"))
        thumbnail.classList.add("active-thumbnail")
    });
});
