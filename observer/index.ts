import { Observer } from "./interface";

class Apple {
    price: number = 0;
    observers: Array<Observer> = [];

    addObserver(observer: Observer) {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer) {
        this.observers = this.observers.filter((item) => item !== observer);
    }

    notifyObservers() {
      this.observers.forEach((observer) => observer.receive(this.price));
    }

    setPrice(price: number) {
        this.price = price;
        this.notifyObservers();
    }
}

class Customer {
    name: string;

    constructor(name: string) {
      this.name = name
    }

    receive(price: number) {
        console.log(`${this.name} ::: ${price}`);
    }
}

const apple = new Apple();
const priceObserver1 = new Customer("1");
const priceObserver2 = new Customer("2");
apple.addObserver(priceObserver1);
apple.addObserver(priceObserver2);
apple.setPrice(10);