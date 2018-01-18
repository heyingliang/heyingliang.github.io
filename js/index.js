window.onload = function(){
	var container = document.getElementById('container');
	var mob_nav = document.getElementById('mob-nav');
	document.onclick = function(e){
		var that = e.target || window.event.target;
		switch(that.id){
			case 'mob-close':
				mob_nav.classList.remove('change');
				container.classList.remove('change');
				break;
			case 'mob-more':
				container.classList.add('change');
				mob_nav.classList.add('change');
				break;
		}
	};
};