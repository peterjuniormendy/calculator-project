const body = document.body;
const keypads = document.querySelectorAll(".keypads");
const calcScreen = document.querySelector("#inputWrapper");
const equalsToBtn = document.querySelector("button[type='submit']");
const deleteBtn = document.querySelector("#delBtn");
const resetBtn = document.querySelector("#reset");
const screen = document.querySelector("#screen");
const textToColor = document.querySelectorAll(".textColor");
const themeBtns = document.querySelectorAll("#themeBtnsContainer button");
const themeToggleSpace = document.querySelector("#theme");
const keypadsWrapper = document.querySelector("#keypads");
const resultWrapper = document.querySelector("#result");
const errorMessage = document.querySelector("#error");
let colorTheme;

loadTheme();

initializeValue(0);

keypads.forEach((key) => key.addEventListener("click", getInput));
themeBtns.forEach((btn) => btn.addEventListener("click", toggleTheme));
equalsToBtn.addEventListener("click", evaluateInput);
deleteBtn.addEventListener("click", deleteFunction);
resetBtn.addEventListener("click", resetFunction);

// CALCULATOR FUNCTIONALITY FUNCTIONS
function initializeValue(value) {
  calcScreen.textContent = value;
  resultWrapper.classList.remove("showResult");
}

let operators = document.querySelectorAll(".operators");
function getInput(e) {
  if (calcScreen.textContent == 0) {
    calcScreen.textContent = e.target.textContent;
  } else {
    calcScreen.textContent += e.target.textContent;
    resultWrapper.classList.remove("showResult");
  }
}

function evaluateInput() {
  if (
    "/*".includes(calcScreen.textContent[0]) ||
    "/*+-".includes(calcScreen.textContent[calcScreen.textContent.length - 1])
  ) {
    errorMessage.classList.remove("d-none");
    calcScreen.classList.add("d-none");
  } else {
    evaluate();
  }
}
function evaluate() {
  resultWrapper.textContent = calcScreen.textContent;
  calcScreen.textContent = eval(calcScreen.textContent);
  resultWrapper.classList.add("showResult");
}

function deleteFunction() {
  if (calcScreen.textContent.length > 1) {
    calcScreen.textContent = calcScreen.textContent.slice(
      0,
      calcScreen.textContent.length - 1
    );
  } else {
    initializeValue(0);
  }
}

function resetFunction() {
  resultWrapper.classList.remove("normal");
  errorMessage.classList.add("d-none");
  calcScreen.classList.remove("d-none");
  initializeValue(0);
}

// THEME FUNCTIONALITY FUNCTIONS
function loadTheme() {
  fetchTheme();
  setTheme(colorTheme);
}

function fetchTheme() {
  colorTheme = localStorage.getItem("color");
  if (!colorTheme) {
    colorTheme = "default";
  }
}

function toggleTheme(event) {
  let theme = event.target.getAttribute("data-color");
  setTheme(theme);
  localStorage.setItem("color", theme);
}

function setTheme(ele) {
  if (ele == "light") {
    lightTheme(ele);
  } else if (ele == "dark") {
    darkTheme(ele);
  } else {
    defaultTheme(ele);
  }
}

function styleBody(theme) {
  body.classList = "";
  body.classList.add(theme);
}
function toggleClass(element, cls1, cls2) {
  element.classList.remove(cls1);
  element.classList.add(cls2);
}

function lightTheme(el) {
  styleBody(el);
  themeToggleSpace.classList.remove("defaultThemeSpace", "themeToggle-d-bg");
  themeToggleSpace.classList.add("themeToggle-l-bg");
  screen.classList.remove("screen-bg", "screen-d-bg");
  screen.classList.add("screen-l-bg");

  keypadsWrapper.classList.remove("keypads-bg", "keypads-d-bg");
  keypadsWrapper.classList.add("keypads-l-bg");

  keypads.forEach((key) => {
    key.classList.remove("keypads-bg", "keys-d-bg", "keys-d-color");
    key.classList.add("keys-l-bg", "keys-l-color");
  });
  textToColor.forEach((text) => {
    text.classList.remove("text-white", "keys-d-color");
    text.classList.add("text-dark");
  });
  toggleClass(deleteBtn, "btn-d-bg", "btn-l-bg");
  toggleClass(resetBtn, "btn-d-bg", "btn-l-bg");
  equalsToBtn.classList.remove("text-dark", "equalBtn-d");
}
function darkTheme(el) {
  styleBody(el);
  themeToggleSpace.classList.remove("themeToggle-l-bg", "defaultThemeSpace");
  themeToggleSpace.classList.add("themeToggle-d-bg");

  screen.classList.remove("screen-bg", "screen-l-bg");
  screen.classList.add("screen-d-bg");

  keypadsWrapper.classList.remove("keypads-bg", "keypads-l-bg");
  keypadsWrapper.classList.add("keypads-d-bg");

  keypads.forEach((key) => {
    key.classList.remove("keys-l-bg", "text-white", "keypads-bg");
    key.classList.add("keys-d-bg", "keys-d-color");
  });
  textToColor.forEach((text) => {
    text.classList.remove("text-white", "text-dark");
    text.classList.add("keys-d-color");
  });
  toggleClass(deleteBtn, "btn-l-bg", "btn-d-bg");
  toggleClass(resetBtn, "btn-l-bg", "btn-d-bg");
  equalsToBtn.classList.remove("text-white");
  equalsToBtn.classList.add("text-dark", "equalBtn-d");
}

function defaultTheme(el) {
  styleBody(el);
  themeToggleSpace.classList.remove("themeToggle-l-bg", "themeToggle-d-bg");
  themeToggleSpace.classList.add("defaultThemeSpace");

  screen.classList.remove("screen-d-bg", "screen-l-bg");
  screen.classList.add("screen-bg");

  keypadsWrapper.classList.remove("keypads-l-bg", "keypads-d-bg");
  keypadsWrapper.classList.add("keypads-bg");

  keypads.forEach((key) => {
    key.classList.remove("keys-l-bg", "keys-d-bg", "keys-d-color");
  });
  textToColor.forEach((text) => {
    text.classList.remove("text-dark", "keys-d-color");
    text.classList.add("text-white");
  });
  deleteBtn.classList.remove("btn-l-bg", "btn-d-bg");
  resetBtn.classList.remove("btn-l-bg", "btn-d-bg");
  equalsToBtn.classList.remove("text-dark", "equalBtn-d");
}
