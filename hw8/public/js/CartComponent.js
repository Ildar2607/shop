Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          imgCart: 'https://placehold.it/200x150',
          showCart: false
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    item.imgPath = `img/${item.id_product}.png`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++;
                        }
                    });
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(product){
            if(product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}`, {quantity: -1})
                    .then(data => {
                        if(data.result) {
                            product.quantity--;
                        }
                    });
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if(data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        } else {
                            console.log('error');
                        }
                    });
            }
        }
    },
    template: `
    <div class="btn-cart-wrap">
        <div class="btn-cart" type="button" @click="showCart = !showCart"><img class="header__cart" src="img/cart.png" alt="cart"></div>
        <span v-if=" cartItems.length === 0">Корзина пуста</span>
        
        <div v-else >
            <div class="cart-counter"> {{ this.cartItems.reduce((summ, item) => summ + item.quantity, 0) }}</div>
            <div class="cart-box" v-show="showCart">    
                <h3 class="cart-box-total" > {{ this.cartItems.reduce((summ, item) => summ + item.quantity, 0) }} товар(ров) ИТОГО: {{ this.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0) }}) рублей </h3>
                <ul class="shopping-box__head">
                    <li>Product Details</li>
                    <li>Unite Price</li>
                    <li>Quantity</li>
                    <li>Shipping</li>
                    <li>Subtotal</li>
                    <li>ACTION</li>
                </ul>
                <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.img_product" :cart-item="item"
                     @remove="remove" @add-product="addProduct">
                </cart-item>
            </div>  
        </div>
    </div>
    `
});




Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="sh-product">
        <div class="sh-product__img">
            <img :src="img" alt="Some img">
            <div class="sh-product__description">
              <h3 class="sh-product__title">{{ cartItem.product_name }}</h3>
              <p>Color: <span>Red</span></p>
              <p>Size: <span>XXL</span></p>
            </div>
          </div>
          <div class="sh-product__item">$ {{ cartItem.price }}</div>
          <div class="sh-product__counter counter">
            <div class="counter__value">{{ cartItem.quantity }}</div>
            <div class="counter__btn counter__increase" @click="$emit('add-product', cartItem)"> + </div>
          </div>
          <div class="sh-product__item">free</div>
          <div class="sh-product__item">$ {{ cartItem.price * cartItem.quantity }}</div>
          <div class="sh-product__item"> <button @click="$emit('remove', cartItem)">&times;</button> </div>
    </div>
    `
})