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
    }

    /**
     * determine the current operation's label
     * a bit unsure as to why this is here
     */
    getAction(operator)
    {
        this.operator = operator;
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
        if (this.secondNumber !== 0)
            this.value = this.firstNumber / this.secondNumber;
        else
            this.value = this.firstNumber + 'ⱺ';
    }

        /**
         * @returns boolean
         */
        isDivideByZeroScenario()
        {
            let isScenario = ( (this.operator === "Divide")
                            && (this.secondNumber === 0) );

            this.attemptedDivideByZero = isScenario; /* needed for unit test */

            return isScenario;
        }

    performCalculation()
    {
        if (this.operator === "Add")
            this.add();
        else if (this.operator === "Subtract")
            this.subtract();
        else if (this.operator === "Multiply")
            this.multiply();
        else if (this.operator === "Divide")
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
            this.operator = MATH_OPERATION.Add;
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
