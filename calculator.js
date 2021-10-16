/* Define behavior of calculator
    Example: calculate 6 + 5
    The display will show "6" when 6 is entered; 
    continue to show "6" when + is entered; 
    show "5" when 5 is entered;
    and then show "11" when = is entered.

    The calculator will not handle precedence 
    of x or ÷, but will perform operation 
    from left to right. 
    Example: user enters in order 6 + 4 / 2
    The answer will be (6 + 4) / 2 = 5;
    not 6 + (4 / 2) = 8.


*/

/* Define variables. 
    - total: (INTEGER) running total
    - operator: (STRING) +, -, x, or ÷ 
    - curr_num: (INTEGER) current number; reset to null if value entered is an operator
*/


let total = 0; 
let operator = null; 
let curr_num = 0;

const operators = ["+", "-", "x", "÷"];
const symbols = ["C", "←", "="];

/* User enters a number n (STRING).*/
function makesNumber(n) {

    curr_num = curr_num * 10 + parseInt(n);
    updateDisplay(curr_num.toString());
    
}

/* User enters a symbol s (STRING).*/
function makesSymbol(s) {
    if (s === "C") { // clears and reset everything
        startState();
    } else if (s === "←") { // backspace
        curr_num = curr_num < 10 ? 0 : Math.floor(curr_num / 10);
        updateDisplay(curr_num.toString());
    } else if (s === "=") { // s is "="
        calculate();
        updateDisplay(total.toString());
        resetOperator();
        resetCurr_Num();
    }
}

/* User entered an operator */
function enteredOperator(input) {
    calculate();
    // total = curr_num;
    operator = input;
    resetCurr_Num();

}

/* Perform calculation. */
function calculate() {

    total = parseInt(total);
    curr_num = parseInt(curr_num);
    if (operator === "+") {
        total += curr_num;
    } else if (operator === "-") {
        total -= curr_num;
    } else if (operator === "x") {
        total *= curr_num;
    } else if (operator === "÷") {
        total /= curr_num;
    } else if (operator === null) {
        total += curr_num;
    }
    
}

/* State before any calculation is performed, also after "C" is pressed. */
function startState() {
    total = 0;
    operator = null;
    curr_num = 0;
    updateDisplay("0");
}

/* Re-set current number. Occurs when an operator is entered. */
function resetCurr_Num() {
    curr_num = 0;
}

/* Re-set operator to null. Occurs after a calculation is performed. */
function resetOperator() {
    operator = null;
}

/* Change display on the screen. */
function updateDisplay(newValue) {
    const curr_display = document.getElementsByClassName("result-screen");
    curr_display[0].innerHTML = newValue;
}

/* Set listener. */
function listener() {

    let allButtons = document.getElementsByClassName("buttons");

    for (idx = 0; idx < allButtons.length; idx ++) {

        let item = allButtons[idx];

        item.addEventListener("click", () => {
            let input = item.innerText;
            if (symbols.includes(input)) { // user inputs symbols: C, ←, or =
                makesSymbol(input);
            } else if (operators.includes(input)) { // user inputs an operator
                enteredOperator(input);
            } else { // user inputs a number
                makesNumber(input);
            }
        })
    }
}

listener();

