const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()/
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//             if (xhr.status !== 200) {
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText); //текстовая строка
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                //                 console.log(data);
                this.render();
            });
        this.product = {};
    }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    _addProduct(product) {
        return fetch(`${API}/addToBasket.json`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(product),
            })
            .then(result => result.json())
            .then(data => {
                console.log(data);
            })
            .catch((error) => console.log(error))
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    productHandlers() {
        document.addEventListener('click', (e) => {
            let target = e.target
            if (target.closest('.product-item')) {
                let productNode = target.closest('.product-item');
                let id = productNode.dataset.id;
                this.product = {
                    id_product: Number(id),
                    quantity: 1,
                }

                this._addProduct(this.product);
            }
        })
    }

   
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class CartItem extends ProductItem {
    constructor(product) {
        super(product)
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="cart__good good">
        <div class="good__right">
            <div class="good__img">
                <img src="${this.img}" alt="">
            </div>
            <div class="good__info">
                <div>${this.title}</div>
                <div>Quantity: ${this.quantity}</div>
                <div>${this.price}$</div>
            </div>
        </div>
        <div class="good__left">
            <span>${this.price}$</span>
            <button class="good__delete">X</button>
        </div>
    </div>`
    }
}

class CartList extends ProductsList {
    constructor(container = '.cart__list') {
        super()
        this.container = container;
        this.goods = [];
        this.sum = 0;
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const block = document.querySelector(this.container);
        if(this.goods.contents) {
            for (let product of this.goods.contents) {
                const productObj = new CartItem(product);
                block.insertAdjacentHTML('beforeend', productObj.render());
            }   
        } else {
            block.insertAdjacentHTML('beforeend', `<p>Ваша корзина пуста</p>`);
        } 
        
    }

    showCart() {
        let domCart = document.querySelector(`${this.container}`).parentNode
        document.querySelector('.btn-cart')
            .addEventListener('click', () => {
                if (domCart.classList.contains('show')) {
                    domCart.classList.remove('show')
                } else {
                    domCart.classList.add('show')
                }
            });
    }

}

let list = new ProductsList();
list.productHandlers();
let cart = new CartList();
cart.showCart()
//console.log(list.allProducts);
