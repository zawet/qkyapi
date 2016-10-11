// JavaScript Document
 function bar_tooltip(params){
	var html="";
	if(params.length>1){
		var count=0;
		for(var i=0;i<params.length;i++){count+=Number(params[i].value);}
		html+='<span class="iskuai fz_16">'+params[0].name+'总人数：'+count+'</span>';
		for(var j=0;j<params.length;j++){
			html+='<span class="iskuai"><span class="xiyuan" style="background:'+params[j].color+'"></span>'+params[j].seriesName+'：'+params[j].value+'人</span>';
		}
	}
	else{
		html+='<span class="iskuai fz_16">'+params[0].name+'</span>';
		html+='<span class="iskuai"><span class="xiyuan" style="background:'+params[0].color+'"></span>'+params[0].seriesName+'：'+params[0].value+'人</span>';
	}
	return html;
}
 
 
function Xrech(barid,bar_datas,pieid,pie_datas,hjid,hj_datas,mzid,mz_datas,rxid,rx_datas,jdid,jd_datas){
	var bar_labels =new Array();
	var bar_values=new Array();
	var bar_values_bay =new Array();
	var bar_values_gril =new Array();
	var pie_labels =new Array();
	var pie_values = new Array();
	var hj_labels =new Array();
	var hj_values = new Array();
	var hj_values_bay =new Array();
	var hj_values_gril =new Array();
	var mz_labels =new Array();
	var mz_values = new Array();
	var rx_labels =new Array();
	var rx_values = new Array();
	var jd_labels =new Array();
	var jd_values = new Array();
	
	for(var key in bar_datas){
		bar_labels.push(key);
		bar_values_bay.push(bar_datas[key][0]);
		bar_values_gril.push(bar_datas[key][1]);
	}
	for(var key in pie_datas){
		pie_labels.push(key);
		pie_values.push({value:pie_datas[key][0],name:key,itemStyle:{normal:{color:pie_datas[key][1]}}});
	}
	for(var key in hj_datas){
		hj_labels.push(key);
		hj_values_bay.push(hj_datas[key][0]);
		hj_values_gril.push(hj_datas[key][1]);
	}
	for(var key in mz_datas){
		mz_labels.push(key);
		mz_values.push(mz_datas[key]);
	}
	for(var key in rx_datas){
		rx_values.push({value:rx_datas[key][0],name:key,itemStyle:{normal:{color:rx_datas[key][1]}}});
	}
	for(var key in jd_datas){
		jd_labels.push(key);
		jd_values.push({value:jd_datas[key][0],itemStyle:{normal:{color:jd_datas[key][1]}}});
	}
			 
	//渲染表格（想看明白请看ECharts 3.0官方api） 
	var myChart_bar = echarts.init(document.getElementById(barid));
	var myChart_pie = echarts.init(document.getElementById(pieid));
	var myChart_hj = echarts.init(document.getElementById(hjid));
	var myChart_mz = echarts.init(document.getElementById(mzid));
	var myChart_rx = echarts.init(document.getElementById(rxid));
	var myChart_jd = echarts.init(document.getElementById(jdid));
	
	
	option_bar = {
			tooltip : {trigger:'axis',axisPointer :{type : 'shadow'},formatter:function(params){return bar_tooltip(params);}},
			legend: {right:10,top:5,data:['男','女'],textStyle:{color:"#999"},selectedMode:true},
			grid:{left: '4%',right: '10%',bottom: '2%',top: '17%',containLabel: true},
			xAxis:[{
				name:"年龄",
				nameTextStyle:{color:"#a2a2a2"},
				nameGap:2,
				axisLabel:{textStyle:{color:"#a2a2a2"},margin:30},
				axisLine:{lineStyle:{color:"#eee"}},
				type:'category',
				data:bar_labels,
				axisTick:{alignWithLabel:true,show:false}
			}],
			yAxis:[{
				name:"人数",
				nameTextStyle:{color:"#a2a2a2"},
				nameGap:14,
				axisTick:{show:false},
				axisLabel:{show:true,textStyle:{color:"#a2a2a2"}},
				axisLine:{show:false},
				type:'value',
				splitLine:{show:true,lineStyle:{color:"#efefef"}}
				}],
			series : [
			{
					name:'女',
					type:'bar',
					stack:"zwt",
					barWidth:"40%",
					itemStyle:{normal:{color:"#ab76ee"}},
					data:bar_values_gril,
					label:{normal:{show:true,textStyle:{color:"#ab76ee",fontSize:12},position:"bottom"}}
				},
				{
					name:'男',
					type:'bar',
					stack:"zwt",
					barWidth:"40%",
					itemStyle:{normal:{color:"#ffcf10"}},
					data:bar_values_bay,
					label:{normal:{show:true,textStyle:{color:"#ffcf10",fontSize:12},position:"top"}}
				}
				
			]
	};
		
	option_pie = {
			tooltip : {trigger: 'item',formatter: "{b}生占比 : {d}% <br/>{c}人"},
			series : [
				{
					name: '人数',
					type: 'pie',
					radius: ['35%', '60%'],
            		avoidLabelOverlap: false,
					startAngle:-45,
					center: ['50%', '50%'],
					data:pie_values,
					label:{normal:{formatter:"{b}生占比\n{d}%",textStyle:{fontSize:14},show:true}},
					labelLine:{normal:{smooth:0.4}},
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
	};
	
	option_hj= {
			tooltip : {trigger:'axis',axisPointer :{type : 'shadow'},formatter:function(params){return bar_tooltip(params);}},
			legend: {right:10,top:5,data:['男','女'],textStyle:{color:"#999"},selectedMode:true},
			grid:{left: '4%',right: '4%',bottom: '0',top: '25%',containLabel: true},
			xAxis:[{axisLabel:{textStyle:{color:"#a2a2a2"}},axisLine:{lineStyle:{color:"#eee"}},type:'category',data:hj_labels,axisTick:{alignWithLabel:true,show:false}}],
			yAxis:[{name:"人数",nameTextStyle:{color:"#a2a2a2"},axisTick:{show:false},axisLabel:{show:false},axisLine:{show:false},type:'value',splitLine:{show:true,lineStyle:{color:"#eee"}}}],
			series : [
			{
					name:'男',
					type:'bar',
					itemStyle:{normal:{color:"#ffcf10"}},
					data:hj_values_bay,
					label:{normal:{show:true,textStyle:{color:"#ffcf10",fontSize:14},position:"top"}}
				},
				{
					name:'女',
					type:'bar',

					itemStyle:{normal:{color:"#99e522"}},
					data:hj_values_gril,
					label:{normal:{show:true,textStyle:{color:"#99e522",fontSize:14},position:"top"}}
				}
				
			]
	};
	
	
	option_mz = {
		
		tooltip: {
			trigger: 'axis',axisPointer :{type : 'shadow'}
		},
		grid:{left: '4%',right: '4%',bottom: '4%',top:'14%',containLabel: true},
		xAxis:  {
			name:"民族",
			nameTextStyle:{color:"#a2a2a2"},
			nameLocation:"middle",
			type: 'category',
			boundaryGap: false,
			axisLabel:{show:false},axisTick:{show:false},
			axisLine:{lineStyle:{color:"#eee"}},
			data: mz_labels
		},
		yAxis: {
			name:"人数",
			nameTextStyle:{color:"#a2a2a2"},
			nameLocation:"middle",
			type: 'value',
			axisTick:{show:false},axisLabel:{show:false},splitLine:{show:true,lineStyle:{color:"#eee"}},axisLine:{show:false}
		},
		series: [
			{
				name:'人数',
				type:'line',
				symbolSize:8,
				label:{normal:{show:true,formatter:"{b}"}},
				itemStyle:{normal:{color:"#10adfe"}},
				lineStyle:{noormal:{color:"#10adfe"}},
				areaStyle:{normal:{color:"rgba(15,173,254,0.5)"}},
				data:mz_values
			},
			
		]
	};
	option_rx = {
		tooltip : {
			trigger: 'item',
			formatter: "{b}{a}<br/> {c}人，占{d}%"
		},
		calculable : true,
		series : [
			{
				name:'人数',
				type:'pie',
				radius : [10,70],
				center : ['50%', '50%'],
				roseType : 'area',
				label:{normal:{formatter:"{b}\n{d}%",textStyle:{fontSize:14},show:true}},
				labelLine:{normal:{smooth:0.4}},
				data:rx_values
			}
		]
	};

	
	option_jd = {
			tooltip : {trigger:'axis',axisPointer :{type : 'shadow'}},
			grid:{left: '4%',right: '10%',bottom: '0',top: '0',containLabel: true},
			xAxis:[{axisTick:{show:false},axisLabel:{show:false},axisLine:{show:false},type:'value',splitLine:{show:false}}],
			yAxis:[{axisLabel:{textStyle:{color:"#a2a2a2"}},axisLine:{lineStyle:{color:"#a4eea9"}},axisTick:{alignWithLabel:true},
			type:'category',data:jd_labels}],
			series : [
				{
					name:'人数',
					type:'bar',
					data:jd_values,
					barWidth:"70%",
					label:{normal:{show:true,textStyle:{fontSize:14},position:"right"}}
				}
			]
	};
	
	
    // 使用刚指定的配置项和数据显示图表。
    myChart_bar.setOption(option_bar);
	myChart_pie.setOption(option_pie);
	myChart_hj.setOption(option_hj);
	myChart_mz.setOption(option_mz);
	myChart_rx.setOption(option_rx);
	myChart_jd.setOption(option_jd);
}

        
		
		