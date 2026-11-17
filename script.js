// Function declaration with an early return for invalid input.
function divideNumbers(a, b) {
  if (b === 0) return "Cannot divide by zero";
  return (a / b).toFixed(2);
}

// Function expression: stored in a constant and returns an object.
const calculate = function (a, b) {
  return { sum: a + b, difference: a - b, product: a * b, quotient: divideNumbers(a, b) };
};

// Arrow function with a default parameter.
const greet = (name = "Guest") => `Hello, ${name}!`;

// Rest parameter and reduce callback make a pure sum function.
const sumNumbers = (...numbers) => numbers.reduce((total, number) => total + number, 0);

// Closure factory: each counter remembers its own private count.
function createCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}
let counterA = createCounter();
let counterB = createCounter();
let valueA = 0;
let valueB = 0;
function showCounters() {
  document.querySelector("#counter-result").textContent = `A: ${valueA} · B: ${valueB}`;
}

document.querySelector("#calculate-button").addEventListener("click", () => {
  const a = Number(document.querySelector("#first-number").value);
  const b = Number(document.querySelector("#second-number").value);
  const output = document.querySelector("#calculator-result");
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    output.textContent = "Please enter valid numbers.";
    return;
  }
  const result = calculate(a, b);
  output.textContent = `Add: ${result.sum} · Subtract: ${result.difference} · Multiply: ${result.product} · Divide: ${result.quotient}`;
});

document.querySelector("#greet-button").addEventListener("click", () => {
  const name = document.querySelector("#name-input").value.trim();
  document.querySelector("#greeting-result").textContent = greet(name || undefined);
});

document.querySelector("#array-button").addEventListener("click", () => {
  const values = [1, 2, 3, 4, 5, 6];
  const evenDoubled = values.filter((value) => value % 2 === 0).map((value) => value * 2);
  document.querySelector("#array-result").textContent = `Even values doubled: [${evenDoubled.join(", ")}]`;
});

document.querySelector("#counter-one-button").addEventListener("click", () => {
  valueA = counterA();
  showCounters();
});
document.querySelector("#counter-two-button").addEventListener("click", () => {
  valueB = counterB();
  showCounters();
});
document.querySelector("#counter-reset-button").addEventListener("click", () => {
  counterA = createCounter();
  counterB = createCounter();
  valueA = 0;
  valueB = 0;
  showCounters();
});

document.querySelector("#sum-button").addEventListener("click", () => {
  const rawValues = document.querySelector("#numbers-input").value;
  const values = rawValues.split(",").map((item) => Number(item.trim()));
  const output = document.querySelector("#sum-result");
  if (values.length === 0 || values.some((value) => !Number.isFinite(value))) {
    output.textContent = "Enter numbers separated by commas.";
    return;
  }
  output.textContent = `Sum: ${sumNumbers(...values)}`;
});
