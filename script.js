const input = document.querySelector(".input");
const calculatorDisplayScreen = document.querySelector(".calculator-display-screen");
var operand1 = operand2 = operator = " ";
var result = "0";
var currentState = "fresh"; 

calculatorDisplayScreen.textContent = result;

input.addEventListener('click',(event) => {
  console.log('Target:', event.target); 
  let inputType; // digit or operator
  let key = event.target; // button on the calculator (1,2,3,C,.,+,=)
  if (key.classList.contains("digit")) {inputType = "digit"}
  else if (key.classList.contains("operator")) {inputType = "operator"}
  else {inputType == "unknown"};
    switch (inputType){
      case "digit":
        result = "";
        console.log("operand 1 before change", operand1);
        if (currentState == "fresh" || currentState == "result_shown") {
          operand1 += key.textContent;
          currentState = "entering_OP1";
        } else if (currentState == "entering_OP1"){
          operand1 += key.textContent;
        } else if (currentState == "operator_entered" || currentState == "entering_OP2"){
          operand2 += key.textContent;
          currentState == "entering_OP2";
        }
        break;
      case "operator":
        if (currentState == "entering_OP1" || currentState == "operator_entered"){
          operator = key.textContent;
          currentState = "entering_OP2";
        } else if (currentState == "entering_OP2"){
          //calculate
        } else if (currentState == "results_shown"){
          //set OP1 = OP2, set operator, then state becomes entering_OP2
        }
        break;
      default: console.warn("unrecognized key type");
    }
    updateDisplay();
    console.log("State: ", currentState);
    console.log("Operand 1: ", operand1)
});

function updateDisplay(){

  calculatorDisplayScreen.textContent = `${operand1} ${operator} ${operand2} = ${result}`;
}
