function throttle(fn){
    if(fn.id){
        clearTimeout(fn.id);
    }
    fn.id = setTimeout(fn,300);
}
function stopevent(e){
    e.preventDefault();
}
window.onload = function(){
    var container = document.getElementById('container');
    var mob_nav = document.getElementById('mob-nav');
    var top = document.querySelector('.top');
    var toc = document.querySelector('.aside-toc');
    var model = document.getElementById('art-model');
    var tocItm = document.querySelectorAll('.toc-item');
    document.onclick = function(e){
        var that = e.target || window.event.target;
        switch(that.id){
            /* 导航关闭按钮 */
            case 'mob-close':
                mob_nav.classList.remove('change');
                container.classList.remove('change');
                break;
            /* 导航唤出按钮 */
            case 'mob-more':
                container.classList.add('change');
                mob_nav.classList.add('change');
                break;
            /* 文章目录按钮 */
            // case 'toc-button':
            //     toc.classList.add('show');
            //     model.classList.add('show');
            //     document.body.style.overflow = 'hidden'; // 消除滚动
            //     window.addEventListener('touchmove',stopevent,{ passive: false }); //消除滚动(增强)
            //     break;
            /* 文章模态框 */
            // case 'art-model':
            //     toc.classList.remove('show');
            //     model.classList.remove('show');
            //     document.body.style.overflow = 'visible'; // 释放滚动
            //     window.removeEventListener('touchmove',stopevent,{ passive: true });
            //     break;
        }
    };
    /*兼容IOS事件委托的bug*/
    var tocdom = document.getElementById('toc-button');
    if(tocdom){
        tocdom.onclick = function(){
            toc.classList.add('show');
            model.classList.add('show');
            document.body.style.overflow = 'hidden'; // 消除滚动
            window.addEventListener('touchmove',stopevent,{ passive: false }); //消除滚动(增强)
        };
        document.getElementById('art-model').onclick = function(){
            toc.classList.remove('show');
            model.classList.remove('show');
            document.body.style.overflow = 'visible'; // 释放滚动
            window.removeEventListener('touchmove',stopevent,{ passive: true });
        }
    }
    tocItm && (Array.prototype.forEach.call(tocItm,function(node){
        node.onclick = function(){
            toc.classList.remove('show');
            model.classList.remove('show');
            document.body.style.overflow = 'visible';
            window.removeEventListener('touchmove',stopevent,{ passive: true });
        };
    }));
    var open = function(){
        if(scrollY > 1000){
            container.classList.add('open');
            top.classList.add('open');
        }else{
            container.classList.remove('open');
            top.classList.remove('open');
        }
    }
    window.onscroll = function(e){
        throttle(open);
    }
    window.onhashchange = function(){
        scrollY > 1000&&(document.documentElement.scrollTop -= 60);
    }
};