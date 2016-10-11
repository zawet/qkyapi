// JavaScript Document
/**********************************************************
更新信息：
	更新日期：2016/08/9
	更新人员：zwt
	更新后版本号：1.2
	更新内容：新增几个ui空间交互函数，优化了日期选择的显示影藏事件，新增清除日期数据按钮
	优化日期插件：
	新增时分下拉选择；
	新增功能选择（是否默认显示当天日期到输入框，是否要时分下拉框，是否把过去的日期天全变不可交互不可选）；
	优化年月时分下拉选后的交互数据的变化；
	日历可独立脱离分化，就是可以一个页面多种类型的日期控件，通过不同id去锁定启动器，也可以公用一个启动器！

***********************************************************************************************************************
中间版本有无数次更新，于是下个版本之间跟着大版本
更新信息：
	更新日期：2016/09/22
	更新人员：zwt
	更新后版本号：3.2
	更新内容：增加n级导航启动器，新增下拉菜单指定id点击执行后执行新函数，新增单/复选框指定id点击后执行新函数；
**************************************************************/


/****************************************************************************整体公用*************/

//底部自动漂浮在最低
function footinbottom(header,content,foot){
	var body_h=$(content).outerHeight()+$(header).outerHeight()+$(foot).outerHeight();
	if($(window).height()>=body_h){
		var foot_mt=$(window).height()-body_h;
	  $(foot).css("margin-top",foot_mt+"px");
	}else{
		$(foot).css("margin-top","16px");
	}
	$(content).css({"margin-top":$(header).outerHeight()+"px"});
}	
$(window).load(function(){
	footinbottom(".qky_header",".qky_content",".qky_footer");
});
$(window).on('resize',function(){
	footinbottom(".qky_header",".qky_content",".qky_footer");

});


/****************************************************************************下拉菜单（日历插件单独）*************/

//下拉菜单交互函数(公用)

function  qkysel(){
	$(".qkysel").each(function(i) {
        $(this).find(".selectON").click(function(){
			$(this).parent().find(".optionbox").slideToggle(200);
			$(this).parents(".qkysel").siblings().find(".optionbox").slideUp(100);
			$(this).parent().siblings().find(".optionbox").slideUp(100);
		});
		$(this).find(".optionbox a.option").each(function(j) {
            $(this).click(function(){
				$(this).parent().slideUp(200).parent().find(".selectON").html($(this).attr("value"));
			}); 
        });
		
		//三维交互
		$(this).find("a.twosel").click(function(){
			$(this).parent().find(".optionbox2").slideToggle(200);
		});
		$(this).find(".optionbox2").each(function(t) {
            $(this).find("a.option2").each(function(s) {
				$(this).click(function(){
					var value=$(this).parents(".option").find(".twosel").attr("value")+$(this).attr("value");
					$(this).parents(".optionbox").slideUp(200).parent().find(".selectON").html(value);
				}); 
        	});
        });
		
    });
}
//单下拉，无下拉选项点击后给值（类似导航组）
function  qkysel_onlya(id){
		$(id).each(function(i) {
			$(this).find(".selectON").click(function(){
				console.log($(this).html());
				$(this).next(".optionbox").first().slideToggle(200);
			});
			$(this).find(".optionbox a.option").each(function(j) {
				$(this).click(function(){
					$(this).parent().slideUp(200);
				}); 
        	});
		});
}
//指定id点击执行后执行新函数
function  qkysel_id_fun(id,fun){
	$(id+" .qkysel").each(function(i) {
        $(this).find(".selectON").click(function(){
			$(this).parent().find(".optionbox").slideToggle(200);
			$(this).parents(".qkysel").siblings().find(".optionbox").slideUp(100);
			$(this).parent().siblings().find(".optionbox").slideUp(100);
		});
		
		$(this).find(".optionbox a.option").each(function(j) {
            $(this).click(function(){
				$(this).parent().slideUp(200).parent().find(".selectON").html($(this).attr("value"));
				fun($(this));
			}); 
        });
	});
}

