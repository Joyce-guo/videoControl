//分割时间函数        
function timeStamp( second_time ){  
    var time1 = ((parseInt(second_time)/100)).toString();
    var time2 = time1.split(".")[1]? (time1.split(".")[1].length == 1 ? time1.split(".")[1]+'0' : time1.split(".")[1]) :'00';       
    var time =00 + ':' + time2;  
    if( parseInt(second_time )>= 60){
      var second = ((parseInt(second_time) % 60)/100).toString();  
      var min = (parseInt(second_time / 60)/100).toString();
      var time3 = second.split(".")[1]? (second.split(".")[1].length == 1 ? second.split(".")[1]+'0' : second.split(".")[1]) :'00'; 
      var time4 = min.split(".")[1]? (min.split(".")[1].length == 1 ? min.split(".")[1]+'0' : min.split(".")[1]) :'00'; 
      time = time4 + ":" + time3;       
  }  
  return time;          
  }
var  video  =  document.getElementById("video");
var video2 = $("#video");
var videoBox = document.getElementById("videoBox");

window.onload = function() {
   //一开始进入页面video不是白屏
   video.load();
   video.play();
}


//获取视频总时间
video2.on('loadedmetadata', function() {
  
   var time = video.duration;
   var allTime = timeStamp(time); 
   $('.allTime').text("/" + allTime);
});
//监控视频进度，改变时间和进度条状态
video2.on('timeupdate', function() {
   var time = video.currentTime,alltime = video.duration;    
   var percentage = 100 *(time / alltime); 
   $('.progressTime').text(timeStamp(time));
   $('.progressBar').css({'width':percentage + '%'});
   $('.progressBox .imgBox span').css({'margin-left':percentage +'%'});
   if(time == alltime){
          $('.control-btn').attr('src','image/pause.png'); //如果播放时间到总时间播放按钮图片换成停止图片
   }
});
//视频播放/暂停按钮事件
$('.control-btn').click(function(){
    if(video.paused) {
        video.play();
        $(this).attr('src','image/play.png');
        }else {
        video.pause();
        $(this).attr('src','image/pause.png');
    }
    return false;
})

//播放进度拖拉函数
function changeBar(item){
    var progress = $('.progressBox');
    var maxduration = video.duration; //视频总时间
    var position,percentage;
    console.log("left==", item, progress.offset().left);
    position = item - progress.offset().left;
    percentage = 100 * (position / progress.width());
    if(percentage > 100) {
       percentage = 100;
    }
    if(percentage < 0) {
       percentage = 0;
    }
    $('.progressBar').css('width', percentage+'%');
    $('.progressBox .imgBox span').css({'margin-left':percentage +'%'});
    video.currentTime = maxduration * (percentage / 100);//视频进度时间传给当前时间
    video.play();
    $('.control-btn').attr('src','image/play.png'); 
 }
 //视频进度条点击，改变播放进度事件
 var progressBox = document.getElementById('progressBox_special');      //使用$("#")获取的元素，在addEventListener中无法识别
 progressBox.addEventListener('click', function(e) {
   changeBar(e.pageX);
 }, false);

 //视频进度拖拉按钮，拖拽事件
var statePic = document.getElementById('progressImg');

statePic.onmousedown = function(e) {
   // 鼠标移动是在ducoment上移动
   document.onmousemove = function(e) {
      e.stopPropagation();//阻止默认行为
      changeBar(e.pageX)
   }
   // 拖动后记录鼠标抬起事件，否则鼠标任意滑动都会引起播放进度改变
   document.onmouseup = function(e) {
      document.onmouseup = null;
		document.onmousemove=null;
		if(typeof callback=='function'){
		      if(l!==undefined&&t!==undefined){
			      callback(l,t);
		      }	
		}
   }
}
// 刷新播放
$(".reload-btn").on('click', function() {
   console.log("刷新");
   changeBar(0);
})

