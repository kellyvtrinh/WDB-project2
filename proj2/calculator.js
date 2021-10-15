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

    The backspace ← will only apply to delete 
    digits, not operator. 

*/

/* Define variables. 
    - total: (INTEGER) running total
    - operator: (STRING) +, -, x, or ÷ 
    - curr_num: (INTEGER) current number; reset to null if value entered is an operator
*/

let total = 0; 
let operator = null; 
let curr_num = null;

const operators = ["+", "-", "x", "÷"];
const symbols = ["C", "←", "="];

/* User enters a number n (STRING).*/
function makesNumber(n) {

    if (curr_num === null) { // make a new number
        curr_num = n;
        
    } else { 
        // a previous value is already entered, add to that value 
        // example: previous value is 5, n = 3, so curr_num = 53
        curr_num = curr_num * 10 + parseInt(n);
    }

    console.log("Display input value: " + n);
    console.log("Display current number: " + curr_num);
    updateDisplay(curr_num.toString());
    
}

/* User enters a symbol s (STRING).*/
function makesSymbol(s) {
    if (s === "C") { // clears and reset everything
        total = 0;
        operator = null;
        curr_num = null;
        updateDisplay("0");
    } else if (s === "←") { // backspace
        curr_num = curr_num < 10 ? null : Math.floor(curr_num / 10);
        updateDisplay(curr_num.toString());
    } else { // s is "="
        calculate();
        updateDisplay(total.toString());
        operator = null;
        curr_num = null;
    }
}

/* Perform calculation. */
function calculate() {
    if (operator === "+") {
        total += curr_num;
    } else if (operator === "-") {
        total -= curr_num;
    } else if (operator === "x") {
        total *= curr_num;
    } else {
        total /= curr_num;
    }
}

/* Change display on the screen. */
function updateDisplay(newValue) {
    const curr_display = document.getElementsByClassName("result-screen");
    curr_display[0].innerHTML = newValue;
}

/* Set listener. */
function listener() {

    console.log("Successfully called listener!")
    let allButtons = document.getElementsByClassName("buttons");

    for (idx = 0; idx < allButtons.length; idx ++) {

        let item = allButtons[idx];

        item.addEventListener("click", () => {
            let input = item.innerText;
            if (symbols.includes(input)) { // user inputs symbols: C, ←, or =
                makesSymbol(input);
            } else if (operators.includes(input)) { // user inputs an operator
                if ((operator != null) & (curr_num != null)) { 
                    // in this case, the user input multiple an equation with multiple
                    // operators, such as 4 + 5 / 2. 
                    // the calculator will then just calculate 4 + 5 
                    calculate();
                }
                operator = input;
            } else { // user inputs a number
                console.log("Successfully go to makesNumber")
                makesNumber(input);
            }
        })
    }
}

console.log("hello from calculator.js!");
listener();