const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('main-image');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeLightbox = document.getElementById('close-lightbox');
const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.getElementById('cart-dropdown');
const addToCart = document.getElementById('add-to-cart');
const quantityElement = document.getElementById('quantity');
let quantity = 0;

// Change main image on thumbnail click
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    mainImage.src = `images/image-product-${index + 1}.jpg`;
  });
});

// Show lightbox
mainImage.addEventListener('click', () => {
  lightbox.style.display = 'flex';
  lightboxImage.src = mainImage.src;
});

// Close lightbox
closeLightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Increment and decrement quantity
document.getElementById('increment').addEventListener('click', () => {
  quantity++;
  quantityElement.textContent = quantity;
});

document.getElementById('decrement').addEventListener('click', () => {
  if (quantity > 0) quantity--;
  quantityElement.textContent = quantity;
});

// Add to cart
addToCart.addEventListener('click', () => {
  if (quantity > 0) {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = `
      <div>
        <img src="${mainImage.src}" alt="Cart Item">
        <span>Quantity: ${quantity}</span>
      </div>`;
    cartDropdown.style.display = 'block';
  }
});

// Toggle cart dropdown
cartIcon.addEventListener('click', () => {
  cartDropdown.style.display =
    cartDropdown.style.display === 'block' ? 'none' : 'block';
});
