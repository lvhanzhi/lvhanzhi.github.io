qiuye_shiz=document.getElementById('qiuye_shiz').value,
qiuye_fenz=document.getElementById('qiuye_fenz').value,
qiuye_miaoz=document.getElementById('qiuye_miaoz').value;
window.onload=function(){
var input=document.getElementsByTagName('input');
var gb=document.getElementById('qiuye_gb');
for(i=0;i<input.length;i++){
	input[i].oninput=function(){
	qiuye_shiz=document.getElementById('qiuye_shiz').value,
	qiuye_fenz=document.getElementById('qiuye_fenz').value,
	qiuye_miaoz=document.getElementById('qiuye_miaoz').value;
	}
}
function showtime(){
	var time=new Date();
	var minute=time.getMinutes();
	var hou=time.getHours();
	var sec=time.getSeconds();
	var content=document.getElementById('alarm_time');
	content.innerHTML=''+add_o(hou)+' : '+add_o(minute)+' : '+add_o(sec);
	if(hou==qiuye_shiz&&sec==qiuye_miaoz&&minute==qiuye_fenz){
	if(!music.play()){music.play();}
        content.style.color='red';
    }
	else if(qiuye_shiz==24){
		music.pause();content.style.color='black';
	}
}
showtime();

function add_o(m){
	if(m<10){return '0'+m;}
	else{return m;}
}

var timer=setInterval(showtime,1000);
gb.onclick=function(){
	qiuye_shiz=24;
}}
$("#qiuye_gb").click(function() {
	$(".inputs").show(400);
});
$(".qiuye").click(function() {
	$(".inputs").hide();
});