//下拉菜单取值函数
function getqkysel_Value(id){
	return $(id).html();
}

//上下按钮选择值
function qkyu_d(){
	$(".u_d").each(function(i) {
        $(this).find("i").eq(0).click(function(){
			$(this).siblings().removeClass("noc");
			var up=$(this).parent().attr("up_down").split("_")[1];//只允许的最大值
			var this_va=Number($(this).parent().parent().find(".u_d_sel").val());//当前值
			var up_v=this_va+1;
			var up_vv;//替换容器
			if(up_v<10){
				up_vv="0"+up_v;
			}else if(up_v>up){
				up_vv=up;
				$(this).addClass("noc");
			}else{
				up_vv=up_v;
			}
			$(this).parent().parent().find(".u_d_sel").val(up_vv);
		});
		$(this).find("i").eq(1).click(function(){
			$(this).siblings().removeClass("noc");
			var down=$(this).parent().attr("up_down").split("_")[0];//只允许的最小值
			var this_va=Number($(this).parent().parent().find(".u_d_sel").val());//当前值
			var down_v=this_va-1;
			var down_vv;//替换容器
			if(down_v<10&&down_v>down){
				down_vv="0"+down_v;
			}else if(down_v<=down){
				down_vv="0"+down;
				$(this).addClass("noc");
			}else{
				down_vv=down_v;
			}
			$(this).parent().parent().find(".u_d_sel").val(down_vv);
		});
    });
}

/************************************************************************* 按钮**************/

//连体按钮
function qkybut_lt(){
	$(".qkybut_lt a").each(function(i) {
        $(this).click(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
		});
    });
}


/************************************************************************* 单/复选择**************/

//复选框点击（整页公用）
function qkychbox(){
	$(".qkychbox.fang").each(function(i) {
		$(".qkychbox.fang.cur").attr("ischoose","1");
        $(this).click(function(){
			$(this).toggleClass("cur");
			if($(this).attr("ischoose")=="0"){
				$(this).attr("ischoose","1");
			}else{
				$(this).attr("ischoose","0");
			}
		});
    });
}
//复选框指定id点击后执行新函数
function qkychbox_id_fun(id,fun){
	$(id+" .qkychbox.fang").each(function(i) {
		$(id+" .qkychbox.fang").attr("ischoose","0");
		$(id+" .qkychbox.fang.cur").attr("ischoose","1");
        $(this).click(function(){
			$(this).toggleClass("cur");
			if($(this).attr("ischoose")=="0"){
				$(this).attr("ischoose","1");
			}else{
				$(this).attr("ischoose","0");
			}
			fun($(this));
		});
    });	
}
//单选框点击（整页公用）
function qkychbox_sigle(){
	$(".qkychbox.yuan").each(function(i) {
        $(this).click(function(){
			if($(this).attr("ischoose")=="0"){
				
				$(this).addClass("cur").attr("ischoose","1");
				$(this).siblings().removeClass("cur").attr("ischoose","0");
			}else{
				$(this).removeClass("cur").attr("ischoose","0");
			}
		});
    });
}

//单选框指定id点击后执行新函数
function qkychbox_sigle_id_fun(id,fun){
	$(id+" .qkychbox.yuan").each(function(i) {
        $(this).click(function(){
			if($(this).attr("ischoose")=="0"){
				$(this).addClass("cur").attr("ischoose","1");
				$(this).siblings().removeClass("cur").attr("ischoose","0");
			}else{
				$(this).removeClass("cur").attr("ischoose","0");
			}
			fun($(this));
		});
    });
}

