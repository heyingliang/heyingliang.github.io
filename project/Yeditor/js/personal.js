(function(){
	window.YL = function(a, b){
		return new YL(a, b);
	};
	var YL = function(selector, context){
		var elms;

		elms = document.querySelectorAll(selector);
		Array.prototype.push.apply(this, elms);
	};
	YL.prototype = {
		constructor : YL,
		// 导航样式切换
		navSwitch: function(cls, type, fn, start){
			var that = this;
			cls = cls || 'on'
			type = type || 'click'
			fn = fn || function(){};
			if(start){
				that[0].classList.add(cls);
			}
			for (var i = 0, len = that.length; i < len; i++) {
				that[i]['on'+type] = function(){
					for (var i = 0; i < len; i++) {
						that[i].classList.remove(cls);
					}
					this.classList.add(cls);
					fn(this);
				};
			}
			return this;
		},
		addEvent: function(type){

			return this;
		}
	};
})();

addUI();
function addUI(){
	var edui = parent.document.getElementById('ui');
	var pui = document.createElement('div');
	pui.id = 'pui1';
	pui.style.display = 'none';
	pui.innerHTML = '<span id="pui_del">删除模块</span><span id="pui_before">模块前空行</span><span id="pui_after">模块后空行</span>';
	edui.appendChild(pui);
}
ajaxGet('title');
// 列表切换
YL('#nav span').navSwitch('','',function(e){
	ajaxGet(e.getAttribute('data-mid'));
},true);
var nowColor = null;//当前颜色

function ajaxGet(data){
	var xmlHttp = new XMLHttpRequest();
	var url = 'control/'+data+'.html';
	xmlHttp.onreadystatechange = function(){
		if (xmlHttp.readyState==4&&xmlHttp.status==200) {
			document.getElementById('contain').innerHTML = xmlHttp.responseText;
			ctrlFn();
			// 着色
			if(nowColor){
				var tages = document.querySelectorAll(".color-ctrl");
				for (var i = 0; i < tages.length; i++) {
					tages[i].style.color = nowColor;
				}
			}
		}
	}
	xmlHttp.open('GET',url,true);
	xmlHttp.send();
}

UIfn();

function UIfn(){
	var ifram = parent.document.getElementById('editor')
		,ctrl = ifram.querySelectorAll('.color-ctrl')
		,pui = parent.document.getElementById('pui1')
		,layer = parent.document.getElementById('ui');
	for(var j = 0,len = ctrl.length; j < len; j++){
		ctrl[j].onclick = function(event){
			var model = this
			,delbtn = parent.document.getElementById('pui_del')
			,insertbtn = parent.document.getElementById('pui_before')
			,beforebtn = parent.document.getElementById('pui_after');
			var y = this.getBoundingClientRect().top+this.clientHeight
				,x = ifram.getBoundingClientRect().left+180;
			layer.style.zIndex = '1008';
			pui.style.display = 'block';
			pui.style.top = y + 'px';
			pui.style.left = x + 'px';
			delbtn.onclick = function(){
				model.parentNode.removeChild(model);
				pui.style.display = 'none';
			};
			insertbtn.onclick = function(){
				var node = document.createElement('p');
				node.innerHTML = '<br />';
				model.parentNode.insertBefore(node,model);
			};
			beforebtn.onclick = function(){
				var node = document.createElement('p');
				node.innerHTML = '<br />';
				if(model.nextSibling){
					model.parentNode.insertBefore(node,model.nextSibling);
				}else{
					model.parentNode.appendChild(node);
				}
			};
			event.stopPropagation();
		};
	}
}
function ctrlFn(){ 
	var ifram = parent.document.getElementById('editor')
		,btns = document.querySelectorAll(".fun-btn")
		,pui = parent.document.getElementById('pui1')
		,layer = parent.document.getElementById('ui');
	function colorHex(color){
		if (/^rgb.*/i.test(color)) { //test RGB
		  var hex = '#'; //定义十六进制颜色变量
		  color.replace(/\d{1,3}/g, function(kw) { //提取rgb数字
		   kw = parseInt(kw).toString(16); //转为十六进制
		   kw = kw.length < 2 ? 0 + kw : kw; //判断位数，保证两位
		   hex += kw; //拼接
		  });
		  return hex; //返回十六进制
		 } else {
		    return color;
		 }
	}
	// 提交到编辑器
	for (var i = 0; i < btns.length; i++) {
		btns[i].onclick = function(){
			var htm = this.cloneNode(true);
			// parent.ue.execCommand('inserthtml', htm.innerHTML, true);
			ifram.appendChild(htm);
			// UI（删除）
			UIfn();
		};
	}
	ifram.addEventListener('mousedown',function(){
		layer.style.zIndex = '';
		pui.style.display = 'none';
	},false);
	parent.window.addEventListener('scroll',function(){
		layer.style.zIndex = '';
		pui.style.display = 'none';
	},false);
	// 颜色控制
	var colorBtns = document.querySelectorAll("#color-ctrl span");
	var tages = document.querySelectorAll(".color-ctrl");
	var sp = document.querySelector(".swt-3 a");
	YL('#color-ctrl span').navSwitch('','',function(e){
		nowColor = e.style.backgroundColor;
		for (var i = 0; i < tages.length; i++) {
			tages[i].style.color = nowColor;
		}
		// swt-3特殊处理（无理要求，必要时可删除）
		if(sp){
			sp.style.fontWeight = 'bold';
			sp.style.fontSize = '24px';
			nowColor = colorHex(nowColor);
			if(nowColor == '#006948'){
				sp.style.color = '#e3560f';
			}else if(nowColor == '#fa599c'){
				sp.style.color = '#cc3388';
			}else if(nowColor == '#e7143f'){
				sp.style.color = '#760193';
			}else{
				sp.style.color = '#4388cd';
			}
		}
	});
	// 拾色
	var colorDIY = document.querySelector('#color-ctrl input');
	colorDIY.onclick = function(){
		for (var i = 0, len = colorBtns.length; i < len; i++) {
			colorBtns[i].classList.remove("on");
		}
		/*Jcolor需加载color.js*/
		Jcolor(this).color();
	};
}
// 变色（拾色器）
function toColor(){
	var tages = document.querySelectorAll(".color-ctrl");
	var colorDIY = document.querySelector('#color-ctrl input');
	nowColor = colorDIY.value;
	for (var i = 0, len = tages.length; i < len; i++) {
		tages[i].style.color = nowColor;
	}
}
