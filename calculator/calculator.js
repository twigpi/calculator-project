class Calculator
{
    firstNumber;
    secondNumber;
    operator;
    value;

    /**
     * @param {Number} firstNumber
     * @param {Number} secondNumber
     * @param {MATH_OPERATOR} operator
     */
    constructor(firstNumber, secondNumber, operator)
    {
        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
        this.operator = operator;
        this.value = 0;
    }

    /**
     * determine the current operation's label
     * a bit unsure as to why this is here
     */
    getAction()
    {
        return this.operator;
    }

    // perform a calculation based on the currently selected operation
    operate()
    {
        performCalculation();
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
         * @returns Boolean
         */
        isDivideByZeroScenario()
        {
            let isScenario = ( (this.operator === "Divide")
                            && (this.secondNumber === 0) );

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
            alert("Operator: " + this.operator + " not set.");
    }

    /**
     * @param {Number} firstNumber
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
     * @param {Number} secondNumber
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
     * @param {MATH_OPERATOR} operator
     */
    setOperator(operator)
    {
        if ( MATH_OPERATOR.hasOwnProperty(operator) )
            this.operator = operator;
        else
            this.operator = "Add";
    }

    /**
     * @returns Number
     */
    getValue()
    {
        return this.value;
    }
}

//DO NOT TOUCH THIS LINE OF CODE//
let unit_test = Calculator;
