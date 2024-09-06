function appendCharacter(character) {
    const display = document.getElementById('display');
    let currentValue = display.value;

    // Prevent starting with an operator
    if (currentValue === '' && ['+', '-', '*', '/'].includes(character)) {
        return;
    }

    // Prevent consecutive operators
    if (['+', '-', '*', '/'].includes(character) && ['+', '-', '*', '/'].includes(currentValue.slice(-1))) {
        return;
    }

    // Prevent multiple decimal points in a single number
    if (character === '.') {
        // Split on operators to ensure only one decimal per number segment
        const segments = currentValue.split(/[\+\-\*\/]/);
        const lastSegment = segments[segments.length - 1];
        if (lastSegment.includes('.')) {
            return;
        }
    }

    display.value += character;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLastCharacter() {
    const display = document.getElementById('display');
    let currentValue = display.value;

    // Remove the last character
    display.value = currentValue.slice(0, -1);
}

function isValidExpression(expression) {
    try {
        // Validate the expression
        return !!eval(expression);
    } catch {
        return false;
    }
}

function evaluateExpression() {
    const display = document.getElementById('display');
    let expression = display.value;

    // Prevent starting with an operator or ending with an operator
    if (expression === '' || ['+', '-', '*', '/'].includes(expression.slice(-1))) {
        display.value = 'Error';
        return;
    }

    // Replace 'X' with '*' for multiplication
    expression = expression.replace(/X/g, '*');

    try {
        // Check for invalid expressions
        if (!isValidExpression(expression)) {
            throw new Error('Invalid expression');
        }

        // Evaluate the expression
        let result = eval(expression);

        // Handle division by zero
        if (!isFinite(result)) {
            throw new Error('Division by zero');
        }

        display.value = result;
    } catch (e) {
        display.value = e.message;
    }
}

// Function to handle keyboard input
function handleKeyboardInput(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendCharacter(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendCharacter(key);
    } else if (key === '.') {
        appendCharacter('.');
    } else if (key === 'Enter' || key === '=') {
        evaluateExpression();
    } else if (key === 'Backspace') {
        deleteLastCharacter();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '(' || key === ')') {
        appendCharacter(key);
    }
}

// Add event listener for keyboard input
window.addEventListener('keydown', handleKeyboardInput);
