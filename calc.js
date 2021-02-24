'use strict';

const calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: false,
    operator: null,
  };

//   numbers

function inputNum(digit){
    const {displayValue, secondOperand } = calculator;

    if( secondOperand ===true){
        calculator.displayValue = digit;
        calculator.secondOperand = false;
    } else{

         calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
   
    console.log(calculator);

}

// decimal

function inputDecimal(dot){

        if(calculator.secondOperand ===true){
            calculator.displayValue = '0.'
            calculator.secondOperand = false;
            return;
        }

    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue+= dot;
    }
}

// calculator display
function updateDisplay(){
    
    const display = document.querySelector('.calculator-screen');

    display.value = calculator.displayValue;
}
updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {

    const {target} = event;
    const { value} = target;
 
    if (!target.matches('button')){
        return;
    }

    if (target.classList.contains ('operator')){
        // console.log('operator', target.value);
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
            inputDecimal(target.value);
            updateDisplay();
        return;
    }    
    if (target.classList.contains('all-clear')){
        // console.log('clear', target.value);
        resetCalc();
        updateDisplay();
        return;
    }

        // console.log('digit', target.value);
        inputNum(target.value);
        updateDisplay();

});

function handleOperator(nextOp){

    const {firstOperand, displayValue, operator} = calculator

    const inputValue = parseFloat(displayValue);

    if ( operator && calculator.secondOperand){
        calculator.operator = nextOp;
        console.log(calculator);
        return; 
    }

    if (firstOperand == null && !isNaN(inputValue)){

        calculator.firstOperand = inputValue;

    } else if (operator){

        const result = calculate (firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(9))}`;
        calculator.firstOperand = result;
    }

    calculator.secondOperand = true;
    calculator.operator = nextOp;

    console.log(calculator);
}


function calculate(firstOper, secondOper, operator){
    if ( operator === '+'){
        return firstOper + secondOper;
    } else if ( operator ==='-'){
        return firstOper - secondOper;
    } else if (operator === '*'){
        return firstOper * secondOper;
    } else if ( operator === '/'){
        return firstOper / secondOper;
    }

    return secondOper;
}


function resetCalc(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.secondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}






















