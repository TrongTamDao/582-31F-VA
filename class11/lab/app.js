function Vehicle(brand) {
  this.brand = brand;
}

Vehicle.prototype.describe = function () {
  return `Vehicle brand: ${this.brand}`;
};

Vehicle.prototype.type = "Transport";
function Car(brand, model, running = false) {
  Vehicle.call(this, brand);
  this.model = model;
  this.running = running;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.start = function () {
  this.running = true;
  return `${this.model} is now running`;
};

Car.prototype.stop = function () {
  this.running = false;
  return `${this.model} has stopped`;
};

Car.prototype.showModel = function () {
  return `Model: ${this.model}`;
};

function ElectricCar(brand, model, batteryLevel) {
  Car.call(this, brand, model);
  this.batteryLevel = batteryLevel;
}

ElectricCar.prototype = Object.create(Car.prototype);
ElectricCar.prototype.constructor = ElectricCar;

const runDemoBtn = document.getElementById("run-demo-btn");
const output = document.getElementById("output");

let toogleBtn = false;

runDemoBtn.addEventListener("click", () => {
  if (!toogleBtn) {
    const car1 = new Car("Toyota", "Corolla");
    const car2 = new Car("Honda", "Civic", true);
    const car3 = new ElectricCar("Tesla", "Model Y", "full");

    output.innerHTML = `
  <p>${car1.describe()}</p>
  <p>${car1.showModel()}</p>
  <p>${car1.start()}</p>
  <p>Type: ${car1.type}</p>
  <hr>
  <p>${car2.describe()}</p>
  <p>${car2.showModel()}</p>
  <p>${car2.stop()}</p>
  <hr>
  <p>${car3.describe()}</p>
  <p>${car3.showModel()}</p>
  <p>Battery Level: ${car3.batteryLevel}</p>
  `;
    toogleBtn = true;
  } else {
    output.innerHTML = "";
    toogleBtn = false;
  }
});

console.log(Object.getPrototypeOf(Car.prototype) === Vehicle.prototype);
console.log(Object.getPrototypeOf(ElectricCar.prototype) === Car.prototype);
