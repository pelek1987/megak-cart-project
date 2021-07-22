const buttons = [...document.querySelectorAll('[data-name]')];
const cartList = document.querySelector('.basket-list');
const buyAllBtn = document.querySelector('.btn-buy-all');
const cartTotalValueUI = document.querySelector('.cart-total-value');

const removeItem = (e) => {
    const id = Number(e.target.dataset.id);
    cart.remove(id);
    createCartUI();
};

const createCartUI = () => {
    cartList.innerText = '';
    const cartContent = cart.getCartContent();
    cartContent.forEach(({name, price, id}) => {
        const li = document.createElement('li');
        li.innerText = `${id} - ${name} - ${price}`;
        li.dataset.id = id;
        li.addEventListener('click', removeItem)
        cartList.appendChild(li);
    })
    const cartTotalValue = cart.getTotalValue();
    cartTotalValueUI.innerText = `${cartTotalValue.toFixed(2)} zł`;

    buyAllBtn.disabled = cartTotalValue === 0;
}

const buyAllProducts = () => {
    alert(`Kupiłeś produkty o wartości ${cart.getTotalValue().toFixed(2)} zł`)
    cart.clear();
    createCartUI();
};

const addProductToCart = (e) => {
    const name = e.target.dataset.name;
    const price = Number(e.target.dataset.price);
    const product = new Product(name, price);
    cart.add(product);
    createCartUI();
};

const cart = new Cart();

createCartUI();

for (const btn of buttons) {
    btn.addEventListener('click', addProductToCart)
}

buyAllBtn.addEventListener('click', buyAllProducts)
