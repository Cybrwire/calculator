const input                   = document.querySelector(".input");
const calculatorDisplayScreen = document.querySelector(".calculator-display-screen");
const maxOperandLength        = 8;
var currentState              = "fresh"; //initial state
var operand1 = operand2 = operator = result = " ";


input.addEventListener('click',(event) => {
  console.log('Target:', event.target); 
  let inputType; // digit or operator
  let key = event.target.textContent; // button on the calculator (1,2,3,C,.,+,=)

  if      (event.target.classList.contains("digit"))    {inputType  = "digit"}
  else if (event.target.classList.contains("operator")) {inputType  = "operator"}
  else                                                  {inputType == "unknown"};
  switch (inputType){
    case "digit":
      if (currentState == "fresh" || currentState == "results_shown") {
        operand1    += key;
        result       = " ";
        currentState = "entering_OP1";
      } else if (currentState == "entering_OP1"){
        if (operand1.length <=maxOperandLength){
          operand1    += key;
          
        }   
      } else if (currentState == "operator_entered" || currentState == "entering_OP2"){
        if (operand2.length <= maxOperandLength){
          operand2    += key;
          currentState = "entering_OP2";
        } 
        
      }
      break;
    case "operator":
      if (key != "=" && key != "C"){
        if(currentState == "entering_OP1" || currentState == "operator_entered"){
          operator     = key;
          currentState = "operator_entered";
        } else if (currentState == "entering_OP2"){
            if (operand2 === " "){
              operator     = key;
              currentState = "operator_entered";
            } else{
              operate(operand1, operand2, operator);
              if (operand2 != 0) {
                operator     = key;
                operand1     = result;
                operand2     = " ";
                result       = " ";
                currentState = "entering_OP2";
              } else {
                operand1 = operand2 = operator = " ";
                currentState = "results_shown";
              }
              
            }
          
        } else if (currentState == "results_shown"){
          if(result !== "A wise guy, eh?"){
            operand1     = result;
            result       = " ";
            operator     = key;
            currentState = "entering_OP2";
          } 
          
        }
      } else if (key == "="){
        if(currentState == "entering_OP2"){
          operate(operand1, operand2, operator);
          operator     = " ";
          operand1     = " ";
          operand2     = " ";
          currentState = "results_shown";          
        }
      } else if (key == "C"){
          if(currentState == "entering_OP1" || currentState == "operator_entered" || currentState == "results_shown"){
            operand1 = operand2 = operator = result = " ";
            currentState = "fresh";
          } else if(currentState = "entering_OP2"){
            operand2 = " ";
            currentState = "operator_entered";
          }
        
      }
        
      break;
    default: console.warn("unrecognized key type");
  }
  updateDisplay();
  console.log("State: "    , currentState);
  console.log("Operand 1: ", operand1);
  console.log("Operator: " , operator);
  console.log("Operand 2: ", operand2);
  console.log("Result: "   , result);


    
});

function updateDisplay(){
  calculatorDisplayScreen.textContent = `${operand1} ${operator} ${operand2}`;
  if (result !== " ") {
    calculatorDisplayScreen.textContent += `${result}`;
  }
}
function operate(_a,_b,op){
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
      if (b == 0){
        result = "A wise guy, eh?"
        break;
      } else {
        result = division(a,b);
        break;
      }
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