var json = { "第一部分: 前端开发实践": { "前端的": "工作职称", "常用的": "网络技术", "前端开": "发技术栈", "前端开发": "做什么", "团队中的": "前端" }, "hotwords": "美食", "mvonline": [9, 8, [9, 8, 7, 6, 5, 4], 6, 5, 4], "district_online": "1", "zone_online": "1", "subway_online": "1", "city_online": "1" }; 
/*递归实现获取无级树数据并生成DOM结构*/ 
var str = ""; 
var forTree = function (o) { 
var urlstr = ""; 
var keys = new Array(); 
for (var key in o) { 
keys.push(key); 
} 
for (var j = 0; j < keys.length; j++) { 
k = keys[j]; 
if (typeof o[k] == "object") { 
urlstr = "<div><span>" + k + "</span><ul>"; 
} else { 
urlstr = "<div><span>" + k + "" + o[k] + "</span><ul>"; 
} 
str += urlstr; 
var kcn = 0; 
if (typeof o[k] == "object") { 
for (var kc in o[k]) { 
kcn++; 
} 
} 
if (kcn > 0) { 
forTree(o[k]); 
} 
str += "</ul></div>"; 
} 
return str; 
} 
/*添加无级树*/ 
document.getElementById("menuTree").innerHTML = forTree(json); 
/*树形菜单*/ 
var menuTree = function () { 
//给有子对象的元素加[+-] 
$("#menuTree ul").each(function (index, element) { 
var ulContent = $(element).html(); 
var spanContent = $(element).siblings("span").html(); 
if (ulContent) { 
$(element).siblings("span").html("[+] " + spanContent) 
} 
}); 


$("#menuTree").find("div span").click(function () { 
var ul = $(this).siblings("ul"); 
var spanStr = $(this).html(); 
var spanContent = spanStr.substr(3, spanStr.length); 
if (ul.find("div").html() != null) { 
if (ul.css("display") == "none") { 
ul.show(300); 
$(this).html("[-] " + spanContent); 
} else { 
ul.hide(300); 
$(this).html("[+] " + spanContent); 
} 
} 
}) 
} () 
