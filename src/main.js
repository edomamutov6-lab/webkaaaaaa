import { calculateResult, formatNumber, operations } from "./calculator.js";

const display = document.querySelector("#display");
const status = document.querySelector("#status");
const keypad = document.querySelector(".keypad");
const state = { current: "0", stored: null, operator: null, replaceCurrent: false };

const showStatus = (message = "Ready") => { status.textContent = message; };
const render = () => { display.textContent = state.current; };
const clearSelection = () => document.querySelectorAll("[data-operator]").forEach((button) => button.classList.remove("selected"));

function inputDigit(digit) {
  if (state.replaceCurrent || state.current === "0" || state.current === "Error") {
    state.current = digit;
    state.replaceCurrent = false;
  } else if (state.current.length < 14) {
    state.current += digit;
  }
  showStatus();
  render();
}

function inputDecimal() {
  if (state.replaceCurrent || state.current === "Error") {
    state.current = "0.";
    state.replaceCurrent = false;
  } else if (!state.current.includes(".")) {
    state.current += ".";
  }
  render();
}

function chooseOperator(operator) {
  if (!operations[operator]) return;
  if (state.operator && !state.replaceCurrent) performCalculation();
  state.stored = Number(state.current);
  state.operator = operator;
  state.replaceCurrent = true;
  clearSelection();
  document.querySelector(`[data-operator="${operator}"]`)?.classList.add("selected");
  showStatus(`${formatNumber(state.stored)} ${operator}`);
  render();
}

function performCalculation() {
  if (state.operator === null || state.stored === null) return;
  const first = state.stored;
  const second = Number(state.current);
  const operator = state.operator;
  try {
    const result = calculateResult(first, second, operator);
    state.current = String(result);
    showStatus(`${formatNumber(first)} ${operator} ${formatNumber(second)} =`);
    state.stored = null;
    state.operator = null;
    state.replaceCurrent = true;
    clearSelection();
  } catch (error) {
    state.current = "Error";
    showStatus(error.message);
    state.stored = null;
    state.operator = null;
    state.replaceCurrent = true;
    clearSelection();
  }
  render();
}

function clearCalculator() {
  state.current = "0";
  state.stored = null;
  state.operator = null;
  state.replaceCurrent = false;
  clearSelection();
  showStatus();
  render();
}

function deleteLastDigit() {
  if (state.replaceCurrent || state.current === "Error") return clearCalculator();
  state.current = state.current.length > 1 ? state.current.slice(0, -1) : "0";
  if (state.current === "-" || state.current === "") state.current = "0";
  render();
}

keypad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  if (button.dataset.digit !== undefined) return inputDigit(button.dataset.digit);
  if (button.dataset.operator) return chooseOperator(button.dataset.operator);
  switch (button.dataset.action) {
    case "clear": clearCalculator(); break;
    case "delete": deleteLastDigit(); break;
    case "decimal": inputDecimal(); break;
    case "equals": performCalculation(); break;
  }
});

document.addEventListener("keydown", (event) => {
  if (/^[0-9]$/.test(event.key)) return inputDigit(event.key);
  if (event.key === ".") return inputDecimal();
  const keyboardOperators = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  if (keyboardOperators[event.key]) {
    event.preventDefault();
    return chooseOperator(keyboardOperators[event.key]);
  }
  if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    return performCalculation();
  }
  if (event.key === "Escape") return clearCalculator();
  if (event.key === "Backspace") return deleteLastDigit();
});

render();
