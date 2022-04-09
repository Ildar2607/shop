const goods = [
  { title: 'Mango People T-shirt', price: 150, img: 'img/1.png' },
  { title: 'Socks', price: 50, img: 'img/2.png' },
  { title: 'Jacket', price: 350, img: 'img/3.png' },
  { title: 'Shoes', price: 250, img: 'img/4.png' },
  { title: 'Jacket', price: 350, img: 'img/5.png' },
  { title: 'Shoes', price: 250, img: 'img/6.png' },
  { title: 'Jacket', price: 350, img: 'img/7.png' }
];

const renderGoodsItem = (product) => {
  return `<div class="product__card">
            <a href="#">
              <img class="product__img" src="${product.img}" alt="product1">
            </a>
            <div class="product__content">
              <a href="" class="product__name">${product.title}</a>
              <div class="product__price">$${product.price}</div>
            </div>
            <a class="product__add" href="#">Add to Cart</a>
          </div>`;
};

const renderGoodsList = (goods) => {
  let goodsList = goods.map(item => renderGoodsItem(item)).join('');
  document.querySelector('.product').innerHTML = goodsList;
}

window.onload = () => {
  renderGoodsList(goods);
}
