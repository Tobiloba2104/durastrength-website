// ===============================
// DURASTRENGTH WEBSITE JAVASCRIPT
// ===============================


// BUSINESS WHATSAPP NUMBER
const WHATSAPP_NUMBER = "2349032874636";


// CART
let cart = [];


// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {

    const navMenu = document.getElementById("navMenu");

    navMenu.classList.toggle("active");

}


// ===============================
// ADD PRODUCT TO CART
// ===============================

function addToCart(name, price) {

    const existingProduct = cart.find(

        item => item.name === name

    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cartCount");

    const cartTotal = document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;

    let totalItems = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                Your cart is empty.

            </p>

        `;

    }


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        totalItems += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>₦${(item.price * item.quantity).toLocaleString()}</p>

            </div>


            <div class="quantity-controls">

                <button onclick="changeQuantity(${index}, -1)">

                    -

                </button>


                <span>

                    ${item.quantity}

                </span>


                <button onclick="changeQuantity(${index}, 1)">

                    +

                </button>


                <button onclick="removeFromCart(${index})">

                    ✕

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = totalItems;


    cartTotal.textContent =

        "₦" + total.toLocaleString();

}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ===============================
// OPEN CART
// ===============================

function openCart() {

    document

        .getElementById("cartSidebar")

        .classList.add("active");


    document

        .getElementById("cartOverlay")

        .classList.add("active");

}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

    document

        .getElementById("cartSidebar")

        .classList.remove("active");


    document

        .getElementById("cartOverlay")

        .classList.remove("active");

}


// ===============================
// CHECKOUT CART VIA WHATSAPP
// ===============================

function checkoutCart() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    let message =

        "Hello DuraStrength Nigeria!%0A%0A" +

        "I am interested in ordering the following:%0A%0A";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =

            item.price * item.quantity;


        total += itemTotal;


        message +=

            "• " +

            item.name +

            " x" +

            item.quantity +

            " - ₦" +

            itemTotal.toLocaleString() +

            "%0A";

    });


    message +=

        "%0ATotal: ₦" +

        total.toLocaleString() +

        "%0A%0A" +

        "Please provide more information about delivery and payment.";


    const whatsappURL =

        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(whatsappURL, "_blank");

}


// ===============================
// REQUEST QUOTE FOR PRODUCT
// ===============================

function requestQuote(productName) {

    const message =

        `Hello DuraStrength Nigeria!%0A%0A` +

        `I am interested in the ${productName}.%0A%0A` +

        `Please send me more information and the current price.`;


    const whatsappURL =

        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(whatsappURL, "_blank");

}


// ===============================
// SEARCH PRODUCTS
// ===============================

function searchProducts() {

    const searchValue =

        document

            .getElementById("searchInput")

            .value

            .toLowerCase();


    const products =

        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productName =

            product

                .dataset

                .name

                .toLowerCase();


        if (productName.includes(searchValue)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// ===============================
// FILTER PRODUCTS
// ===============================

function filterProducts(category, button) {

    const products =

        document.querySelectorAll(".product-card");


    const buttons =

        document.querySelectorAll(".category");


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    products.forEach(product => {

        if (

            category === "all" ||

            product.dataset.category === category

        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// ===============================
// QUOTE FORM
// ===============================

function submitQuote(event) {

    event.preventDefault();


    const name =

        document

            .getElementById("customerName")

            .value;


    const phone =

        document

            .getElementById("customerPhone")

            .value;


    const product =

        document

            .getElementById("customerProduct")

            .value;


    const messageText =

        document

            .getElementById("customerMessage")

            .value;


    const message =

        `Hello DuraStrength Nigeria!%0A%0A` +

        `I would like to request a quote.%0A%0A` +

        `Name: ${name}%0A` +

        `Phone: ${phone}%0A` +

        `Interested in: ${product}%0A` +

        `Message: ${messageText}`;


    const whatsappURL =

        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(whatsappURL, "_blank");

}// ===============================
// DURASTRENGTH WEBSITE JAVASCRIPT
// ===============================


// BUSINESS WHATSAPP NUMBER
const WHATSAPP_NUMBER = "2349032874636";


// CART
let cart = [];


// ===============================
// MOBILE MENU
// ===============================

function toggleMenu() {

    const navMenu = document.getElementById("navMenu");

    navMenu.classList.toggle("active");

}


// ===============================
// ADD PRODUCT TO CART
// ===============================

function addToCart(name, price) {

    const existingProduct = cart.find(

        item => item.name === name

    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const cartCount = document.getElementById("cartCount");

    const cartTotal = document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;

    let totalItems = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                Your cart is empty.

            </p>

        `;

    }


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        totalItems += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>₦${(item.price * item.quantity).toLocaleString()}</p>

            </div>


            <div class="quantity-controls">

                <button onclick="changeQuantity(${index}, -1)">

                    -

                </button>


                <span>

                    ${item.quantity}

                </span>


                <button onclick="changeQuantity(${index}, 1)">

                    +

                </button>


                <button onclick="removeFromCart(${index})">

                    ✕

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = totalItems;


    cartTotal.textContent =

        "₦" + total.toLocaleString();

}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ===============================
// OPEN CART
// ===============================

