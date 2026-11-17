// Pure functions keep each calculation predictable and reusable.
export const operations = {
  "+": { label: "Addition", calculate: (a, b) => a + b },
  "−": { label: "Subtraction", calculate: (a, b) => a - b },
  "×": { label: "Multiplication", calculate: (a, b) => a * b },
  "÷": { label: "Division", calculate: (a, b) => a / b },
};

export function calculateResult(first, second, operator) {
  const operation = operations[operator];
  if (!operation) throw new Error("Choose a valid operation.");
  if (operator === "÷" && second === 0) throw new Error("You cannot divide by zero.");
  const result = operation.calculate(first, second);
  if (!Number.isFinite(result)) throw new Error("The result is outside the supported range.");
  return result;
}

export function formatNumber(value, maximumFractionDigits = 8) {
  if (!Number.isFinite(value)) return "Error";
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}
