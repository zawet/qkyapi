// jquery.html.js by zhangxinxu welcome to visit mu personal website http://www.zhangxinxu.com/
// 2010-04-21 v1.0
// 楂樹寒鏄剧ず鏌愪竴娈礖TML锛屼富瑕佺敤鍦ㄨ瀵烪TML鐨勫姩鎬佸彉鍖�
(function($){
	$.fn.htmlcode = function(o,options){
		var that = $(this);
		options = options || {};
		var defaults = {
			css: {},
			indent: false,
			type: "html"
		};
		var settings = $.extend({}, defaults, options);
		if(!o || typeof(o) !== "object"){
			$('<div id="autoCreateHtmlBox"><div>').appendTo("body");
			o = $("#autoCreateHtmlBox");
		}
		//鑾峰彇HTML鍐呭
		var str = that.html();
		var s_re = /[&<>]/g, s_re_val = {"&":"&amp;","<":"&lt;",">":"&gt;"};
		str = str.replace(s_re, function(c){return s_re_val[c];});
		if(settings.indent){
			str = str.replace(/ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
		}else{
			str = str.replace(/    /g,"&nbsp;").replace(/\t/g,"&nbsp;");
		}
		//鏇挎崲鎹㈣绗�
		str = str.replace(/[\n]/g,"<br />");
		//缁欏紩鍙峰唴瀹规坊鍔犻鑹�
		str = str.replace(/"(.|\s)*?"/g,function(s){
			s = s.replace(/&nbsp;/g, " ").replace(/[:;]/g, function(r){
				return '<span style="color:#f0f;">'+r+'</span>';						   
			});
			return '<span style="color:#00f;">'+s+'</span>';										 
		});
		//缁欐爣绛炬坊鍔犻鑹�
		str = str.replace(/&lt;(.|\s)*?&gt;/g,function(s){
			return '<span style="color:#009;">'+s+'</span>';							 
		});
		//娉ㄩ噴
		str = str.replace(/&lt;!--(.|\s)*?--&gt;/g,function(s){
			return '<span style="color:#999;">'+s+'</span>';							 
		});
		//琛ㄥ崟鍐呭
		str = str.replace(/&lt;(input|button|form|textarea|select|option|optgroup|label)(.|\s)*?&gt;/gi,function(s){
			return '<span style="color:#f90;">'+s+'</span>';							 
		});
		o.css(settings.css);
		//鏄剧ず鍐呭
		if(settings.type === "before"){
			o.before(str);
		}else if(settings.type === "after"){
			o.after(str);
		}else if(settings.type === "append"){
			o.append(str);
		}else if(settings.type === "prepend"){
			o.prepend(str);
		}else{
			o.html(str);	
		}
	};	   
})(jQuery);// JavaScript Document