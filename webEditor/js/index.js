window.onload = function(){
    /*手机端的处理*/
    if(navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i)){
        var vh = window.screen.availHeight;
        Array.prototype.forEach.call(document.querySelectorAll(".view"),function(node,index){
            // console.log({node:node,index:index,vh:vh});
            node.style.height = (vh - 60) + "px";
        });
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
    /*显示前的准备*/
    var ifram = window.frames["result"].document;
    var res = document.querySelector("#show h2");

    document.getElementById('run').onclick = function(){
        /*获取DOM*/
        var style = ifram.getElementsByTagName('style')[0] || ifram.createElement("style");
        var sc = ifram.getElementsByTagName('script')[0] || ifram.createElement("script");
        /*配置内容*/
        style.type = "text/css";
        style.textContent = "\nbody{\nbackground-color: #fff;\n}" + ecss.getValue();
        // sc.type = "text/javascript";
        // sc.textContent = "//<![CDATA[\n" + ejs.getValue() + "\n//]]> ";
        /*添加到iframe*/
        ifram.body.innerHTML = ehtm.getValue();
        ifram.getElementsByTagName('head')[0].appendChild(style);
        // ifram.getElementsByTagName('head')[0].appendChild(sc);
        window.frames['result'].eval(ejs.getValue());
        
        res.style.display = "none";
    };
    /*节流器*/
    function throttle(fn, context){
        clearTimeout(fn.tid);
        fn.tid = setTimeout(function(){
            fn.call(context);
        },100);
    }
    var getH = function(){
        console.log("a");
    };
    document.body.onresize = function(e){
        throttle(getH);
    };
};