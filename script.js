let currentInput = '';
let operator = '';
let firstNumber = '';

function updateDisplay() {
    document.getElementById('display').textContent = currentInput || '0';
}

function appendNumber(num) {
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    if (firstNumber !== '') calculate(); // If there's a pending operation, calculate it
    firstNumber = currentInput;
    operator = op;
    currentInput = '';
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    firstNumber = '';
    updateDisplay();
}

function calculate() {
    if (firstNumber === '' || currentInput === '') return;

    fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first: firstNumber, operator: operator, second: currentInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            currentInput = data.error;
        } else {
            currentInput = data.result;
        }
        operator = '';
        firstNumber = '';
        updateDisplay();
    })
    .catch(error => {
        currentInput = "Error";
        updateDisplay();
    });
}
