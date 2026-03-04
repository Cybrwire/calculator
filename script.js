const input = document.querySelector(".input");
var operant1, operant2, operator, result;
var currentState = "fresh";

input.addEventListener('click',(event) => {
  console.log('Target:', event.target); 
  let keyPress;
  if (event.target.classList.contains("digit")) {key = "digit"}; 
  elseif (event.target.classList.contains("operator")) {key = "operator"}; 
    switch (){
      case digit:
        if (currentState == "fresh"){

        }


    }
    console.log("State: ", currentState);
});

