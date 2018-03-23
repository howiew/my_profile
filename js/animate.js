//定义动画的时间函数
$(function(){

	//set default options

	//s2
	$('#aboutMe').find('.about-thumb').css({
		"margin-left":"-150px",
		"opacity":"0"
	}).hide();

	$('#aboutMe').find('.wish-thumb').css({
		"margin-right":"-150px",
		"opacity":"0"
	}).hide();

	$("#s1,#s2,#s3,#s4").css({
		"opacity":"0"
	});

	//s3

	$('#bginfo').find('.education-thumb').css({
		'opacity':0,
		'margin-left':'-150px'
	}).hide();
	$('#bginfo').find('.experience-thumb').css({
		'margin-right':'-150px',
		'opacity':'0'
	}).hide();

	//s4

	
});

//技能环自动加载函数
function circleAnimate(s,id){
	//定义当前动画运行的速度和时间(ms)
	var v = 0.072;//技能环的转速定为：0.072度/毫秒
	s = s *3.6;
	//旋转时间为ms
	var t = s / v;

	var count = Math.floor(t / 10);
	var i=1;
	var currentDeg=null;
	//定义定时器，进行定时执行动画,每隔100ms执行一次函数。执行完一次动画需要的次数为 t * 1000 / 100;
	var timer = window.setInterval(()=>{
		//判定当前动画是否已执行完成
		
		if (i <= count && timer){
			//动画执行次数还未完成，并且定时器完好,继续执行动画
			currentDeg = i *10 * v;
			if(currentDeg <= 180){
				$(id).find('.right').css('transform',`rotate(${currentDeg}deg)`);
			}
			else{
				$(id).find('.right').css('transform',`rotate(180deg)`);
				$(id).find('.left').css('transform',`rotate(${currentDeg - 180}deg)`);
			}
			i++;
		}
		else{
			window.clearInterval(timer);
		}
	},10);

}


//技能圆环动态加载效果逻辑
var setCircleAnimate = function(id){
	//相关参数
	var _options={
		overDuration : 200,
		outDuration  : 150,
		over : {
			opacity:1
		},
		out : {
			opacity:1
		}
	};

	//要进行动画的ID
	$(id).stop().animate(_options.over,_options.overDuration,'',function(){
		$(id).stop().animate(_options.out,_options.outDuration);
	});

	//进行动画
	var text =$(id).find('.mark span').text();
	circleAnimate(text,id);
}
//滚动条滚动触动函数
var scrollSet = function(){
	// 记录滚动条的位置
	var windowScrollTop = $(window).scrollTop();
	var screenScrollTop = $(window).height();


	//个人介绍区域

	if(windowScrollTop >= ($('#aboutMe').offset().top - screenScrollTop + 50) && $('#aboutMe').data('animate') == 0){
		$('#aboutMe').find('.about-thumb').
			animate({
				"margin-left":"0px",
				"opacity":"1"
			},1000).
			show();

		$('#aboutMe').find('.wish-thumb').
			animate({
				"margin-right":"0px",
				"opacity":"1"
			},1000).
			show();

		$('#aboutMe').data('animate',1);
		console.log("当前区域:s2");
	}


	//技能块区域
	if(windowScrollTop >= ($("#skills").offset().top-screenScrollTop+ 150) && $('#skills').data('animate') == 0){
		
		//设置动画状态，正在进行.
		$('#skills').data('animate',1);
		//到达技能环区域
		//依次加载技能环
		//#s1
		setCircleAnimate("#s1");

		//#s2
		setTimeout(function(){
			setCircleAnimate("#s2");
		},400);

		//#s3
		setTimeout(function(){
			setCircleAnimate("#s3");
		},750);

		//#s4
		setTimeout(function(){
			setCircleAnimate("#s4")
		},1050);
	}
	if(windowScrollTop >= ($("#bginfo").offset().top-screenScrollTop + 250) && $('#bginfo').data('animate') == 0){


		$('#bginfo').find('.education-thumb').animate({
		'opacity':1,
		'margin-left':'0px'
		},1000).show();

		$('#bginfo').find('.experience-thumb').animate({
			'margin-right':'0px',
			'opacity':1
		},1000).show();

		$('#bginfo').data('animate',1);
	}

}
//绑定窗口的滚动事件
//设置动画的默认状态为未进行动画

$(window).scroll(scrollSet);