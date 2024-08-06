


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
					runGame(2);
				} else if (level === "level2") {
					runGame(3);
				} else if (level === "level3") {
					runGame(4);
				} else if (level === "level4") {
					runGame(5);
				} else {
					alert(`Level not selected ${level}`);
					throw `Level not selected ${level}, aborting!`;
				}
				
			}
		});
	}

	document.getElementById("answer-box").addEventListener("keydown", function(event) {
		if (event.key === "Enter") {
			result();
		}
	});

	solveEquation(2);
});

