//开场时钟js
function time() {
	var day = new Date();
	var h = day.getHours();
	var m = day.getMinutes();
	var s = day.getSeconds();
	m = check(m);
	s = check(s);
	function check(i) {
		if(i<10) {
			i = "0" + i;
		}
		return i;
	}
	document.getElementById("text").innerHTML = h + ":" + m + ":" + s;
}
setInterval("time()",500);
//底部菜单按钮js
$("#alarm_area").hide();
$("#sech_area").hide();
$("#timer_area").hide();
$(document).ready(function() {
	$("#alarm").click(function() {
		$("#alarm_area").show(400);
		$("#sech_area").hide(400);
		$("#timer_area").hide(400);
		$("#text").hide(400);
		$(".inputs").hide();
	});
	$("#sech").click(function() {
		$("#sech_area").toggle(400);
		$("#alarm_area").hide(400);
		$("#timer_area").hide(400);
		$("#text").hide(400);
	});
	$("#timer").click(function() {
		$("#timer_area").toggle(400);
		$("#sech_area").hide(400);
		$("#alarm_area").hide(400);
		$("#text").hide(400);
	});
});