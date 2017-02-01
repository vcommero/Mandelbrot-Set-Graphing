/*
* author: Vincent Commero
* Mandelbrot Sets Graph Script.js
*
*/

function main() {
	var canvas = document.getElementById('canvas1'); // Gets the canvas
	var resCheck = document.getElementById('resCheckbox'); // Gets the resolution checkbox
	var passesInput = document.getElementById('passesNum'); // Gets Passes slider
	passesInput.value = 20;
	var computeBtn = document.getElementById('computeBtn'); // Gets Compute button
	var size = canvas.getAttribute('width');
	
	function draw() {
		var context = canvas.getContext('2d');
		
		var cellsPerRow;
		if (resCheck.checked == true) {
			cellsPerRow = 300;
		} else {
			cellsPerRow = 600;
		}
			
		var cellWidth = Math.round(size / cellsPerRow);
		for (var j = 0; j < cellsPerRow; j++) {
			for (var i = 0; i < cellsPerRow; i++) {
				context.beginPath();
				context.rect(i * cellWidth, j * cellWidth, cellWidth, cellWidth);
				var xCoord = (1.0 * i - Math.floor(cellsPerRow / 2)) / cellsPerRow * 4;
				var yCoord = (1.0 * j - Math.floor(cellsPerRow / 2)) / cellsPerRow * 4;
				var color = calcColor(xCoord, yCoord, passesInput.value);
				context.fillStyle = 'hsl(' + color[0] + ', ' + color[1] + '%, ' +
					+ color[2] + '%)';
				context.fill();
			}
		}
		
		// Function that determines a cell's color based
		// on how many iterations are needed for it to escape
		// the Mandelbrot set
		function calcColor(x, y, maxPasses) {
			var bound = 4;
			var a = x;
			var b = y;
			var z = 0;
			var passes = 0;
			var color = [0,100,50];
			
			while (z <= bound && passes < maxPasses) {
				var z = Math.pow(a,2) + Math.pow(b,2);
				var oldA = a;
				var oldB = b;
				a = (Math.pow(oldA,2) - Math.pow(oldB,2)) + x;
				b = (2 * oldA * oldB) + y;
				passes++;
			}
			
			if (passes >= maxPasses) // If max passes reached, set color to black
				color[2] = 0;
			
			// Sets color and returns
			color[0] = (passes * 10) % 360;
			return color;
		};
		
	};
	
	function passesUpdate() {
		document.getElementById('passes').innerHTML = passesInput.value; // Updates passes counter
	};
	
	passesInput.addEventListener("input", passesUpdate);
	computeBtn.addEventListener("click", draw);
	passesUpdate();
	draw();
};

window.onload = main(); // Runs the javascript code only after window is loaded
