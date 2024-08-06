
//Get the eventlister for the DOM and button
document.addEventListener("DOMContentLoaded", function() {
	let btns = document.getElementsByTagName("button");
	for (let btn of btns) {
		btn.addEventListener("click", function() {
			if (this.getAttribute("data-type") === "submit") {
				result();
			} else {
				let level = this.getAttribute("data-type");
				if (level === "level1") {
					solveEquation(2);
				} else if (level === "level2") {
					solveEquation(3);
				} else if (level === "level3") {
					solveEquation(4);
				} else if (level === "level4") {
					solveEquation(5);
				} else {
					alert(`Level not selected ${level}`);
					throw `Level not selected ${level}, aborting!`;
				}
				
			}
		});
	}

	document.getElementById("answer").addEventListener("keydown", function(event) {
		if (event.key === "Enter") {
			result();
		}
	});

	solveEquation(2);
});

/**
 * When the DOM loaded, it's call the function and when each time the user submit the answer
 */
function solveEquation(level) {
    // Initialize the answer and focus the cursor on the text box
	document.getElementById("answer").value = "";
	document.getElementById("answer").focus();
    // Random number is assigned to each variable between 1 to 4 with math.floor round off number to avoid the decimal number
	let num1 = Math.floor(Math.random() * 4) + 2;
	let num2 = Math.floor(Math.random() * 3) + 2;
    let num3 = Math.floor(Math.random() * 2) + 1;
    // Call the function and pass the arguments to display the power value in the equation.
    displayEquationQuestion(num1, num2, num3,level);
}

/**
 * The function is called from the solve equation and assign the random value to each variable in equation with power level.
 */
function displayEquationQuestion(operand1, operand2,operand3,level) {
    // X, Y Z value assigned
    document.getElementById("assign1").textContent = operand1;
	document.getElementById("assign2").textContent = operand2;
	document.getElementById("assign3").textContent = operand3;
    // Level power assign to equation
	document.getElementById("equ1").textContent=level;
	document.getElementById("equ2").textContent=level;
    // Assign the x , y and z value 
	let assignXValue=document.getElementById("operand1");
	let assignYValue=document.getElementById("operand3");
	let assignZValue=document.getElementById("operand5");
    // Assign the x , y and z inner html value with powers based on the level selected
    assignXValue.innerHTML= `${operand1}<sup>${level}</sup>`;
    assignYValue.innerHTML= `${operand2}<sup>${level}</sup>`;
    assignZValue.innerHTML= `${operand3}`;

}

/**
 * The function is called when the submit button is pressed or whent he key down in the answer text box.
 * This function call calculate equation function and verify the result
 */
function result() {
    // Get the answer text value and compare with calculated value. 
	let operatorresult = parseInt(document.getElementById("answer").value);
	let calculatedresult = calculateEquationAnswer();
	let isCorrect = operatorresult === calculatedresult[0];
    // If the answer is correct alert saying well done or answer is wrong then give the right answer
	if (isCorrect) {
		alert("Your answer is correct well done");
		let prevScore = parseInt(document.getElementById("correctanswer").innerText);
		document.getElementById("correctanswer").innerText = ++prevScore;
	} else {
		alert(`Your answer is ${operatorresult}. The correct answer was ${calculatedresult[0]}!`);
		let prevScore = parseInt(document.getElementById("wronganswer").innerText);
		document.getElementById("wronganswer").innerText = ++prevScore;
	}

	solveEquation(calculatedresult[1]);

}

/**
 * The function is called when the result function is initiated.
 * This function calculate the equation.
 */
function calculateEquationAnswer() {
    // Get the operand element
	let operand1 = document.getElementById("operand1");
	let operand2 = document.getElementById("operand3");
    let operand3 = document.getElementById("operand5");
    // Get the element value with child nodes
    let valueX=parseInt(operand1.childNodes[0].nodeValue);
    let valueY=parseInt(operand2.childNodes[0].nodeValue);
    let valueZ=parseInt(operand3.childNodes[0].nodeValue);
    // Quaery the sup element and parse to int.
	supElement = operand1.querySelector('sup');
	let level=parseInt(supElement.textContent);
    // Return the value of the eqautuion and last level used.
    return [(Math.pow(valueX,level) + Math.pow(valueY,level)-valueZ),level];

}



