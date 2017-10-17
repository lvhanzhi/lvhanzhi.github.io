function js_star() {
	document.getElementById("timer_input").style.display = "none";
	var h = document.getElementById("timeh_text").value;
	var m = document.getElementById("timem_text").value;
	var s = document.getElementById("times_text").value;
	count = h * 3600 + m * 60 + s;
	var counter = setInterval(function timerDown() {
		count = count - 1;
		if(count === -1) {
			clearInterval(counter);
			return;
		}

		var seconds = count % 60,
			minutes = Math.floor(count / 60),
			hours = Math.floor(minutes / 60);
		minutes %= 60;
		hours %= 60;

		if(minutes < 10) {

			minutes = '0' + minutes;
		}

		if(hours < 10) {

			hours = '0' + hours;
		}

		if(seconds < 10) {

			seconds = '0' + seconds;
		}
		document.getElementById("countdown").innerHTML = hours + ":" + minutes + ":" + seconds;
	}, 1000)
	if(hours == 0 && minutes == 0 && seconds == 0) {
		clearInterval(counter);
	}
}

function js_end() {
	document.getElementById("timer_input").style.display = "block";
}
$("#time_no").click(function() {
	$("#countdown").hide();
});
$("#time_yes").click(function() {
	$("#countdown").show();
});