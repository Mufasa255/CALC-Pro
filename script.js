function appendCharacter(character) {
    const display = document.getElementById('display');
    if (display.value === '' && (character === '+' || character === '-' || character === '*' || character==='.' || character === '/')) {
        return; // Prevent starting with an operator or dcp point
    }
    display.value += character;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLastCharacter() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function evaluateExpression() {
    const display = document.getElementById('display');
    try {
        display.value = eval(display.value);
    } catch (e) {
        display.value = 'Error';
    }
}
