const CALCULATOR_STATUS =
{
    "Initial" : "Initial",
    "Ready" : "Ready",
    "Inputting" : "Inputting",
    "Checking" : "Checking",
    "Sanitizing" : "Sanitizing",
    "Calculating" : "Calculating",
    "Results" : "Results",
    "Error" : "Error",
    "Gge" : "Gge",
    "Unknown" : "Unknown",
    "DivideByZero" : "DivideByZero"
}

const CALCULATOR_STATUS_MAP =
{
    Initial :       "Calculator state before anything happens.",
    Ready :         "Awaiting user input.",
    Inputting :     "Receiving input.",
    Checking :      "Checking for valid input.",
    Sanitizing :    "Sanitizing nonnumerical data with 70% isopropyl alchohol.",
    Calculating :   "Numbers working according to plan.",
    Results :       "Boom, ${verbing}. The ${resultName} ${prepo} ${firstTerm} ${conjunct} ${secondTerm} is ${value}.",
    Error :         "An error has occurred. Hope the developer fixes it soon.",
    Gge :           "ollǝɥ",
    Unknown :       "We're not in Kansas anymore.",
    DivideByZero :  "Warning: Dividing by zero is not allowed until the ⱺ numberline is discovered."
}

let abacus;

window.onload = CreateCalculator();

// setup variables and get a calculator instance
function CreateCalculator()
{
    this.abacus = new Calculator(0, 0, "Add");

    setCalculatorNumbersFromInput();
    setCalculatorOperatorFromInput();
    clearResult();


    addEventListeners();

    setStatus("Ready");
}

    function setCalculatorNumbersFromInput()
    {
        let inputElement;

        inputElement = document.getElementById("inputNumberOne");
        this.abacus.setFirstNumber(inputElement.value);

        inputElement = document.getElementById("inputNumberTwo");
        this.abacus.setSecondNumber(inputElement.value);
    }

    function setCalculatorOperatorFromInput()
    {
        let operator = getOperator();

        this.abacus.operator = operator;
        setMode(operator);
    }


// perform a calculation when the operator button is clicked
function calculate()
{
    setStatus("Calculating");
    sanitizeTermInputs();
    setCalculatorNumbersFromInput();
    setCalculatorOperatorFromInput();

    let result;
    let message;
    if (this.abacus.isDivideByZeroScenario() === false)
    {
        this.abacus.performCalculation();
        result = this.abacus.getValue();
        setStatus("Results");
    }
    else
    {
        result = CALCULATOR_STATUS.DivideByZero;
        setStatus("DivideByZero");
    }

    updateResultText(result);
}

/**
 * set the text in the result section of the UI
 * @param {*} value
 */
function updateResultText(value)
{
    let textField = document.getElementById("calculation-result");
    textField.innerText = value;
}

function displayMessage(messageText)
{
    let textField = document.getElementById("calculator-message");
    textField.innerText = messageText;
}

// should clear input text values and focus the first number input
function clearValues()
{
    setStatus("Initial");

    clearResult();

    let inputField;

    inputField = document.getElementById("add");
    inputField.click();

    inputField = document.getElementById("inputNumberTwo");
    inputField.value = "";

    inputField = document.getElementById("inputNumberOne");
    inputField.value = "";
    inputField.focus();

    setStatus("Ready");
}

function clearResult()
{
    let textField = document.getElementById("calculation-result");
    textField.innerText = "0";
}

/**
 * get the selected operator from the UI
 * @returns MATH_OPERATION
 */
function getOperator()
{
    let operator;

    let inputArray = document.getElementsByName("operation-panel");

    let index = inputArray.length;
    let exitLoop = false;
    while (exitLoop === false)
    {
        index--;

        exitLoop = ( inputArray[index].checked
                  || index === 0 )
    }

    if (0 <= index && index <= inputArray.length)
        operator = inputArray[index].value;
    else
        console.log("index out of bounds for inputArray in getOperator()");

    if (MATH_OPERATION.hasOwnProperty(operator) === false)
        operator = MATH_OPERATION.nully;
    else
        operator = MATH_OPERATION[operator];

    return operator;
}


/**
 * Calculator status indicates what the calculator is doing or expecting.
 * @param {CALCULATOR_STATUS} status
 */
