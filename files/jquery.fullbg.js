/**
 * jQuery.fullBg
 * Version 1.0
 * Copyright (c) 2010 c.bavota - http://bavotasan.com
 * Dual licensed under MIT and GPL.
 * Date: 02/23/2010
**/
(function($) {
		  
  $.fn.fullBg = function(){
	  
    var bgImg = $(this);		
 
    function resizeImg() {
		
		var imgwidth = bgImg.width();
		var imgheight = bgImg.height();
		
		var winwidth = $(window).width();
		var winheight = $(window).height();
		
		var widthratio = winwidth / imgwidth;
		var heightratio = winheight / imgheight;
		
		var widthdiff = heightratio * imgwidth;
		var heightdiff = widthratio * imgheight;
		
		var topPos = -(heightdiff-winheight) / 2;
		var leftPos = -(widthdiff-winwidth) / 2;
		
		if(heightdiff > winheight) {
		  
		  	var newWidth = Math.round(winwidth) + 'px';
			var newHeight = Math.round(heightdiff) + 'px';
			
			bgImg.css({
							
				marginLeft: "0px",
				//marginTop: topPos + "px",
				marginTop: "0px",

				width: newWidth,
				height: newHeight
			
			});
			
			//bgImg.attr("width", newWidth);
			//bgImg.attr("height", newHeight);
		
		} else {
			
			var newWidth = Math.round(widthdiff) + 'px';
			var newHeight = Math.round(winheight) + 'px';
		  
			bgImg.css({
				
				marginLeft: leftPos + "px",
				marginTop: "0px",

				width: newWidth,
				height: newHeight
			
			});
			
			//bgImg.attr("width", newWidth);
			//bgImg.attr("height", newHeight);
		
		}	
		
    } 
    
	resizeImg();
	
    $(window).resize(function() {
		resizeImg();
    });
  
  };
  
})(jQuery)