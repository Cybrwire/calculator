const input = document.querySelector(".input");
const calculatorDisplayScreen = document.querySelector(".calculator-display-screen");
var operand1 = operand2 = operator = result = " ";
var currentState = "fresh"; 

calculatorDisplayScreen.textContent = result;

input.addEventListener('click',(event) => {
  console.log('Target:', event.target); 
  let inputType; // digit or operator
  let key = event.target; // button on the calculator (1,2,3,C,.,+,=)

  if      (key.classList.contains("digit"))    {inputType = "digit"}
  else if (key.classList.contains("operator")) {inputType = "operator"}
  else    {inputType == "unknown"};
    switch (inputType){
      case "digit":
        if (currentState == "fresh" || currentState == "result_shown") {
          operand1    += key.textContent;
          currentState = "entering_OP1";
        } else if (currentState == "entering_OP1"){
          operand1    += key.textContent;
        } else if (currentState == "operator_entered" || currentState == "entering_OP2"){
          operand2    += key.textContent;
          currentState = "entering_OP2";
        }
        break;
      case "operator":
        if (key.textContent != "=" && key.textContent != "C"){
          if (currentState == "entering_OP1" || currentState == "operator_entered"){
            operator     = key.textContent;
            currentState = "operator_entered";
          } else if (currentState == "entering_OP2"){
            if (operand2 ===" "){
              operator     = key.textContent;
              currentState = "operator_entered";
            } else{
              calculate(operand1, operand2, operator);
              operator     = key.textContent;
              operand1     = result;
              operand2     = result = " ";
              currentState = "entering_OP2";
            }
            
          } else if (currentState == "results_shown"){
            //set OP1 = OP2, set operator, then state becomes entering_OP2
          }
        } else if (key.textContent == "="){
          //calculate
        } else if (key.textContent == "C"){
          //reset all
        }
          
        break;
      default: console.warn("unrecognized key type");
    }
    updateDisplay();
    console.log("State: ", currentState);
    console.log("Operand 1: ", operand1);
    console.log("Operator: ", operator);
    console.log("Operand 2: ", operand2);

    
});

function updateDisplay(){
  calculatorDisplayScreen.textContent = `${operand1} ${operator} ${operand2} = ${result}`;
}
function calculate(_a,_b,op){
  let a = Number(_a);
  let b = Number(_b);

  switch (op){
    case "+":
      result = add(a,b);
      break;
    case "-":
      result = subtract(a,b);
      break;
    case "*":
      result = multiply(a,b);
      break;
    case "/":
      result = division(a,b);
      break;
  }
    
}
function add(a,b){
  return a + b;
}
function subtract(a,b){
  return a - b;
}
function multiply(a,b){
  return a * b;
}
function division(a,b){
  return a / b;
}