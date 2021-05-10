"use strict";

const displayContent = document.querySelector(".display--content");
const btns = document.querySelector(".grid-container");

let displayValue = "",
  num1,
  num2,
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
  return !b ? "ERROR!" : a / b;
}

function operate(operator, a, b) {
  if (operator === "+") showContent(addition(a, b));
  else if (operator === "–") showContent(subtraction(a, b));
  else if (operator === "*") showContent(multiplication(a, b));
  else showContent(division(a, b).toFixed(10));
}

btns.addEventListener("click", (e) => {
  const isBtn = e.target.nodeName === "BUTTON";
  if (!isBtn) return;
  if (e.target.classList[0] === "num") {
    if (num1 && num2 && displayValue) clear();
    displayValue += e.target.textContent;
    if (e.target.textContent === ".") e.target.disabled = true;
    showContent(displayValue);
  } else if (e.target.classList[0] === "operator") {
    if (!displayValue || displayValue === ".") return;
    document.querySelector("#dot").disabled = false;
    if (op) {
      num2 = +displayValue;
      operate(op, num1, num2);
      num1 = +displayContent.textContent;
      ope(e);
    } else {
      num1 = +displayValue;
      ope(e);
    }
  } else if (e.target.className === "equal") {
    if (!op || !displayValue || displayValue === ".") return;
    document.querySelector("#dot").disabled = false;
    num2 = +displayValue;
    operate(op, num1, num2);
  } else clear();
});

function ope(e) {
  op = e.target.textContent;
  displayValue = "";
}

function clear() {
  document.querySelector("#dot").disabled = false;
  displayContent.textContent = "0";
  displayValue = "";
  num1 = undefined;
  num2 = undefined;
  op = undefined;
  result = undefined;
}

function showContent(value) {
  displayContent.textContent = value;
}
