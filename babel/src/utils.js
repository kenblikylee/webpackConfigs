export class Car {
  constructor(brand = 'benz') {
    this.brand = brand
  }
  drive() {
    console.log(`${this.brand} is running.`)
  }
}