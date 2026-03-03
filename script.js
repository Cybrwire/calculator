const input = document.querySelector(".input");
var operant1, operant2, operator, result;
var currentState = "fresh";

input.addEventListener('click',(event) => {
  console.log('Target:', event.target); 
  let key = event.target;
    if (currentState === "fresh" && key.parentElement.classList.contains("numberpad")){
      operant1 = key.textContent;
      currentState = "entering_1st_operant";
    }
    else if (currentState === "entering_1st_operant"){
      
    }
    console.log("State: ", currentState);
});

