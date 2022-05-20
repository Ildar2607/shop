Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: [],
           imgProduct: 'https://placehold.it/200x150'
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    item.imgPath = `img/${item.id_product}.png`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<div class="product">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.imgPath"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product__card">
                <div>
                    <img class="product__img" :src="img">
                </div>
                <div class="product__content">
                <a href="" class="product__name">{{product.product_name}}</a>
                <div class="product__price">$ {{product.price}}</div>
                </div>
                <button class="product__add" @click="$emit('add-product', product)">Add to Cart</button>
            </div>`
});