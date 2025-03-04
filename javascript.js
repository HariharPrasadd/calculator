function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    if(b == 0){
        return "Thou shalt not."
    }
    else{
        return Number.parseFloat((a/b).toFixed(7));
    }
}

function modulus(a, b){
    return a%b;
}

function operate(a, b, operator){
    if(operator == '+'){
        return add(a, b);
    }
    else if(operator == '-'){
        return subtract(a, b);
    }
    else if(operator == '×'){
        return multiply(a, b);
    }
    else if(operator == '÷'){
        return divide(a, b);
    }
    else if(operator == '%'){
        return modulus(a, b);
    }
}

let num1 = 1.7;
let num2 = 4;
let operator = '×';

console.log(operate(num1, num2, operator))

const buttons = document.querySelectorAll(".button");
const smallScreen = document.querySelector(".small-screen");
const bigScreen = document.querySelector(".big-screen");

buttons.forEach(buttonClick);

function buttonClick(button){
    if(button.textContent != 'Del' && button.textContent != 'AC'){
        button.addEventListener("click", (pressed) => {
            smallScreen.textContent += pressed.target.textContent;
        })
    }
}

