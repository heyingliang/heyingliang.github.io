window.onload = function(){
    /*手机端的处理*/
    var UI = {
        vh: (function(){
            var point = document.createElement("div");
            point.style.cssText = "position:fixed;width:0;height:0;right:0;bottom:0;";
            document.body.appendChild(point);
            var v = point.offsetTop + point.parentNode.offsetTop;
            document.body.removeChild(point);
            return v;
        })()
    };
    if(navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i)){
        var vh = window.screen.availHeight;
        Array.prototype.forEach.call(document.querySelectorAll(".view"),function(node,index){
            node.style.height = (UI.vh - 60) + "px";
        });
        console.log({vh:vh,top:UI.vh});
    }
    /*编辑器初始化*/
    var ehtm = ace.edit("html");
    var ecss = ace.edit("css");
    var ejs = ace.edit("js");
    /*主题初始化*/
    ehtm.setTheme("ace/theme/monokai");
    ehtm.session.setMode("ace/mode/html");
    ecss.setTheme("ace/theme/monokai");
    ecss.session.setMode("ace/mode/css");
    ejs.setTheme("ace/theme/monokai");
    ejs.session.setMode("ace/mode/javascript");
    /*运行前的准备*/
    var runCont = {
        ifram : window.frames["result"].document,
        show : document.getElementById("show")
    };
    var style = runCont.ifram.getElementsByTagName('style')[0] || runCont.ifram.createElement("style");
    /*配置内容*/
    style.type = "text/css";
    style.textContent = "\nbody{\nbackground-color: #fff;\n}" + ecss.getValue();
    /*运行*/
    document.getElementById("run").onclick = function(e){
        /*添加到iframe*/
        runCont.ifram.body.innerHTML = ehtm.getValue();
        runCont.ifram.getElementsByTagName('head')[0].appendChild(style);
        window.frames['result'].eval(ejs.getValue());
        
        runCont.show.getElementsByTagName("h2")[0].style.display = "none";
        runCont.show.classList.add("on");
    };
    document.querySelector(".mob-nav").onclick = function(){
        runCont.show.classList.remove("on");
    };
};