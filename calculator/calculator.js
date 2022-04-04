const MATH_OPERATION =
{
    "add" : "add",
    "subtract" : "subtract",
    "multiply" : "multiply",
    "divide" : "divide",
    "nully" : "nully"
}

const MATH_OPERATION_MAP =
{
    add :         ["+", "Augend", "Addend", "Sum", "of", "and", "adding"],
    subtract :    ["-", "Minuend", "Subtrahend", "Difference", "between", "and", "subtracting"],
    multiply :    ["*", "Multiplicand", "Multiplier", "Product", "of", "times", "multiplying"],
    divide :      ["/", "Dividend", "Divisor", "Quotient", "of", "divided by", "dividing"],
    nully :       ["E", "Nullend", "Nullifier", "Nullent", "of", "nullified by", "nullifying"]
}

class Calculator
{
    firstNumber;
    secondNumber;
    operator;
    value;

    attemptedDivideByZero;

    /**
     * @param {number} firstNumber
     * @param {number} secondNumber
     * @param {MATH_OPERATION} operator
     */
    constructor(firstNumber, secondNumber, operator)
    {
        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
        this.operator = operator;
        this.value = 0;

        this.attemptedDivideByZero = false;

        this.performCalculation();
    }

    /**
     * determine the current operation's label
     * ~a bit unsure as to why this is here~
     * Needed for unit test to pass,
     * must return action word of operator.
     */
    getAction()
    {
        return MATH_OPERATION_MAP[this.operator][6];
    }

    // perform a calculation based on the currently selected operation
    operate()
    {
        this.performCalculation();
    }

    // perform addition operation
    add()
    {
        this.value = this.firstNumber + this.secondNumber;
    }

    // perform subtraction operation
    subtract()
    {
        this.value = this.firstNumber - this.secondNumber;
    }

    // perform multiplication operation
    multiply()
    {
        this.value = this.firstNumber * this.secondNumber;
    }

    // perform divide operation
    divide()
    {
        if (this.isDivideByZeroScenario() === false)
            this.value = this.firstNumber / this.secondNumber;
        else
            this.value = this.firstNumber + 'ⱺ';
    }

        /**
         * @returns boolean
         */
        isDivideByZeroScenario()
        {
            let isScenario = ( (this.operator === MATH_OPERATION.divide)
                            && (this.secondNumber === 0) );

            this.attemptedDivideByZero = isScenario; /* needed for unit test */

            return isScenario;
        }

    performCalculation()
    {
        if (this.operator === MATH_OPERATION.add)
            this.add();
        else if (this.operator === MATH_OPERATION.subtract)
            this.subtract();
        else if (this.operator === MATH_OPERATION.multiply)
            this.multiply();
        else if (this.operator === MATH_OPERATION.divide)
            this.divide();
        else
            console.log("Operator: " + this.operator + " not set.");
    }

    /**
     * @param {number} firstNumber
     */
    setFirstNumber(firstNumber)
    {
        let value = Number(firstNumber);
        if ( value !== NaN )
            this.firstNumber = value;
        else
            this.firstNumber = 0;
    }

    /**
     * @param {number} secondNumber
     */
    setSecondNumber(secondNumber)
    {
        let value = Number(secondNumber)
        if ( value !== NaN )
            this.secondNumber = value;
        else
            this.secondNumber = 0;
    }

    /**
     * @param {MATH_OPERATION} operator
     */
    setOperator(operator)
    {
        if ( MATH_OPERATOR.hasOwnProperty(operator) )
            this.operator = MATH_OPERATION[operator];
        else
            this.operator = MATH_OPERATION.add;
    }

    /**
     * @returns number
     */
    getValue()
    {
        return this.value;
    }
}

//DO NOT TOUCH THIS LINE OF CODE//
let unit_test = Calculator;
