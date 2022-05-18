const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        filtered: [],
        cartItems: [],
        imgCart: 'https://via.placeholder.com/50x100',
        userSearch: '',
        showCart: false,
        imgProduct: 'https://via.placeholder.com/200x150'
    },
    methods: {
        filter(){
            if(this.userSearch.length) {
                const regexp = new RegExp(this.userSearch, 'i');
                this.filtered = this.products.filter(product => regexp.test(product.product_name));
            } else {
                this.filtered = this.products
            }
        },
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                       let find = this.cartItems.find(el => el.id_product === item.id_product);
                       if(find){
                           find.quantity++;
                       } else {
                           const prod = Object.assign({quantity: 1}, item);//создание нового объекта на основе двух, указанных в параметрах
                           this.cartItems.push(prod)
                       }
                    }
                })
        },
        remove(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    mounted(){
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents){
                    this.cartItems.push(item);
                }
            });
       this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
               }
               this.filtered = this.products
           });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
                this.filtered = this.products
            })
    }
});