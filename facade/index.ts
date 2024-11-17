class VAT {
  getVAT() {
    return 0.19;
  }
}

class Discount {
  getDiscount() {
    return 0.1;
  }
}


class Facade {
  vat: VAT;
  discount: Discount;

  constructor() {
    this.vat = new VAT();
    this.discount = new Discount();
  }

  calculatePrice(price: number) {
    const vat = this.vat.getVAT();
    const discount = this.discount.getDiscount();
    return price + (price * vat) - (price * discount);
  }
}

const facade = new Facade();

console.log(facade.calculatePrice(100)); // 109