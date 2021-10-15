const calculationInput = document.getElementById("calculationInput");
const calculatorBody = document.querySelector(".calculator-body");
const previousOperation = document.querySelector(".previous-operator");

//reducing font size when value is bigger than 10
calculationInput.addEventListener("input", reduceFont);
function reduceFont() {
  //getting the input value
  let inv = calculationInput.value;
  //what to do with value
  if (inv.length >= 10) {
    calculationInput.classList.add("fs30");
  } else if (inv.length <= 10) {
    calculationInput.classList.remove("fs30");
  }
}
//store some variables so they won't change when click
let previousKeyType;
let firstNumber;
let operator;
let modValue;
let prevAnswer = ["0"];
let prevAnswer_index = prevAnswer.length;

calculatorBody.addEventListener("click", (event) => {
  if (event.target.matches("button")) {
    const key = event.target;
    const action = key.dataset.action;
    const clickedKey = key.textContent;
    const inputContent = calculationInput.value;


    //if clicked on number key
    if (!action) {
      if (
        inputContent === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        calculationInput.value = clickedKey;
        
      } else {
        calculationInput.value = inputContent + clickedKey;
      }
      previousKeyType = "number";
    }

    //if clicked on operator key
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide" ||
      action === "divideByTwo" ||
      action === "supTwo" ||
      action === "percentage" ||
      action === "powx" ||
      action === "rootsquare"
    ) {
    

      if (firstNumber &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const result = calc(firstNumber, operator, inputContent);
        calculationInput.value = result;
        firstNumber = result;      
      } else {
        firstNumber = inputContent;
      }
     

      //setting previous key type as operator,  settingvoperator type as clicked operator(using action dataset)
      previousKeyType = "operator";
      operator = action;
    }

    //if clicked on other keys
    if (action === "decimal") {
      if (!inputContent.includes(".")) {
        calculationInput.value = inputContent + ".";
      } else if (previousKeyType === "operator") {
        inputContent.value = "0.";
      }

      previousKeyType = "decimal";
    }

    //clear functionality e.g: All Clear, Clear entry
    const clearKey = calculatorBody.querySelector('[data-action="clear"]');
    if (action === "clear") {
      if (clearKey.textContent === "AC") {
        //if clear button (AC) = AC 
        firstNumber = '';
        modValue = '';
        operator = '';
        previousKeyType = '';
        previousOperation.textContent = "";

      } else {
        key.textContent = 'AC'
      }

      calculationInput.value = "0";
      previousKeyType = "clear";

    }

    if (action !== "clear" && action !== "backspace") {
      clearKey.textContent = "CE";

    }

    if (action === "equal") {
      const firstValue = firstNumber;
      const sOperator = operator;
      const secondValue = inputContent;
      if (firstValue) {
        if (previousKeyType === "equal") {
          firstValue = inputContent;
          secondValue = modValue;
        }
        const lastCalc = calc(firstValue, sOperator, secondValue);
        calculationInput.value = lastCalc;
        previousOperation.innerHTML = checkOperator(firstValue, sOperator, secondValue);
        prevAnswer.push(lastCalc);
      }

      previousKeyType = "calculate";
    }

    if(action === "divideByTwo"){
        previousKeyType = "divideByTwo";
    }
    if(action === "backspace"){
      let displayLength = inputContent;
      if(displayLength !== "0"){
        let editedNumber = inputContent.slice(0, -1);
        calculationInput.value = editedNumber;
      }
      if(displayLength === ""){
        calculationInput.value = "0";
      }
      previousKeyType = "backspace";
    }
   
    if(action === "supTwo"){
      previousKeyType = "supTwo";
    }

    if(action === "ans"){
        prevAnswer_index = prevAnswer.length;
        let ansIndex = 0;
        calculationInput.value = prevAnswer[prevAnswer_index - 1];

        console.log(prevAnswer)
        console.log(prevAnswer_index)
      previousKeyType = "ans";
    }

    reduceFont();
  }
});




