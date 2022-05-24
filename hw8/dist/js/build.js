/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/CartComponent.js":
/*!************************************!*\
  !*** ./public/js/CartComponent.js ***!
  \************************************/
/***/ (() => {

eval("Vue.component('cart', {\n  data() {\n    return {\n      cartUrl: '/getBasket.json',\n      cartItems: [],\n      imgCart: 'https://placehold.it/200x150',\n      showCart: false\n    };\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/cart`).then(data => {\n      for (let item of data.contents) {\n        item.imgPath = `img/${item.id_product}.png`;\n        this.$data.cartItems.push(item);\n      }\n    });\n  },\n\n  methods: {\n    addProduct(item) {\n      let find = this.cartItems.find(el => el.id_product === item.id_product);\n\n      if (find) {\n        this.$parent.putJson(`/api/cart/${find.id_product}`, {\n          quantity: 1\n        }).then(data => {\n          if (data.result === 1) {\n            find.quantity++;\n          }\n        });\n      } else {\n        const prod = Object.assign({\n          quantity: 1\n        }, item);\n        this.$parent.postJson(`/api/cart`, prod).then(data => {\n          if (data.result === 1) {\n            this.cartItems.push(prod);\n          }\n        });\n      }\n    },\n\n    remove(product) {\n      if (product.quantity > 1) {\n        this.$parent.putJson(`/api/cart/${product.id_product}`, {\n          quantity: -1\n        }).then(data => {\n          if (data.result) {\n            product.quantity--;\n          }\n        });\n      } else {\n        this.$parent.delJson(`/api/cart/${product.id_product}`).then(data => {\n          if (data.result) {\n            this.cartItems.splice(this.cartItems.indexOf(product), 1);\n          } else {\n            console.log('error');\n          }\n        });\n      }\n    }\n\n  },\n  template: `\n    <div class=\"btn-cart-wrap\">\n        <div class=\"btn-cart\" type=\"button\" @click=\"showCart = !showCart\"><img class=\"header__cart\" src=\"img/cart.png\" alt=\"cart\"></div>\n        <span v-if=\" cartItems.length === 0\">Корзина пуста</span>\n        \n        <div v-else >\n            <div class=\"cart-counter\"> {{ this.cartItems.reduce((summ, item) => summ + item.quantity, 0) }}</div>\n            <div class=\"cart-box\" v-show=\"showCart\">    \n                <h3 class=\"cart-box-total\" > {{ this.cartItems.reduce((summ, item) => summ + item.quantity, 0) }} товар(ров) ИТОГО: {{ this.cartItems.reduce((summ, item) => summ + item.quantity*item.price, 0) }}) рублей </h3>\n                <ul class=\"shopping-box__head\">\n                    <li>Product Details</li>\n                    <li>Unite Price</li>\n                    <li>Quantity</li>\n                    <li>Shipping</li>\n                    <li>Subtotal</li>\n                    <li>ACTION</li>\n                </ul>\n                <cart-item v-for=\"item of cartItems\" :key=\"item.id_product\" :img=\"item.img_product\" :cart-item=\"item\"\n                     @remove=\"remove\" @add-product=\"addProduct\">\n                </cart-item>\n            </div>  \n        </div>\n    </div>\n    `\n});\nVue.component('cart-item', {\n  props: ['img', 'cartItem'],\n  template: `\n    <div class=\"sh-product\">\n        <div class=\"sh-product__img\">\n            <img :src=\"img\" alt=\"Some img\">\n            <div class=\"sh-product__description\">\n              <h3 class=\"sh-product__title\">{{ cartItem.product_name }}</h3>\n              <p>Color: <span>Red</span></p>\n              <p>Size: <span>XXL</span></p>\n            </div>\n          </div>\n          <div class=\"sh-product__item\">$ {{ cartItem.price }}</div>\n          <div class=\"sh-product__counter counter\">\n            <div class=\"counter__value\">{{ cartItem.quantity }}</div>\n            <div class=\"counter__btn counter__increase\" @click=\"$emit('add-product', cartItem)\"> + </div>\n          </div>\n          <div class=\"sh-product__item\">free</div>\n          <div class=\"sh-product__item\">$ {{ cartItem.price * cartItem.quantity }}</div>\n          <div class=\"sh-product__item\"> <button @click=\"$emit('remove', cartItem)\">&times;</button> </div>\n    </div>\n    `\n});\n\n//# sourceURL=webpack://hw8/./public/js/CartComponent.js?");

/***/ }),

/***/ "./public/js/ErrorComp.js":
/*!********************************!*\
  !*** ./public/js/ErrorComp.js ***!
  \********************************/
/***/ (() => {

eval("Vue.component('error', {\n  data() {\n    return {\n      text: ''\n    };\n  },\n\n  computed: {\n    isVisible() {\n      return this.text !== '';\n    }\n\n  },\n  template: `\n    <div class=\"error-block\" v-if=\"isVisible\">\n        <p class=\"error-msg\">\n        <button class=\"close-btn\" @click=\"text=''\">&times;</button>\n        {{ text }}\n</p>\n</div>\n    `\n});\n\n//# sourceURL=webpack://hw8/./public/js/ErrorComp.js?");

/***/ }),

