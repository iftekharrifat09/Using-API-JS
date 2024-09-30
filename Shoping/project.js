let cart = {}; // Use an object to keep track of product quantities by ID

const loadAllProduct = () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            displayAllProduct(data);
        });
};

const singleProduct = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(data => {
            // Display product data in the popup
            const productDetails = document.getElementById('product-details');
            productDetails.innerHTML = `
                <h2>${data.title}</h2>
                <img class="modal-image" src="${data.image}" alt="${data.title}" width="150" height="200"/>
                <h3>Price: $${data.price}</h3>
                <p>${data.description}</p>
                <h4>Category: ${data.category}</h4>
            `;
            // Show the modal
            openModal();
        });
};

// Open the modal
const openModal = () => {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'block';
};

// Close the modal
const closeModal = () => {
    const modal = document.getElementById('product-modal');
    modal.style.display = 'none';
};


const displayAllProduct = (products) => {
    const productContainer = document.querySelector('#product-container');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('productData');

        // Updated `category`, fixed `description`, and `id` in quotes
        productDiv.innerHTML = `
            <img src="${product.image}" alt="" />
            <h5>${product.title.slice(0, 20)}</h5>
            <h3>Price: ${product.price}$</h3>
            <p>${product.description.slice(0, 30)}</p>
            <div class="buttons">
                <button onclick="singleProduct(${product.id})">View Details</button>
                <button onclick="handleAddToCart(${product.id}, '${product.title.replace(/'/g, "\\'")}', ${product.price}, '${product.category.replace(/'/g, "\\'")}', '${product.description.replace(/'/g, "\\'")}'), updateTotalPrice()">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });
};
updateTotalPrice=()=>{
    let totalPrice=0;
    for(let id in cart){
        totalPrice+=cart[id].price*cart[id].quantity; 
    }
    if(totalPrice==0){
        document.querySelector('.totalPrice').innerHTML="Cart is Empty";
        return;
    }
    document.querySelector('.totalPrice').innerHTML="Total Price: $"+totalPrice;
 
}
const handleAddToCart = (id, title, price, category) => {
    // Check if the product is already in the cart
    if (!cart[id]) {
        // If not, add it with quantity 1
        cart[id] = {
            title: title,
            price: price,
            category: category,
            quantity: 1
        };
    } else {
        // If it is, increase the quantity
        cart[id].quantity++;
    }
    
    updateCartDisplay();
};

const updateCartDisplay = () => {
    const container = document.querySelector('#cart-list');
    container.innerHTML = ''; // Clear the cart display

    for (const id in cart) {
        const item = cart[id];
        const div = document.createElement('div');
        div.classList.add('cart-item'); // Optional: for styling cart items

        div.innerHTML = `
            <h3>Title: ${item.title}</h3>
            <p>Category: ${item.category}</p>
            <p class="price">Price: ${item.price}$</p>
            <p>Quantity: ${item.quantity}</p>
            <button onclick="removeFromCart(${id}),updateTotalPrice()">Remove</button>
        `;

        container.appendChild(div); // Append the cart item to the container
    }
};

const removeFromCart = (id) => {
    console.log('Remove item with id:', id);

    // Check if the item exists in the cart
    if (cart[id]) {
        // Decrease the quantity
        cart[id].quantity--;

        // If quantity reaches 0, remove it from the cart
        if (cart[id].quantity <= 0) {
            delete cart[id];
            console.log(`Product with id ${id} has been removed from the cart.`);
        }

        updateCartDisplay(); // Refresh the cart display
    }
};

// Load products when the page loads
loadAllProduct();