function setStatus(status)
{
    if ( CALCULATOR_STATUS.hasOwnProperty(status) === false )
        status = "Unknown";

    let textField = document.getElementById("calculator-status");

    textField.innerText = CALCULATOR_STATUS[status];
    if (status !== "Results")
        displayMessage(CALCULATOR_STATUS_MAP[status]);
    else
        DisplayResultsMessage();
}

    function DisplayResultsMessage()
    {
        let template = CALCULATOR_STATUS_MAP.Results;
        let operator = getOperator();
        const termsMap =
        {
            "resultName" : MATH_OPERATION_MAP[operator][3],
            "prepo" : MATH_OPERATION_MAP[operator][4],
            "firstTerm" : String(this.abacus.firstNumber),
            "conjunct" : MATH_OPERATION_MAP[operator][5],
            "secondTerm" : String(this.abacus.secondNumber),
            "value" : String( this.abacus.getValue() ),
            "verbing" : MATH_OPERATION_MAP[operator][6]
        } ;
        let message = interpolate(template, termsMap);
        displayMessage(message);
    }

    /**
     * Helper function to perform interpolation on stored template literals.
     * termsMap is an object containing the keywords to search for in template
     *  and their replacement text.
     * @param {string} template
     * @param {Object.<string, string>} termsMap
     * @returns String
     */
    function interpolate(template, termsMap)
    {
        for (term in termsMap)
        {
            template = template.replace( "${" + term + "}", String(termsMap[term]).toLowerCase() );
        }

        return template;
    }

/**
 * Sets text and label fields according to current operator
 * @param {MATH_OPERATION} operator
 */
function setMode(operator)
{
    if (MATH_OPERATION.hasOwnProperty(operator) === false)
        operator = MATH_OPERATION.nully;

    let textField;

    textField = document.getElementById("calculator-operation");
    textField.innerText = MATH_OPERATION_MAP[operator][0];

    let labelText;

    labelText = document.getElementById("div-term-one-label")
    labelText.innerText = MATH_OPERATION_MAP[operator][1];

    labelText = document.getElementById("div-term-two-label")
    labelText.innerText = MATH_OPERATION_MAP[operator][2];

    labelText = document.getElementById("div-calculation-result-label")
    labelText.innerText = ( MATH_OPERATION_MAP[operator][3] + ':' );
}

/**
 * At least one browser (~cough, rhymes with "higher socks") still allows non-number
 *  input to appear in a number input box. This function displays the correct values.
 */
function sanitizeTermInputs()
{
    setStatus("Sanitizing");
    let textToSanitize;

    let inputFieldArray;

    inputFieldArray = document.getElementsByClassName("input-term");
    for (let index = 0; index < inputFieldArray.length; index++)
    {
        textToSanitize = inputFieldArray[index].value;
        inputFieldArray[index].value = Number(textToSanitize);
    }
}

    /**
     * No longer needed, but left as a relic containing my own regex
     * @param {String} numberText
     * @returns Boolean
     */
    function isValidNumber(numberAsText)
    {
        setStatus("Checking");
        const pattern = /^[+-]?\d*(?:[.]\d+)?(?:e[+-]\d+)?$/
        answer = pattern.test(numberAsText);
        answer &= ( Number(numberAsText) !== NaN );

        return answer;
    }


function addEventListeners()
{
    let inputFieldArray = document.getElementsByClassName("input-term");
    for (let index = 0; index < inputFieldArray.length; index++)
    {
        inputFieldArray[index].addEventListener("focus", onInputFocus);
        inputFieldArray[index].addEventListener( "keypress", function(event) {event.which === 13 ? onInputPressEnter() : 0} );
    }

    let inputButton;

    inputButton = document.getElementById("button-perform-calculation");
    inputButton.addEventListener("click", onCalculateButtonClick);

    inputButton = document.getElementById("button-reset");
    inputButton.addEventListener("click", onResetButtonClick);

    let inputArray = document.getElementsByName("operation-panel");
    for (let index = 0; index < inputArray.length; index++)
    {
        inputArray[index].addEventListener("click", onOperationPanelClick);
    }
}

    function onInputFocus()
    {
        setStatus("Inputting");
        clearResult();
    }

    function onResetButtonClick()
    {
        clearValues();
    }

    function onOperationPanelClick()
    {
        clearResult();
        setStatus("Inputting");
        setCalculatorOperatorFromInput();
    }

    function onCalculateButtonClick()
    {
        calculate();
    }

    function onInputPressEnter()
    {
        calculate();
    }