function openCart() {

    document

        .getElementById("cartSidebar")

        .classList.add("active");


    document

        .getElementById("cartOverlay")

        .classList.add("active");

}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

    document

        .getElementById("cartSidebar")

        .classList.remove("active");


    document

        .getElementById("cartOverlay")

        .classList.remove("active");

}


// ===============================
// CHECKOUT CART VIA WHATSAPP
// ===============================

function checkoutCart() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    let message =

        "Hello DuraStrength Nigeria!%0A%0A" +

        "I am interested in ordering the following:%0A%0A";


    let total = 0;


    cart.forEach(item => {

        const itemTotal =

            item.price * item.quantity;


        total += itemTotal;


        message +=

            "• " +

            item.name +

            " x" +

            item.quantity +

            " - ₦" +

            itemTotal.toLocaleString() +

            "%0A";

    });


    message +=

        "%0ATotal: ₦" +

        total.toLocaleString() +

        "%0A%0A" +

        "Please provide more information about delivery and payment.";


    const whatsappURL =

        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(whatsappURL, "_blank");

}


// ===============================
// REQUEST QUOTE FOR PRODUCT
// ===============================

function requestQuote(productName) {

    const message =

        `Hello DuraStrength Nigeria!%0A%0A` +

        `I am interested in the ${productName}.%0A%0A` +

        `Please send me more information and the current price.`;


    const whatsappURL =

        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(whatsappURL, "_blank");

}


// ===============================
// SEARCH PRODUCTS
// ===============================

function searchProducts() {

    const searchValue =

        document

            .getElementById("searchInput")

            .value

            .toLowerCase();


    const products =

        document.querySelectorAll(".product-card");


    products.forEach(product => {

        const productName =

            product

                .dataset

                .name

                .toLowerCase();


        if (productName.includes(searchValue)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// ===============================
// FILTER PRODUCTS
// ===============================

function filterProducts(category, button) {

    const products =

        document.querySelectorAll(".product-card");


    const buttons =

        document.querySelectorAll(".category");


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    products.forEach(product => {

        if (

            category === "all" ||

            product.dataset.category === category

        ) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

}


// ===============================
// QUOTE FORM
// ===============================

function submitQuote(event) {

    event.preventDefault();


    const name =

        document

            .getElementById("customerName")

            .value;


    const phone =

        document

            .getElementById("customerPhone")

            .value;


    const product =

        document

            .getElementById("customerProduct")

            .value;


    const messageText =

        document

            .getElementById("customerMessage")

            .value;


    const message =

        `Hello DuraStrength Nigeria!%0A%0A` +

        `I would like to request a quote.%0A%0A` +

        `Name: ${name}%0A` +

        `Phone: ${phone}%0A` +

        `Interested in: ${product}%0A` +

        `Message: ${messageText}`;


    const whatsappURL =

        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(whatsappURL, "_blank");

}
// ==========================================
// PRODUCT DETAILS MODAL
// ==========================================

const productModal =
    document.getElementById("productModal");

const closeProductModal =
    document.getElementById("closeProductModal");

const modalOverlay =
    document.querySelector(".product-modal-overlay");

const modalProductImage =
    document.getElementById("modalProductImage");

const modalProductName =
    document.getElementById("modalProductName");

const modalProductCategory =
    document.getElementById("modalProductCategory");

const modalProductDescription =
    document.getElementById("modalProductDescription");


const viewProductButtons =
    document.querySelectorAll(".view-product");


viewProductButtons.forEach(button => {

    button.addEventListener("click", function(event) {

        event.preventDefault();


        const productName =
            this.dataset.product ||
            this.closest(".product-card")
                ?.querySelector("h3")?.textContent;


        const category =
            this.dataset.category ||
            "";


        const description =
            this.dataset.description ||
            this.closest(".product-card")
                ?.querySelector("p")?.textContent;


        const image =
            this.dataset.image ||
            this.closest(".product-card")
                ?.querySelector("img")?.src;


        modalProductName.textContent =
            productName.trim();


        modalProductCategory.textContent =
            category.trim();


        modalProductDescription.textContent =
            description.trim();


        modalProductImage.src =
            image;


        productModal.classList.add("active");

        document.body.style.overflow =
            "hidden";

    });

});


// CLOSE MODAL

function closeModal() {

    productModal.classList.remove("active");

    document.body.style.overflow =
        "";

}


closeProductModal.addEventListener(
    "click",
    closeModal
);


modalOverlay.addEventListener(
    "click",
    closeModal
);


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            productModal.classList.contains("active")
        ) {

            closeModal();

        }

    }
);