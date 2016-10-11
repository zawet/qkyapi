// JavaScript Document

//闭包限定命名空间
(function ($) {
	var clickDom='<a class="timeicon"><i class="qkyicon">&#xe68f;</i></a>';
    var createDom='<div class="qky_calendar"></div>';
	var Shtml='<div class="qky_calsel fl mb10">';
	var yhtml='<div class="calselshow fl"><a class="calselectON dian3 cal_year"></a><div class="caloptionbox yearbox scroll" sel="y"></div></div><span class="mr10 fl ml2">年</span>';
	var mhtml='<div class="calselshow fl"><a class="calselectON dian3 cal_moon"></a><div class="caloptionbox moonbox" minnumber="1" maxnumber="13" sel="m"></div></div><span class="fl ml2">月</span>';
	var hsel='<div class="calselshow fl MS77 ml16 mt10 upsel" id="hour"><a class="calselectON dian3 cal_hour"></a><div class="caloptionbox scroll date_hour" minnumber="0" maxnumber="24"></div></div>';
	var ssel='<div class="calselshow fl MS77 mt10 upsel" id="minute"><a class="calselectON dian3 cal_minute"></a><div class="caloptionbox scroll date_minute" minnumber="0" maxnumber="60"></div></div>';
	var Sthtml='<table cellpadding="0" cellspacing="0" border="0" class="qky_cal_tab"></table>';
	var ed='</div>';
	var et='</table>';
	var clear='<div class="clear"></div>';
	var showdate='<div class="showdate fr mb10"></div>';
	var clearbut='<a class="qkybut hbg brad4 cleardate  mt10 fl">清除日期</a>';
	var maohao='<span class="fl mt10 muhao" style="line-height:34px; margin:0 6px;">：</span>';
	var thisDate = new Date();
	var toyear=thisDate.getFullYear();
	var tomoon=thisDate.getMonth()+1;
	var today=thisDate.getDate();
	var create_id=".qky_calendar"; 
	var click_id=".timeicon";
	var calbox="";
	//默认参数
	var opts = {
		TY:thisDate.getFullYear(),
		TD:thisDate.getDate(),
		TM:thisDate.getMonth()+1,
		TH:thisDate.getHours(),//获取当前小时数(0-23)
		TMI:thisDate.getMinutes(),
		s_value:true,
		s_hssel:true,
		s_oldday:true
	};

    $.fn.extend({
        "calendar": function (options) {
            //检测用户传进来的参数是否合法
            if (!isValid(options))
                return this;
            opts = $.extend({}, opts, options); //使用jQuery.extend 覆盖插件默认参数
            return this.each(function (i) {  //这里的this 就是 jQuery对象。这里return 为了支持链式调用
                
                var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom
				calbox=$this;

				//渲染框架
				$this.append(clickDom+createDom);
				$(create_id).html(Shtml+yhtml+mhtml+clear+ed+showdate+clear+Sthtml+clearbut+Shtml+hsel+maohao+ssel+clear+ed);
				
				//初始化时间输入框值和日历显示当前选中值
				change_value(opts.TY,opts.TM,opts.TD,opts.TH,opts.TMI,$(create_id).find(".showdate"),$this.find(".caldate"));
				
				
				//渲染年月时分下拉选项
				datesel($(create_id).find(".yearbox"));
				datesel($(create_id).find(".moonbox"));
				datesel($(create_id).find(".date_minute"));
				datesel($(create_id).find(".date_hour"));
				
				//初始化下拉默认值
				$(create_id).find(".cal_year").html(opts.TY);
				$(create_id).find(".cal_moon").html(opts.TM);
				$(create_id).find(".cal_hour").html(opts.TH);
				$(create_id).find(".cal_minute").html(opts.TMI);
				
				//提供下拉事件
				qkysels($(create_id));
				
				//渲染日期列表
				cal_Xr(opts.TY,opts.TM,opts.TD,$(create_id).find(".qky_cal_tab"));
				
				$(create_id).find(".qky_cal_tab a").each(function(ient) {
					if($(this).attr("date")==opts.TY+'-'+opts.TM+'-'+opts.TD){
                    $(this).addClass("cur");}
                });
				
				//是否显示时分上拉
				if(!opts.s_hssel){
					$(create_id).find("#hour").hide();
					$(create_id).find("#minute").hide();
					$(create_id).find(".muhao").hide();
				}
				
				//是否默认就显示当前日期时间到输入框	
				if(!opts.s_value){$this.find(".caldate").val("");}
				
				//启动交互动画
				$.fn.calendar.cal_anmate(click_id,create_id);
 
            });
			
        }
    });
    
	
	//公共的格式化 方法. 默认是加粗，用户可以通过覆盖该方法达到不同的格式化效果。
	
	//日历启动交互动画
	$.fn.calendar.cal_anmate=function(clickid,createid){
		calbox.find(clickid).each(function(i) {
			$(this).click(function(){
				$(this).parent().css("z-index","8888888").find(createid).slideToggle(200);
				$(this).parents(".qkysel").siblings().find(clickid).parent().css("z-index","99");
				$(this).parents(".qkysel").siblings().find(createid).slideUp(100);	
			});
		});
		
		/***以为区域点击 s**/
		 $(document).not($(createid)).click(function(){
			$(createid).slideUp(500);
		});
		$(document).not($(clickid)).click(function(){
			$(createid).slideUp(500);
		});
		/*防止事件冒泡*/
		$(createid).click(function(event){
			event.stopPropagation();
		});
		$(clickid).click(function(event){
			event.stopPropagation();
		});
	}
	
	
    //私有方法，检测参数是否合法
    function isValid(options) {
        return !options || (options && typeof options === "object") ? true : false;
    }
	
	//赋值方法
	function change_value(y,m,d,h,mi,showid1,showid2){
		if(opts.s_hssel){
			showid1.html(y+"-"+m+"-"+d+" "+h+":"+mi);
			showid2.val(y+"-"+m+"-"+d+" "+h+":"+mi);
		}else{
			showid1.html(y+"-"+m+"-"+d);
			showid2.val(y+"-"+m+"-"+d);
		}
	}
	
	//渲染日历指定年月的列表
	function cal_Xr(y,m,d,id){
		var weekHtml="<tr>";
		var moomHtml="";
		md=DayNumOfMonth(y,m);//获取当前月天数
		var dates=new Date(y,m-1,1);
		var mfd=dates.getDay();//获取第一天星期几，0为星期天
		//获取此月周数
		var forweek=Math.ceil((md+mfd)/7);
		id.html('<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>'); 
		for(var i=0;i<forweek;i++){
			for(var j=0;j<7;j++){
				//j+(i*7)为加了前空白期的循环下标
				if((j+(i*7))<mfd){
				weekHtml+='<td>&nbsp;</td>';
				}else{
					var thisday=j+(i*7)-mfd+1;
					//(j+(i*7))-mfd+1为真正日数，即几号；
					if(thisday>md){
						weekHtml+='<td>&nbsp;</td>';
					}else {
						var ds='';
						if(thisday<10)ds="0"+thisday;else ds=thisday;
						if(thisday==today&&y==toyear&&m==tomoon){
							weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'" class="today" type="news">'+ds+'</a></td>';
						}else{
							weekHtml+='<td><a date="'+y+'-'+m+'-'+thisday+'" type="news">'+ds+'</a></td>';
						}
					}
				}
			}
			moomHtml+=weekHtml+"</tr>";
			weekHtml="<tr>";
		}
		id.append(moomHtml);
		
		cal_click();//天数点击
		cleardate();//清除日历	
	}
	//获取指定年月的天数
	function DayNumOfMonth(Year,Month){
		  var d = new Date(Year,Month,0);
		  return d.getDate();
	}
	
	
	//创建时，分，秒下拉选项
	function datesel(id){
		seltype=id.attr("sel");
		var maxnum;var minnum;
		if(seltype=="y"){
			if(!opts.s_oldday) minnum=toyear;
			else minnum=2000;
			maxnum=toyear+12;
		}else{
			maxnum=Number(id.attr("maxnumber"));
			minnum=Number(id.attr("minnumber"));
		}
		var selhtml='';
		for(var i=minnum;i<maxnum;i++){
			var temi;
			if(seltype!="m"){if(i<10)temi="0"+i; else temi=i;}else{temi=i}
			selhtml+='<a class="option trn dian3" value="'+temi+'">'+temi+'</a>';
		}
		id.html(selhtml);
	}

	//日历独立下拉事件
	function  qkysels(thisid){
		$(thisid).find(".calselectON").each(function(i) {
			$(this).click(function(){
				$(this).parent().find(".caloptionbox").slideToggle(200);
			});
		});
		$(create_id).each(function(ik) {
			$(this).find(".qky_calsel").each(function(i) {
				$(this).find(".caloptionbox a.option").each(function(j) {
					$(this).click(function(){
						$(this).parent().parent().find(".calselectON").html($(this).attr("value"));
						var xrid=$(this).parent().parent().parent().parent();
						var sel_y=xrid.find(".cal_year").html();
						var sel_m=xrid.find(".cal_moon").html();
						var sel_h=xrid.find(".cal_hour").html();
						var sel_mi=xrid.find(".cal_minute").html();
						var dq_date=get_dqdates(xrid.find(".showdate"));//获取现在已经选中的日期时间
						cal_Xr(sel_y,sel_m,dq_date[2],xrid.find(".qky_cal_tab"));//重新渲染当前年月的日历
						change_value(sel_y,sel_m,dq_date[2],sel_h,sel_mi,xrid.find(".showdate"),xrid.parent().find(".caldate"));//更换值
						$(this).parent().slideUp(200);
					}); 
				});
			});
		});
	}
	
	//日历日期点击
	function cal_click(){
		if(!opts.s_oldday){
			$(create_id).each(function(ib) {
				$(this).find(".qky_cal_tab a").each(function(t) {
					var thistime=new Date($(this).attr("date").replace(/\-/g, "\/"));
					var todaytime=new Date(toyear,tomoon-1,today);
					if(thistime<todaytime){
						$(this).addClass("oldday").attr("type","old");
					}
				});
			});
		}
		$(create_id).each(function(ins) {
			$(this).find(".qky_cal_tab a[type='news']").each(function(i) {
				$(this).click(function(){
					$(create_id).eq(ins).find(".qky_cal_tab a").removeClass("cur");
					$(this).addClass("cur");
					var dq_date=get_dqdates($(create_id).eq(ins).find(".showdate"));//获取现在已经选中的日期时间
					var chodate=$(this).attr("date").split("-");
					change_value(chodate[0],chodate[1],chodate[2],dq_date[3],dq_date[4],$(create_id).eq(ins).find(".showdate"),$(create_id).eq(ins).parent().find(".caldate"));
				});
			});
		});
	}
	
	//清除日期
	function cleardate(){
		$(create_id).find(".cleardate").click(function(){
			$(this).parent().find(".qky_cal_tab a").removeClass("cur");
			$(this).parents(".hicon").find(".caldate").val("");
		});
	}
	
	//获取当前选中日历时间
	function get_dqdates(sd_id){
		var dqdates;
		var dqtimes;
		if(opts.s_hssel){
			dqtimes=sd_id.html().split(" ")[1].split(":");
			dqdates=sd_id.html().split(" ")[0].split("-");
		}else{
			dqtimes=["00","00"];
			dqdates=sd_id.html().split("-");
		}
		dqdates=dqdates.concat(dqtimes);
		return dqdates;
	}
})(window.jQuery);