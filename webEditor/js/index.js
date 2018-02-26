// window.onload = function(){
//     /*编辑器初始化*/
//     var ehtm = ace.edit("html");
//     var ecss = ace.edit("css");
//     var ejs = ace.edit("js");
//     /*主题初始化*/
//     ehtm.setTheme("ace/theme/monokai");
//     ehtm.session.setMode("ace/mode/html");
//     ecss.setTheme("ace/theme/monokai");
//     ecss.session.setMode("ace/mode/css");
//     ejs.setTheme("ace/theme/monokai");
//     ejs.session.setMode("ace/mode/javascript");
//     /*显示前的准备*/
//     var ifram = window.frames["result"].document;
//     var res = document.querySelector("#show h2");

//     document.getElementById('run').onclick = function(){
//         /*获取DOM*/
//         var style = ifram.getElementsByTagName('style')[0] || ifram.createElement("style");
//         var sc = ifram.getElementsByTagName('script')[0] || ifram.createElement("script");
//         /*配置内容*/
//         style.type = "text/css";
//         style.textContent = "\nbody{\nbackground-color: #fff;\n}" + ecss.getValue();
//         sc.type = "text/javascript";
//         sc.textContent = "//<!--[CDATA[\n" + ejs.getValue() + "\n//]]--> ";
//         /*添加到iframe*/
//         ifram.getElementsByTagName('head')[0].appendChild(style);
//         ifram.getElementsByTagName('head')[0].appendChild(sc);
//         ifram.body.innerHTML = ehtm.getValue();
//         res.style.display = "none";
//     };
// };
start({
    "html": "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="\"utf-8\"">\n  <meta name="\"viewport\"" content="\"width=device-width\"">\n  <title>JS Bin</title>\n</head>\n<body>\n\n</body>\n</html>",
    "css": "",
    "javascript": "",
    "url": "http://jsbin.com"
},
{
    "state": {
        "title": "",
        "description": "",
        "token": "71azJVLK-umC55lXbqFN7hjiaU5NlhGZQ314",
        "stream": false,
        "streaming": false,
        "code": null,
        "revision": null,
        "processors": {},
        "checksum": null,
        "metadata": {},
        "latest": false
    },
    "name": "JS Bin",
    "settings": {
        "panels": []
    },
    "user": {
        "settings": {}
    }
},
this, document);