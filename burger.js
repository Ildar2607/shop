class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.cal = 0;
    this.total = 0;
  }

  addTopping(topping) {
    this.stuffing.push(topping)
  }

  removeTopping(topping) {
    this.stuffing = this.stuffing.filter(item => item !== topping);
  }

  getToppings() {
    return `Список ваших добавок: ${this.stuffing.join(', ')}.`
  }

  getSize() {
    this.size;
  }

  getStuffing() {
    this.stuffing;
  }

  calculatePrice() {
    if (this.size === 'small') {
      this.total += 50;
      this.cal += 20
    } else {
      this.total += 100;
      this.cal += 40;
    }

    this.stuffing.forEach(element => {
      switch (element) {
        case 'cыр':
          this.total += 10;
          this.cal += 20;
          break;
        case 'картофель':
          this.total += 15;
          this.cal += 10;
          break;
        case 'салат':
          this.total += 20;
          this.cal += 5;
          break;
        case 'приправа':
          this.total += 15;
          break;
        case 'майонез':
          this.total += 20;
          this.cal += 5;
          break;
      }
    });
    return `Cтоимость вашего бургера ${this.total} рублей.`;
  }

  calculateColories() {
    return `Ваш бургер содержит ${this.cal} калорий.`;
  }
}

let smallBurger = new Hamburger('small', ['сыр']);
let bigBurger = new Hamburger('big', ['картофель', 'салат', 'сыр']);

smallBurger.addTopping("приправа");
smallBurger.removeTopping("приправа");
console.log(smallBurger.getToppings());
console.log(smallBurger.calculatePrice());
console.log(smallBurger.calculateColories());

bigBurger.addTopping("майонез");
console.log(bigBurger.getToppings());
console.log(bigBurger.calculatePrice());
console.log(bigBurger.calculateColories());





