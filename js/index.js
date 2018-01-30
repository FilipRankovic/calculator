$(document).ready(function() {
	
	var display_value = 0;
	var first_value = 0;
	var operator = '';
	var main_string = '';
	var percentage = false;
	
	$(".numbers").click(function() {
		if (display_value === 0) {
			display_value = $(this).text();
		} else {
		display_value += $(this).text();
		}
		updateDisplay();
  });
	
	$("#clear").click(function() {
		display_value = 0;
		first_value = 0;
		operator = '';
		main_string = '';
		percentage = false;
		updateDisplay();
	});
	
	$(".operators").click(function() {
		if (operator == '') {
			operator = $(this).text();
			main_string += display_value;
			main_string += ' ' + operator + ' ';
			display_value = 0;
		} else {
			operator = $(this).text();
			main_string += display_value;
			main_string += ' ' + operator + ' ';
			display_value = 0;
			first_value = 0;
		}
		updateDisplay();
	});
	
	$("#equals").click(function() {
		if (percentage == true) {
			main_string += display_value;
			display_value = percent(first_value, display_value);
			//percent == percentage;
			percentage = false;
		} else {
			main_string += display_value;
			console.log(main_string);
			calculate(main_string);
		}
		updateDisplay();
		main_string = '';
	});
	
	$("#backspace").click(function() {
		display_value = display_value.slice(0, -1);
		if(display_value == '') display_value = 0;
		updateDisplay();
	});
	
	$("#point").click(function() {
		display_value += '.';
		updateDisplay();
	});
	
	$("#plusminus").click(function() {
		if (display_value[0] != '-' && display_value[0] != '+') {
			console.log(display_value[0]);
			display_value = '-' + display_value;
		}
		updateDisplay();
	});
	
	$("#percentage").click(function() {
		if (percentage == false) {
			first_value = display_value;
			main_string += display_value;
			display_value = 0;
			percentage = true;
			main_string += ' % of ';
			updateDisplay();
		}
	});
	
	window.addEventListener('keydown', function(e) {
		var key = e.key;
		console.log(key);
		if (!isNaN(key)) {
			if (display_value === 0) {
				display_value = key;
			} else {
			display_value += key;
			}
			updateDisplay();
		} else if (key == '.') {
			display_value += '.';
			updateDisplay();
		} else if (key == '+' || key == '-' || key == '*' || key == '/') {
			calculate2(key);
			updateDisplay();
		} else if (key == 'Enter') {			
			if (percentage == true) {
				main_string += display_value;
				display_value = percent(first_value, display_value);
				//percent == percentage;
				percentage = false;
			} else {
				main_string += display_value;
				console.log(main_string);
				calculate(main_string);
			}
			updateDisplay();
			main_string = '';
							 
		} else if (key == 'Backspace') {			
			display_value = display_value.slice(0, -1);
			if(display_value == '') display_value = 0;
			updateDisplay();
			
		} else if (key == 'Delete') {
			display_value = 0;
			first_value = 0;
			operator = '';
			main_string = '';
			percentage = false;
			updateDisplay();							 
		}
	});
	
	function updateDisplay() {
		document.getElementById("display").value = display_value;
		document.getElementById("saved").value = main_string;
	}

	function add (a, b) {
		return a + b;
	}

	function subtract (a, b) {
		return a - b;
	}

	function multiply (a, b) {
		return a * b;
	}

	function divide (a, b) {
		return a / b;
	}
	
	function percent(a, b) {
		return (parseFloat(a) / 100) * parseFloat(b);
	}

	function operate (operator, a, b) {
		if (operator === '+') {
			return add(parseFloat(a, 10), parseFloat(b, 10));
		} else if (operator === '-') {
			return subtract(parseFloat(a, 10), parseFloat(b, 10));
		} else if (operator === '*') {
			return multiply(parseFloat(a, 10), parseFloat(b, 10));
		} else if (operator === '/') {
			return divide(parseFloat(a, 10), parseFloat(b, 10));
		} else return 'invalid';
	}
	
	function calculate (initial_string) {

		var result = 0;

		str = initial_string.split(" ");
		console.log(str);

		for(var i = 0; i < str.length - 2; i++) {

			if (i === 0) first_value = str[i];

			result = operate(str[i+1], first_value, str[i+2]);
			if (result != 'invalid') {
				display_value = result;
				first_value = result;
			}

		}

	}
	
	function calculate2 (symbol) {
		if (operator == '') {
			operator = symbol;
			main_string += display_value;
			main_string += ' ' + operator + ' ';
			display_value = 0;
		} else {
			operator = symbol;
			main_string += display_value;
			main_string += ' ' + operator + ' ';
			display_value = 0;
			first_value = 0;
		}
	}
	
});
/*--------------

$(document).ready(function() {
	
	var display_value = 0;
	var first_value = 0;
	var operator = '';
	
	$(".numbers").click(function() {
		if (display_value == 0) {
			display_value = $(this).text();
		} else {
		display_value = display_value + $(this).text();
		}
		updateDisplay();
  });
	
	$("#clear").click(function() {
		display_value = 0;
		first_value = 0;
		operator = '';
		updateDisplay();
	});
	
	$(".operators").click(function() {
		if (operator == '') {
			first_value = display_value;
			operator = $(this).text();
			display_value = 0;
			//alert('yes');
		} else {
			operator = $(this).text();
			display_value = operate(operator, parseInt(first_value, 10), parseInt(display_value, 10));
			first_value = 0;
		}
		updateDisplay();
	});
	
	$("#equals").click(function() {
		display_value = operate(operator, parseInt(first_value, 10), parseInt(display_value, 10));
		operator = '';
		first_value = 0;
		updateDisplay();
	});
	
	$("#backspace").click(function() {
		display_value = display_value.slice(0, -1);
		updateDisplay();
	});
	
	function updateDisplay() {
		document.getElementById("display").value = display_value;
	}
	
	

	function add (a, b) {
		return a + b;
	}

	function subtract (a, b) {
		return a - b;
	}

	function multiply (a, b) {
		return a * b;
	}

	function divide (a, b) {
		return a / b;
	}

	function operate (operator, a, b) {
		if (operator === '+') {
			return add(a, b);
		} else if (operator === '-') {
			return subtract(a, b);
		} else if (operator === '*') {
			return multiply(a, b);
		} else if (operator === '/') {
			return divide(a, b);
		} else return 0;
	}
});

------------------------------------
$(document).ready(function() {
	
	var display_value = 0;
	var first_value = 0;
	var operator = '';
	
	$(".numbers").click(function() {
		if (display_value == 0) {
			display_value = $(this).text();
		} else {
		display_value = display_value + $(this).text();
		}
		updateDisplay();
  });
	
	$("#clear").click(function() {
		display_value = 0;
		updateDisplay();
	});
	
	$(".operators").click(function() {
		first_value = display_value;
		//alert($(this).text());
		operator = $(this).text();
		display_value = 0;
		updateDisplay();
	});
	
	$("#equals").click(function() {
		//display_value = operate(operator, first_value, display_value);
		display_value = operate(operator, parseInt(first_value, 10), parseInt(display_value, 10));
		updateDisplay();
	});
	
	$("#backspace").click(function() {
		display_value = display_value.slice(0, -1);
		updateDisplay();
	});
	
	function updateDisplay() {
		document.getElementById("display").value = display_value;
	}
	
	

	function add (a, b) {
		return a + b;
	}

	function subtract (a, b) {
		return a - b;
	}

	function multiply (a, b) {
		return a * b;
	}

	function divide (a, b) {
		return a / b;
	}

	function operate (operator, a, b) {
		if (operator === '+') {
			return add(a, b);
		} else if (operator === '-') {
			return subtract(a, b);
		} else if (operator === '*') {
			return multiply(a, b);
		} else if (operator === '/') {
			return divide(a, b);
		} else return 0;
	}
});
*/