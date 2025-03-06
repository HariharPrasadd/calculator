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
    return Number.parseFloat((a%b).toFixed(7));
}

function operate(a, b, operator){
    if(operator == '+'){
        return add(a, b);
    }
    else if(operator == '-'){
        return subtract(a, b);
    }
    else if(operator == '×' || operator == '*'){
        return multiply(a, b);
    }
    else if(operator == '÷' || operator == '/'){
        return divide(a, b);
    }
    else if(operator == '%'){
        return modulus(a, b);
    }
}

let num1;
let num2;
let operator = '`';
let resultFlag = false;
let expression = 0;
let numOperator = 0;

console.log(operate(num1, num2, operator))

const buttons = document.querySelectorAll(".button");
const smallScreen = document.querySelector(".small-screen");
const bigScreen = document.querySelector(".big-screen");

buttons.forEach(buttonClick);

function isOperator(chara){
    return !(chara >= '0' && chara <= '9');
}

function isKeyboardOperator(oper){
    if(oper == '*' || oper == '+' || oper == '-' || oper == '/'){
        return true;
    }
    else{
        return false;
    }
}

function isNumber(num){
    return (num >= '0' && num <= '9');
}

function buttonClick(button){
    if(button.textContent == 'Del'){
        button.addEventListener("click", () => {
            if(bigScreen.textContent == "Thou shalt not."){
                bigScreen.textContent = '';
                resultFlag = false;
            }
            else{
                bigScreen.textContent = bigScreen.textContent.substring(0, bigScreen.textContent.length - 1);
                expression = (bigScreen.textContent.split(operator))[bigScreen.textContent.split(operator).length - 1];
                resultFlag = false;
            }
        })
    }
    else if(button.textContent == 'AC'){
        button.addEventListener("click", () => {
            bigScreen.textContent = '';
            smallScreen.textContent = '';
            expression = (bigScreen.textContent.split(operator))[bigScreen.textContent.split(operator).length - 1];
            resultFlag = false;
        })
    }
    else if(button.textContent == '.'){
        button.addEventListener("click", (pressed) => {
            if(!(expression.includes('.') || bigScreen.textContent == '')){
                bigScreen.textContent += pressed.target.textContent;
                expression = (bigScreen.textContent.split(operator))[bigScreen.textContent.split(operator).length - 1];
                resultFlag = false;
            }
        })
    }
    else if(button.textContent == '='){
        button.addEventListener("click", () => {
            if(isNumber(bigScreen.textContent[bigScreen.textContent.length - 1]) && bigScreen.textContent.split(operator).length > 1){
                smallScreen.textContent = bigScreen.textContent + '=';
                bigScreen.textContent = operate(+num1, +expression, operator);
                expression = bigScreen.textContent;
                num1 = '';
                numOperator = 0;
                resultFlag = true;
            }
        })
    }
    else if(isOperator(button.textContent)){
        button.addEventListener("click", (pressed) => {
            if(bigScreen.textContent != '' && !isOperator(bigScreen.textContent[bigScreen.textContent.length - 1])){
                ++numOperator;
                if(numOperator > 1){
                    num1 = operate(+num1, +expression, operator);
                    expression = '';
                    operator = pressed.target.textContent;
                    bigScreen.textContent += pressed.target.textContent;
                    resultFlag = false;
                }
                else{
                    num1 = expression;
                    expression = '';
                    operator = pressed.target.textContent;
                    bigScreen.textContent += pressed.target.textContent;
                    resultFlag = false;
                }
            }
        })
    }
    else{
        button.addEventListener("click", (pressed) => {
            if(resultFlag){
                bigScreen.textContent = pressed.target.textContent;
                expression = (bigScreen.textContent.split(operator))[bigScreen.textContent.split(operator).length - 1];
                resultFlag = false;
            }
            else{
                bigScreen.textContent += pressed.target.textContent;
                expression = (bigScreen.textContent.split(operator))[bigScreen.textContent.split(operator).length - 1];
            }
        })
    }
}

document.addEventListener("keyup", (e) => keyboardPress(e));

function keyboardPress(e){
    if(e.code == 'Backspace'){
        if(bigScreen.textContent == "Thou shalt not."){
            bigScreen.textContent = '';
            resultFlag = false;
        }
        else{
            bigScreen.textContent = bigScreen.textContent.substring(0, bigScreen.textContent.length - 1);
            expression = (bigScreen.textContent.split(operator))[bigScreen.textContent.split(operator).length - 1];
            resultFlag = false;
        }
    }
    else if(e.key == '.'){
        if(!(expression.includes('.') || bigScreen.textContent == '')){
            bigScreen.textContent += '.';
            expression = (bigScreen.textContent.split(operator))[bigScreen.textContent.split(operator).length - 1];
            resultFlag = false;
        }
    }
    else if(e.key == '=' || e.code == 'Enter'){
        if(isNumber(bigScreen.textContent[bigScreen.textContent.length - 1])){
            smallScreen.textContent = bigScreen.textContent + '=';
            bigScreen.textContent = operate(+num1, +expression, operator);
            expression = bigScreen.textContent;
            num1 = '';
            numOperator = 0;
            resultFlag = true;
        }
    }
    else if(isKeyboardOperator(e.key)){
        if(bigScreen.textContent != '' && !isOperator(bigScreen.textContent[bigScreen.textContent.length - 1])){
            ++numOperator;
            if(numOperator > 1){
                num1 = operate(+num1, +expression, operator);
                expression = '';
                operator = e.key;
                bigScreen.textContent += e.key;
                resultFlag = false;
            }
            else{
                num1 = expression;
                expression = '';
                operator = e.key;
                bigScreen.textContent += e.key;
                resultFlag = false;
            }
        }
    }
    else if(isNumber(e.key)){
        if(resultFlag){
            bigScreen.textContent = e.key;
            expression = (bigScreen.textContent.split(operator))[bigScreen.textContent.split(operator).length - 1];
            resultFlag = false;
        }
        else{
            bigScreen.textContent += e.key;
            expression = (bigScreen.textContent.split(operator))[bigScreen.textContent.split(operator).length - 1];
        }
    }
}
