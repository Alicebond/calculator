"use strict";

const displayContent = document.querySelector(".display--content");
const container = document.querySelector(".grid-container");

let tempValue = "",
  num1 = 0,
  num2 = 0,
  op,
  result;

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (!b) return "ERROR!";
  else return a / b;
  // return !b ? "ERROR!" : (a / b).toFixed(9);
}

function operate(operator, a, b) {
  if (operator === "+") result = addition(a, b);
  else if (operator === "-") result = subtraction(a, b);
  else if (operator === "*") result = multiplication(a, b);
  else result = division(a, b);

  if (result.toString().length < 9) showContent(result);
  else showContent(result.toFixed(9));
}

function showContent(value) {
  displayContent.textContent = value;
}

container.addEventListener("click", (e) => {
  const isBtn = e.target.nodeName === "BUTTON";
  if (!isBtn) return;

  if (e.target.dataset.num) {
    if (e.target.id === "dot") e.target.disabled = true;
    tempValue += e.target.dataset.num;
    getNum(tempValue);
    showContent(tempValue);
  } else if (e.target.dataset.op) getOp(e.target.dataset.op);
  else if (e.target.dataset.equal) pressEqual();
  else if (e.target.dataset.clear) clear();
});

function getNum(tempValue) {
  if (op) {
    num2 = +tempValue;
  } else {
    num1 = +tempValue;
  }

  // op ? (num2 = +tempValue) : (num1 = +tempValue);
}

function getOp(a) {
  if (!tempValue || tempValue === ".") return;
  pressDot();
  if (op && num1 && num2) {
    operate(op, num1, num2);
    num1 = +displayContent.textContent;
  } else if (displayContent.textContent && !op && !num1) {
    num1 = +displayContent.textContent;
  }
  op = a;
  tempValue = "";
}

function pressEqual() {
  if (!op || !tempValue || tempValue === ".") return;
  pressDot();
  operate(op, num1, num2);
  console.log(op, num1, num2);
  resetValue();
}

function clear() {
  pressDot();
  displayContent.textContent = "0";
  resetValue();
}

function resetValue() {
  tempValue = "";
  num1 = 0;
  num2 = 0;
  op = undefined;
  result = undefined;
}

function pressDot() {
  document.querySelector("#dot").disabled = false;
}

const numStr = "1234567890.";
const opStr = "+-*/";

document.addEventListener("keydown", (e) => {
  if (numStr.includes(e.key)) {
    if (tempValue.includes(".") && e.key === ".") {
      document.querySelector("#dot").disabled = ture;
      return false;
    }
    tempValue += e.key;
    getNum(tempValue);
    showContent(tempValue);
  } else if (opStr.includes(e.key)) getOp(e.key);
  else if (e.key === "Enter") pressEqual();
  else if (e.key === "Backspace") clear();
});
