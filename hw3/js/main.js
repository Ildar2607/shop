const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List{
    constructor(url, container, list = list2) {
        this.url = url;
        this.container = container;
        this.list = list; //для связи между классами. В данном случае что отрендерить, товар корзины или каталога.
        this.goods = [];//массив товаров из JSON документа
        this.allProducts = []; // доп.массив товаров в который мы будем добавлять и удалять товары и их количество.
        this.total = 0; // итоговая сумма товаров в корзине
        this._init(); // вызывается при создании потомка, у разных потомков _init свой.
    }
    getJson(url){ // запрос данных с сервера
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error)
            })
    }
    handleData(data){ // обработчик данных с сервера в данном случае рендер.
        this.goods = [...data];
        this.render();
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += (item.price * (item.quantity ? item.quantity : 1)), 0);
    }
    render(){
        console.log(this.constructor.name);
        const block = document.querySelector(this.container); //определяем блок куда мы будем рендерить проект.
        for(let product of this.goods) { //перебираем каждый продукт и для каждого товара вызываем метод рендер и записываем продукт в новый список продуктов
            const productObj = new this.list[this.constructor.name](product) //в  переменную записываем  new ProductItem или new CartItem в зависимости от того кто вызвал конструктор
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())  // выводится рендер того класса, который вызвал, new ProductItem или new CartItem.
        }
        this.total = this.calcSum()
        document.querySelector('.cart__total').textContent = `Total: $${this.total}`
    }

    _init(){ // инициализация событий для класса
        return false
    }
}

class Item {
    constructor(productData, img = 'https://placehold.it/200x150' ){
        this.product_name = productData.product_name;
        this.price = productData.price;
        this.id_product = productData.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id_product}">
            <img src="${this.img}" alt="Some img">
            <div class="desc">
                <h3>${this.product_name}</h3>
                <p>${this.price} $</p>
                <button class="buy-btn" 
                    data-id="${this.id_product}" 
                    data-name="${this.product_name}" 
                    data-price="${this.price}">Купить</button>
            </div>
        </div>`
    }
}

class ProductsList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container)
        this.cart = cart // это поле класса нужно чтобы мы могли вызвать метод addProduct
        this.getJson() // вызываем сразу для инициализации каталога товаров.
            .then(data => this.handleData(data)); //вызываем метод из предка List
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => { //при клике в каталоге товаров на кнопку buy-btn сработает функция addProduct из класса CartList
            if(e.target.classList.contains('buy-btn')){
                this.cart.addProduct(e.target);
            }
        })
    }
}

class ProductItem extends Item {}

class CartList extends List { 
    constructor(url = "/getBasket.json", container = ".cart__list", ){
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents); //вывели все товары корзины
            }); 
    }
    addProduct(nodeElem) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1) {
                    let productId = +nodeElem.dataset['id']; // получаем id и приводим его к числу, из data атирибута, но добавляем не на сервере, а в объекте allProducts
                    let find = this.allProducts.find(product => product.id_product === productId); // находим наш объект в allProducts
                    if(find) {
                        find.quantity++; // Увеличиваем количество на 1?
                        this.total += find.price // увеличиваем и итоговую сумму заказа
                        this._updateCart(find); // запускаем обновление массива allProducts.
                    } else {
                        let product = {
                            id_product: productId,
                            price: +nodeElem.dataset['price'],
                            product_name: nodeElem.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    removeProduct(nodeElem) { // для удалени товара надо отправить запрос на сервер
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){ //если ответ с сервера положительный
                    let productId = +nodeElem.dataset['id']; // получаем id и приводим его к числу, из data атирибута но товары удаляем не на сервере, а в объекте allProducts
                    let find = this.allProducts.find(product => product.id_product === productId); // находим наш объект в allProducts
                    if(find.quantity > 1 ) {
                        find.quantity--; // Уменьшаем количество на 1?
                        this.total -= find.price // Уменьшеаем и количество итоговой суммы заказа.
                        this._updateCart(find); // запускаем обновление массива allProducts.
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        this.total -= find.price; // Уменьшеаем и количество итоговой суммы заказа.
                        document.querySelector(`.cart__good[data-id="${productId}"]`).remove();
                        document.querySelector('.cart__total').textContent = `Total: $${this.total}`// Обновляем HTML
                    }
                } else {
                    alert('Error');
                }
            })
    }

    _updateCart(product) {
        let block = document.querySelector(`.cart__good[data-id="${product.id_product}"]`);
        block.querySelector('.good__quantity').textContent = `Quantity: ${product.quantity}`;
        block.querySelector('.good__total').textContent = `${product.quantity * product.price}$`;
        document.querySelector('.cart__total').textContent = `Total: $${this.total}`;
    }

    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart').classList.toggle('show')
        })
        document.querySelector(this.container).addEventListener('click', (e) => {
            if(e.target.closest('.good__delete')) {
                this.removeProduct(e.target)
            }
        })
    }
}

class CartItem extends Item {
    constructor(productData, img = 'https://placehold.it/50x100'){
        super(productData, img);
        this.quantity = productData.quantity;
    }
    render() {
        return `<div class="cart__good good" data-id="${this.id_product}">
                <div class="good__left">
                    <div class="good__img">
                        <img src="${this.img}" alt="">
                    </div>
                    <div class="good__info">
                        <div>${this.product_name}</div>
                        <div class="good__quantity">Quantity: ${this.quantity}</div>
                        <div>${this.price}$</div>
                    </div>
                </div>
                <div class="good__right">
                    <span class="good__total">${this.price*this.quantity}$</span>
                    <button class="good__delete" data-id="${this.id_product}">X</button>
                </div>
            </div>`
    }
}

const list2 = {   // С помощью этого объекта можно вывести и корзину и каталог.
    ProductsList: ProductItem,
    CartList: CartItem
};

let cartList = new CartList();
let productList = new ProductsList(cartList);

