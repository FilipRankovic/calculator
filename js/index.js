$(document).ready(function() {
	var display_value = 0;
	var first_value = 0;
	var operator = "";
	var main_string = "";

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
		operator = "";
		main_string = "";
		updateDisplay();
	});

	$(".operators").click(function() {
		calculate($(this).text());
		updateDisplay();
	});

	$("#equals").click(function() {
		main_string += display_value;
		calculateFromString(main_string);
		updateDisplay();
		main_string = "";
	});

	$("#backspace").click(function() {
		display_value = display_value.slice(0, -1);
		if (display_value == "") display_value = 0;
		updateDisplay();
	});

	$("#point").click(function() {
		display_value += ".";
		updateDisplay();
	});

	$("#plusminus").click(function() {
		if (display_value[0] != "-" && display_value[0] != "+") {
			console.log(display_value[0]);
			display_value = "-" + display_value;
		}
		updateDisplay();
	});

	$("#percentage").click(function() {
		calculate("%");
		updateDisplay();
	});

	window.addEventListener("keydown", function(e) {
		var key = e.key;
		console.log(key);
		if (!isNaN(key)) {
			if (display_value === 0) {
				display_value = key;
			} else {
				display_value += key;
			}
			updateDisplay();
		} else if (key == ".") {
			display_value += ".";
			updateDisplay();
		} else if (key == "+" || key == "-" || key == "*" || key == "/") {
			calculate(key);
			updateDisplay();
		} else if (key == "Enter") {
			main_string += display_value;
			calculateFromString(main_string);
			updateDisplay();
			main_string = "";
		} else if (key == "Backspace") {
			display_value = display_value.slice(0, -1);
			if (display_value == "") display_value = 0;
			updateDisplay();
		} else if (key == "Delete") {
			display_value = 0;
			first_value = 0;
			operator = "";
			main_string = "";
			updateDisplay();
		}
	});

	function updateDisplay() {
		document.getElementById("display").value = display_value;
		document.getElementById("saved").value = main_string;
	}

	function add(a, b) {
		return a + b;
	}

	function subtract(a, b) {
		return a - b;
	}

	function multiply(a, b) {
		return a * b;
	}

	function divide(a, b) {
		return a / b;
	}

	function percent(a, b) {
		return parseFloat(a) / 100 * parseFloat(b);
	}

	function operate(operator, a, b) {
		if (operator == "+") {
			return add(parseFloat(a, 10), parseFloat(b, 10));
		} else if (operator == "-") {
			return subtract(parseFloat(a, 10), parseFloat(b, 10));
		} else if (operator == "*") {
			return multiply(parseFloat(a, 10), parseFloat(b, 10));
		} else if (operator == "/") {
			return divide(parseFloat(a, 10), parseFloat(b, 10));
		} else if (operator == "%") {
			return percent(parseFloat(a, 10), parseFloat(b, 10));
		} else return "invalid";
	}

	function calculateFromString(initial_string) {
		var result = 0;

		str = initial_string.split(" ");
		console.log(str);

		for (var i = 0; i < str.length - 2; i++) {
			if (i === 0) first_value = str[i];

			result = operate(str[i + 1], first_value, str[i + 2]);
			if (result != "invalid") {
				display_value = result;
				first_value = result;
			}
		}
	}

	function calculate(a) {
		var symbol = a;
		if (operator == "") {
			operator = symbol;
			main_string += display_value;
			main_string += " " + operator + " ";
			display_value = 0;
		} else {
			operator = symbol;
			main_string += display_value;
			main_string += " " + operator + " ";
			display_value = 0;
			first_value = 0;
		}
	}
});