

angular.module('timeline',[])
.controller('ctrl',function($scope){
	var $s=$scope;

	$s.zoom=0.3;
	$s.periodHeight=30;

	// var timeline={
	// 	'夏朝':{from:-2100,to:-1600},
	// 	'商朝':{from:-1600,to:-1050},
	// 	'周朝':{from:-1046,to:-256},
	// 	'秦朝':{from:-221,to:-206},
	// 	'汉朝':{from:-206,to:220},
	// 	'晋朝':{from:265,to:420},
	// 	'隋朝':{from:581,to:618},
	// 	'唐朝':{from:618,to:906},
	// 	'宋朝':{from:960,to:1279},
	// 	'元朝':{from:1279,to:1368},
	// 	'明朝':{from:1368,to:1644},
	// 	'清朝':{from:1644,to:1912}
	// }

	var timeline={//sjudo
		data:[
			{name:'商朝',from:-1600,to:-1050},
			{name:'秦朝',from:-1100,to:-228},
			{name:'唐朝',from:618,to:906},
			{name:'汉朝',from:-206,to:220},
			{name:'夏朝',from:-2100,to:-1500},
			{name:'周朝',from:-1846,to:-256},
			{name:'晋朝',from:265,to:420},
			{name:'隋朝',from:581,to:638},
			{name:'元朝',from:1279,to:1368},
			{name:'明朝',from:1368,to:1700},
			{name:'清朝',from:1644,to:1912},
			{name:'宋朝',from:960,to:1279}
		]
	}

	timeline.data.sort(function(a,b){return a.from-b.from});//排序


	for(var i=0;i<timeline.data.length;i++){//算出各项参数
		var period=timeline.data[i];
		if(!timeline.min){
			timeline.min=period.from;
		}
		else{
			if(period.from<timeline.min){
				timeline.min=period.from;
			}
		}
		period.span=period.to-period.from;
		period.color='rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+',0.5)';
		period.row=0;
	}

	function setRow(row){
		// var thisRowPeriods=[];
		// for(var i=1;i<timeline.data.length;i++){
		// 	if(timeline.data[i].row==row){
		// 		thisRowPeriods.
		// 	}

		var isCollide=false;
		var j;
		debugger;
		for(var i=0;i<timeline.data.length-1;i++){
			if(timeline.data[i].row<row){
				continue;
			}
			else{
				j=i;
			}
			if(timeline.data[i+1].from<timeline.data[j].to){
				timeline.data[i+1].row++;
				isCollide=true;
			}
		}
		if(isCollide){
			debugger;
			setRow(++row);
		}
	}
	setRow(0);


	if(timeline.min<0){
		$s.bias=-timeline.min;
	}
	else{
		$s.bias=0;
	}

	console.log(timeline);
	$s.timeline=timeline;

})