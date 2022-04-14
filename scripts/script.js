
class GoodsItem {
  constructor(id, title, price, img) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img
  }

  render() {
    return `<div class="product__card">
      <a href="#">
        <img class="product__img" src="${this.img}" alt="product1">
      </a>
      <div class="product__content">
        <a href="" class="product__name">${this.title}</a>
        <div class="product__price">$${this.price}</div>
      </div>
      <a class="product__add" href="#">Add to Cart</a>
    </div>`;
  }
}

class GoodsList {
  constructor(listType = 'product') {
    this.goods = [];
    this.listType = listType;
  }
  fetchGoods() {
    this.goods = [
      { id: '01', title: 'Mango People T-shirt', price: 150, img: 'img/1.png' },
      { id: '02', title: 'Socks', price: 50, img: 'img/2.png' },
      { id: '03', title: 'Jacket', price: 350, img: 'img/3.png' },
      { id: '04', title: 'Shoes', price: 250, img: 'img/4.png' },
      { id: '05', title: 'Jacket', price: 350, img: 'img/5.png' },
      { id: '06', title: 'Shoes', price: 250, img: 'img/6.png' },
      { id: '07', title: 'Jacket', price: 350, img: 'img/7.png' }
    ];
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.id, good.title, good.price, good.img)
      listHtml += goodItem.render()
    })
    document.querySelector('.product').innerHTML = listHtml;
  }

  // эта функция добавляет события
  addEvent() {
    let productBtn = document.querySelector("." + this.listType).querySelectorAll(".product__add");
    console.log(productBtn);
  }
}

class CartItem extends GoodsItem {

  constructor(id, title, price, img, amount) {
    super(id, title, price, img)
    this.amount = amount;
  }
  render() {
    return `<div class="shopping-cart__sh-product sh-product">
      <div class="sh-product__img">
        <img src="${this.img}" alt="">
        <div class="sh-product__description">
          <h3 class="sh-product__title">${this.title}</h3>
          <p>Color: <span>Red</span></p>
          <p>Size: <span>XXL</span></p>
        </div>
      </div>
      <div class="sh-product__item">$${this.price}</div>
      <div class="sh-product__counter counter">
        <div class="counter__btn counter__decrease">-</div>
        <div class="counter__value">${this.amount}</div>
        <div class="counter__btn counter__increase">+</div>
      </div>
      <div class="sh-product__item">free</div>
      <div class="sh-product__item total">$300</div>
      <div class="sh-product__item delete-btn">
        <img src="img/del.png" alt="">
    </div>
  </div>`;
  }

  addProduct(product) {

  }
}

class CartList extends GoodsList {
  constructor() {
    super()
    this.goods = [];
    this.sum = 0;
  }

  fetchGoods() {
    this.goods = [
      { id: '01', title: 'Mango People T-shirt', price: 150, img: 'img/1.png', amount: '1' },
      { id: '02', title: 'Socks', price: 50, img: 'img/2.png', amount: '1' },
      { id: '03', title: 'Jacket', price: 350, img: 'img/3.png', amount: '1' },
      { id: '04', title: 'Shoes', price: 250, img: 'img/4.png', amount: '1' },
      { id: '05', title: 'Jacket', price: 350, img: 'img/5.png', amount: '1' },
      { id: '06', title: 'Shoes', price: 250, img: 'img/6.png', amount: '1' },
      { id: '07', title: 'Jacket', price: 350, img: 'img/7.png', amount: '1' }
    ]
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new CartItem(good.id, good.title, good.price, good.img, good.amount);
      listHtml += goodItem.render();
      this.sum += good.price;
    })
    document.querySelector('.shopping-cart__goods').innerHTML = listHtml;
  }

  showOrder() {
    document.querySelector('.shopping-total__value').innerHTML = this.sum;
  }

  removeProduct(id) {

  }

}

// class СhangeQuantity {
//   counterLogic() {
//     let counter, val, num;
//     document.addEventListener('click', (e) => {
//       let target = e.target;
//       counter = target.closest('.counter');
//       val = counter.querySelector('.counter__value');
//       num = val.textContent;
//       if (target.closest('.counter__decrease')) {
//         this.decrease(num);
//       } else if (target.closest('.counter__increase')) {
//         this.increase(num);
//       }
//     })
//   }
//   decrease(num) {
//     if (num > 0) {
//       num--;
//       val.innerHTML = num;
//     }
//   }
//   increase(num) {
//     num++;
//     val.textContent = num;
//   }
// }


window.onload = () => {
  if (document.querySelector('.product')) {
    let list = new GoodsList();
    list.addEvent();
    list.fetchGoods();
    list.render();

  }

  if (document.querySelector('.sh-product')) {
    let list = new CartList();
    list.fetchGoods();
    list.render();
    list.showOrder();
    // let counter = new СhangeQuantity();
    // counter.counterLogic();
  }
}



