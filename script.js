"use strict";

const displayContent = document.querySelector(".display--content");
const container = document.querySelector(".grid-container");

let tempValue = "",
  num1 = 0,
  num2 = 0,
  op;

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
  else return (a / b).toFixed(9);
  // return !b ? "ERROR!" : (a / b).toFixed(9);
}

function operate(operator, a, b) {
  if (operator === "+") showContent(addition(a, b));
  else if (operator === "–") showContent(subtraction(a, b));
  else if (operator === "*") showContent(multiplication(a, b));
  else showContent(division(a, b));
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
  } else if (e.target.dataset.op) getOp(e);
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

function getOp(e) {
  if (!displayContent.textContent || tempValue === ".") return;
  pressDot();
  if (op && num1 && num2) {
    operate(op, num1, num2);
    num1 = +displayContent.textContent;
  } else if (displayContent.textContent && !op && !num1) {
    num1 = +displayContent.textContent;
  }
  op = e.target.textContent;
  tempValue = "";
}

function pressEqual() {
  if (!op || !tempValue || tempValue === ".") return;
  pressDot();
  operate(op, num1, num2);
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
}

function pressDot() {
  document.querySelector("#dot").disabled = false;
}
