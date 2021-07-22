class Cart {
    constructor() {
        this.storage = new Storage();
        this.items = this.onInit();
        // this.totalValue = 0;

    }

    onInit() {
        const cartItems = this.storage.get('cartItems')
        if( cartItems !== null) {
            return cartItems;
        }
        return [];
    }

    add(item) {
        this.items.push(item);
        this.storage.set('cartItems', this.items);
        // this.addToTotalValue(item.price);
    }

    // addToTotalValue(newPrice) {
    //     this.totalValue += newPrice
    // }

    clear() {
        this.items.length = 0;
        // this.items.splice(0);
        // this.items = [];
        this.storage.set('cartItems', this.items);
    }

    getTotalValue() {
        return this.items.reduce((total, product) => total + product.price, 0)
    }

    getCartContent() {
        return this.items
            .map(({name, price}, idx) => ({
                name,
                price: `${price.toFixed(2)} zł`,
                id: idx + 1
            }));
    }

    remove(no) {
        this.items.splice(no - 1, 1);
        this.storage.set('cartItems', this.items);
    }
}