// 全屏按钮点击事件，video标签全屏，会覆盖自定义的控制条，所以全屏存放video和控制条的容器videoBox
$(".biggerBtn").on('click',function(){
   /*判断是否全屏*/
   var isFullscreen = document.fullScreenElement//W3C
   ||document.msFullscreenElement //IE
   ||document.mozFullScreenElement //火狐
   ||document.webkitFullscreenElement //谷歌
   ||false;
   if(!isFullscreen){
      if (videoBox.requestFullscreen) { 
         videoBox.requestFullscreen(); 
         } else if (videoBox.mozRequestFullScreen) { 
            videoBox.mozRequestFullScreen(); 
         } else if (videoBox.webkitRequestFullscreen) { 
            videoBox.webkitRequestFullscreen(); 
         } else if (videoBox.msRequestFullscreen) { 
            videoBox.msRequestFullscreen(); 
         } 
         $(this).attr('src', 'image/screen.png');
      }else{
         if (document.exitFullscreen) { 
            document.exitFullscreen(); 
         } else if (document.msExitFullscreen) { 
            document.msExitFullscreen(); 
         } else if (document.mozCancelFullScreen) { 
            document.mozCancelFullScreen(); 
         } else if (document.webkitCancelFullScreen) { 
            document.webkitCancelFullScreen(); 
         } 
         $(this).attr('src', 'image/fullscreen.png')
      }
});
// 声音大小拖拉函数
function changeVoice(item) {
   var progress = $(".voice-bg");
   var position, percentage, voice;
   position = item - progress.offset().top;
   voice = 1 - position / progress.height();
   if(voice > 1) {
      voice = 1; 
   }
   if(voice < 0) {
      voice = 0;
   }
   percentage = 100 * voice;    //语音大小的位置占比
   video.volume = voice;
   $(".voice-color").css('height', percentage + '%');
   $(".voice-img").css('top', 100*( position / progress.height()) + '%');
   if(voice > 0) {
      $(".voice-btn").attr('src', 'image/voice.png');
   }else {
      $(".voice-btn").attr('src', 'image/voice-muted.png');
   }
}
// 声音进度条点击，改变声音大小
$(".voice-bg").on('click', function(e) {
   changeVoice(e.pageY);
})
// 语音按钮拖拉事件
var voicePic = document.getElementById('voiceImg');
voicePic.onmousedown = function(e) {
   document.onmousemove = function(e) {
      e.stopPropagation();
      changeVoice(e.pageY);
   }
   // 拖动后记录鼠标抬起事件，否则鼠标任意滑动都会引起播放进度改变
   document.onmouseup = function(e) {
      document.onmouseup = null;
		document.onmousemove = null;
		if(typeof callback=='function'){
		      if(l!==undefined&&t!==undefined){
			      callback(l,t);
		      }	
		}
   }
}
// 声音大小按钮点击事件
$(".voice-img").on('click', function(e) {
   changeVoice(e.pageY);
})
$(".voice-box").hover(function() {
   $('.voice-btn').css('background-image', 'url("image/voice-color.png")');
},function() {
   $('.voice-btn').css('background-image', 'url("image/voice.png")');
})
$(".voice-control-box").hover(function() {
   $('.voice-btn').css('background-image', 'url("image/voice-color.png")')
},function() {
   $('.voice-btn').css('background-image', 'url("image/voice.png")');
})
// 静音/全音
$(".voice-btn").click(function() {
   if(video.muted) {
      $(this).css('background-image', 'url("image/voice.png")');
      $(".voice-color").css('height', '100%');
      $(".voice-img").css('top', '0%');
      video.muted = false;
      video.volume = 1;
   }else {
      $(this).css('background-image', 'url("image/voice-muted.png")');
      $(".voice-color").css('height', '0%');
      $(".voice-img").css('top', '100%');
      video.muted = true;
      video.volume = 0;
   } 
})
var isBulm = false;
// 关灯效果
$(".bulm-btn").click(function() {
   if(isBulm) {
      $(this).attr('src', 'image/bulm.png');
   }else {
      $(this).attr('src', 'image/bulm-color.png');
   }
   isBulm = !isBulm;
})