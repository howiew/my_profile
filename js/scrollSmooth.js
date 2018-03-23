
// 页面预加载




// 导航栏的滚动特效
$(document).ready(function(){


	$(window).scroll(function(){
		if($('.top-navbar').offset().top > 50){
			$('.navbar-fixed-top').addClass('top-navbar-collapse');
		}
		else{
			$('.navbar-fixed-top').removeClass('top-navbar-collapse');
		}
	})


});

