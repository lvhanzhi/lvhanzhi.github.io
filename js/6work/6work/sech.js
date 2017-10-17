var int;
var hour, minute, second;
hour = minute = second = millisecond = 0;
var millisecond = 0;
document.getElementById("alarm_text").value = '00:00:00:0000';

function sech_reset() {
	window.clearInterval(int);
	hour = minute = second = 0;
	document.getElementById("alarm_text").value = '00:00:00:0000';
}

function sech2_star() {
	int = setInterval(sech, 50);
}

function sech() {
	millisecond += 50;
	if(millisecond == 1000) {
		second += 1;
		millisecond = 0;
	}
	if(second == 60) {
		minute += 1;
		second = 0;
	}
	if(minute == 60) {
		hour += 1;
		minute = 0;
	}
	document.getElementById("alarm_text").value = hour + ":" + minute + ":" + second + ":" + millisecond;
}

function sech_end() {
	window.clearInterval(int);
}
document.getElementById("alarm_text").style.top = "30%";