//outer functions that need to be used both inside and outside the click eventlistener
const calc = (number1, operator, number2) => {
  //converting string to float number
  const firstNumToFloat = parseFloat(number1);
  const secondNumToFloat = parseFloat(number2);
  //doing calculation based on previous entered operator, and returning number 1 (operator e.g: + -) number two
  if (operator === "add") return firstNumToFloat + secondNumToFloat;

  if (operator === "subtract") return firstNumToFloat - secondNumToFloat;

  if (operator === "multiply") return firstNumToFloat * secondNumToFloat;

  if (operator === "divide") return firstNumToFloat / secondNumToFloat;

  if (operator === "divideByTwo") return firstNumToFloat / 2;

  if(operator === "supTwo") return (Math.pow(firstNumToFloat, 2));

  if (operator === "percentage") return firstNumToFloat % secondNumToFloat;

  if (operator === "powx") return Math.pow(firstNumToFloat, secondNumToFloat);
  
  if (operator === "rootsquare") return Math.sqrt(firstNumToFloat);

};
//click on element using Id as a parametre
function clickElementByID(id){
  document.getElementById(id).click();
}


//key binding 


//add numbers using keyboard
let a;
const keyboardNumbers = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"];
const equalButton = document.getElementById("equal");
//adding the evnet listener for keyboard keys
document.addEventListener("keydown", numKeys);
function numKeys(event) {
 
  //calculate by hitting "Enter" key
    blurBtns();

  if (event.key === "Enter" || event.key === "=") {
    equalButton.click();
  }

  //adding support to keyboard numbers
  for (let i = 0; i < keyboardNumbers.length; i++) {

    const nums = keyboardNumbers[i];

    if (event.key.includes(nums)) {
      let numIndex = parseInt(event.key);
      document.getElementById("num"+numIndex).click();

    }
  }

  //addinng operator support 
  //add
  if(event.key === "+" || event.key === "p"){
    clickElementByID("add");
  }
  //subtract
  if(event.key === "-"){
    clickElementByID("subtract");
  }
  //divide
  if(event.key === "/"){
    clickElementByID("divide");
  }
  //multiply
  if(event.key === "*" || event.key === "x"){
    clickElementByID("multiply");
  }

  //backspace 
  if(event.key === "Backspace"){
    clickElementByID("backspace");
  }


}

function blurBtns(){
  const buttons_bl = calculatorBody.querySelectorAll("button");
  buttons_bl.forEach(element => {
    element.blur();
  });
}


function checkOperator(firstValue, operator, secondValue){
  switch (operator) {
    case "add":
      return firstValue + " + " + secondValue;
      break;
  case "subtract":
    return firstValue + " - " + secondValue;
    break;
  case "multiply":
    return firstValue + " x " + secondValue;
    break;
  case "divide":
    return firstValue +  " &#247; " + secondValue;
    break;
  case "divideByTwo":
    return firstValue +  " &#247; 2 " + secondValue;
    break;
  case "supTwo":
    return firstValue +  " <sup>2</sup> " + secondValue;
    break;
  case "percentage":
    return firstValue +  " % " + secondValue;
    break;
  case "powx":
    return firstValue +  "<sup>"+ secondValue+"</sup>";
    break;
  case "rootsquare":
    return "&radic;" + firstValue;
  break;
  }

}

//tooltip copy content on click
const calculatorHead = document.querySelector(".calculator-head");
const clickDiv = calculatorHead.querySelector("#clickDiv");
const inputToolTip = document.querySelector("#inputToolTip");
const tooltipText = inputToolTip.querySelector(".textContent");

clickDiv.addEventListener("click", ()=>{
  const valueToCopy = calculationInput.value;
  const slicedForLowEndMobile = valueToCopy.slice(0, 1000);
  navigator.clipboard.writeText(slicedForLowEndMobile);
  tooltipText.textContent = "Copied!";
});
calculatorHead.addEventListener("mouseleave", ()=>{
  setTimeout(() => {
    tooltipText.textContent = "Copy";
  }, 200);
});


//add head menu

const menuButton = document.querySelector("#menuLines");
const menu = document.querySelector(".headMenu");

menuButton.addEventListener("click", showMenu);
function showMenu(){
  menu.classList.toggle("visible");
}



window.addEventListener("click", (event)=>{
  if(!menu.contains(event.target) && !menuButton.contains(event.target)){
    menu.classList.remove("visible");
  }

});