//zhu复选框根据id进行联动zi复选框 zhu的id一定要在zi的id的_前面保持一致（整页公用）
function liandai_chbox(){
	$(".qkychbox.zhu").each(function(i) {
		$(this).attr("isclick","no");
    	$(this).click(function(){
			var zhuid=$(this).attr("id");
			if($("#"+zhuid).attr("isclick")=="no"){	
				$(".qkychbox.zi").each(function(j) {
					var ziid=$(this).attr("id").split("_");
					if(ziid[0]==zhuid){$(this).attr("ischoose","1").addClass("cur");}
				});
				$("#"+zhuid).attr("isclick","yes");
			}else{
				$(".qkychbox.zi").each(function(j) {
					var ziid=$(this).attr("id").split("_");
					if(ziid[0]==zhuid){$(this).attr("ischoose","0").removeClass("cur");}
				});
				$("#"+zhuid).attr("isclick","no");
			}
		}); 
    });
}

//获取复选框是否选中 1为选中，0为未选 ,type为获取的类型是什么，值（value）还是选中状态
function getchbox(id,type){
	if(type=="value")return $(id).attr("value");
	else return $(id).attr("ischoose");
}



/******************************************************************************导航*************/

//导航标题交互
function qkynav(){
	$(".qkynav label").each(function(i) {
		$(this).not($(this).find("a")).click(function(){
			$(this).parent().find("ul").slideDown(400);
			$(this).find("a").addClass("r90")
			$(this).parent().siblings().find("ul").slideUp(400);
			$(this).parent().siblings().find("label a").removeClass("r90");
		});
	});
	
	$(".qkynavs label").each(function(i) {
		$(this).click(function(){
			$(this).parent().find("ul").slideToggle(400);
			$(this).find("a").toggleClass("r90")
		});
	});
	//qkynav_li();
}


//N级导航交互
function qky_njnav(){
	$(".qky_njclick").each(function(i) {
		$(this).attr("isc","no");
        $(this).click(function(){
			if($(this).attr("isc")=="no"){
				$(this).find(".appicon").addClass("co_gr2").removeClass("co_gr").html("&#xe60f;");
				$(this).next(".qky_njbox").first().slideDown(200);
				$(this).attr("isc","yes");
			}else{
				$(this).find(".appicon").addClass("co_gr").removeClass("co_gr2").html("&#xe610;");
				$(this).next(".qky_njbox").first().slideUp(200);
				$(this).attr("isc","no");
			}
		});
    });
	$(".qky_njend").each(function(i) {
        $(this).click(function(){
			$(".qky_njend").removeClass("cur");
			$(this).addClass("cur");
		});
    });
}

/***************************************************************************** 弹窗**************/
function popOut(i){$(i).fadeOut('fast');};//关闭弹窗
function popIn(i,isdr){$(i).fadeIn('fast');qkymaskmian_td(i+" .qky_maskmian",isdr);};//启动弹窗，isdr是否支持弹窗拖拉
function tipspop(tit,iconcode,content){
	$('#tips').find("#titname").html(tit);
	$('#tips').find("#msgtxt").html(content);
	$('#tips').find("#msgicon").html(iconcode);	
	popIn('#tips');
}
//弹窗拖动和始终上下左右居中对齐
function qkymaskmian_td(id,isdr){
	var left=top=thisw=thish=0;
	thisw=$(id).width();
	thish=$(id).outerHeight();
	left=$(window).width()-thisw;
	tops=$(window).outerHeight()-thish;
	//console.log(thisw,thish,tops,left);
	if(tops<=0){tops=0;}else{tops=tops/2;}
	if(left<=0){left=0;}else{left=left/2;}
	$(id).css({"top":tops+"px","left":left+"px"});
	if(tops>0&&left>0){
		if(isdr==true){$(id).draggable({containment: "parent", scroll: true });}//拖动
	}
}

/******************************************************************************进度条*************/

//设置进度条（输入百分比数值当参数）
function setqkyProgress(percent,id){
	$(id+" .qkyProgress_zi").css({"width":percent+"%"});
	$(id+" .qkyProgress_show span").html(percent+"%");
}