/***/ "./public/js/FilterComp.js":
/*!*********************************!*\
  !*** ./public/js/FilterComp.js ***!
  \*********************************/
/***/ (() => {

eval("Vue.component('filter-el', {\n  data() {\n    return {\n      userSearch: ''\n    };\n  },\n\n  template: `<form action=\"#\" class=\"search-form\" @submit.prevent=\"$parent.$refs.products.filter(userSearch)\">\n                <input type=\"text\" placeholder=\"поиск\" class=\"search-field\" v-model=\"userSearch\">\n                <button type=\"submit\" class=\"btn-search\">\n                    <i class=\"fas fa-search\"></i>\n                </button>\n            </form>`\n});\n\n//# sourceURL=webpack://hw8/./public/js/FilterComp.js?");

/***/ }),

/***/ "./public/js/ProductComponent.js":
/*!***************************************!*\
  !*** ./public/js/ProductComponent.js ***!
  \***************************************/
/***/ (() => {

eval("Vue.component('products', {\n  data() {\n    return {\n      catalogUrl: '/catalogData.json',\n      filtered: [],\n      products: [],\n      imgProduct: 'https://placehold.it/200x150'\n    };\n  },\n\n  mounted() {\n    this.$parent.getJson(`/api/products`).then(data => {\n      for (let item of data) {\n        item.imgPath = `img/${item.id_product}.png`;\n        this.$data.products.push(item);\n        this.$data.filtered.push(item);\n      }\n    });\n  },\n\n  methods: {\n    filter(userSearch) {\n      let regexp = new RegExp(userSearch, 'i');\n      this.filtered = this.products.filter(el => regexp.test(el.product_name));\n    }\n\n  },\n  template: `<div class=\"product\">\n                <product v-for=\"item of filtered\" \n                :key=\"item.id_product\" \n                :img=\"item.imgPath\"\n                :product=\"item\"\n                @add-product=\"$parent.$refs.cart.addProduct\"></product>\n               </div>`\n});\nVue.component('product', {\n  props: ['product', 'img'],\n  template: `<div class=\"product__card\">\n                <div>\n                    <img class=\"product__img\" :src=\"img\">\n                </div>\n                <div class=\"product__content\">\n                <a href=\"\" class=\"product__name\">{{product.product_name}}</a>\n                <div class=\"product__price\">$ {{product.price}}</div>\n                </div>\n                <button class=\"product__add\" @click=\"$emit('add-product', product)\">Add to Cart</button>\n            </div>`\n});\n\n//# sourceURL=webpack://hw8/./public/js/ProductComponent.js?");

/***/ }),

/***/ "./public/js/main.js":
/*!***************************!*\
  !*** ./public/js/main.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/style.css */ \"./public/css/style.css\");\n\nconst linkListSection = document.getElementById('menu');\nconst menu = [{\n  link: '#',\n  name: 'Главная'\n}, {\n  link: '#Section_2',\n  name: 'Продукт'\n}, {\n  link: '#',\n  name: 'Контакты'\n}];\n\nconst renderMenu = (link, name) => `<a class=\"menuStyle\" href=\"${link}\">${name}</a>`; //добавление класса для стилизации меню\n\n\nconst renderLinkList = list => {// const linkList = list.map(item => renderMenu(item.link, item.name));\n  // document.querySelector('.menu').innerHTML = linkList.join('');\n};\n\nrenderLinkList(menu);\nconst API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';\nconst app = new Vue({\n  el: '#app',\n  data: {\n    userSearch: ''\n  },\n  methods: {\n    getJson(url) {\n      return fetch(url).then(result => result.json()).catch(error => {\n        this.$refs.error.text = error;\n      });\n    },\n\n    postJson(url, data) {\n      return fetch(url, {\n        method: 'POST',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        this.$refs.error.text = error;\n      });\n    },\n\n    putJson(url, data) {\n      return fetch(url, {\n        method: 'PUT',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => {\n        this.$refs.error.text = error;\n      });\n    },\n\n    delJson(url, data) {\n      return fetch(url, {\n        method: 'DELETE',\n        headers: {\n          \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n      }).then(result => result.json()).catch(error => this.$refs.error.setText(error));\n    }\n\n  },\n\n  mounted() {}\n\n});\n\n//# sourceURL=webpack://hw8/./public/js/main.js?");

/***/ }),

/***/ "./public/css/style.css":
/*!******************************!*\
  !*** ./public/css/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://hw8/./public/css/style.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./public/js/CartComponent.js");
/******/ 	__webpack_require__("./public/js/ErrorComp.js");
/******/ 	__webpack_require__("./public/js/FilterComp.js");
/******/ 	__webpack_require__("./public/js/ProductComponent.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/main.js");
/******/ 	
/******/ })()
;