

angular.module('timeline.controller',[])

.controller('timelineCtrl',function($scope,timeline,view,$element){
	var $s=$scope;

	$s.zoom=view.zoom;
	$s.bias;
	$s.rows;
	$s.min=timeline.min;
	$s.max=timeline.max;
	$s.periodHeight=30;
	$s.mouseX=0;

	var min=timeline.min;
	var max=timeline.max;
	var data=angular.copy(timeline.data);

	//set bias
	var bias;
	if(min<0){
		bias=-min;
	}
	else{
		bias=0;
	}
	$s.bias=bias;

	//set color
	for(var i=0;i<data.length;i++){
		data[i].color='rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+',0.5)';
	}

	//set rows
	var rows=[];
	function setRow(row){
		var arr=[];
		arr.push(data.splice(0,1)[0]);
		var length=data.length;
		for(var i=0;i<length;){
			if(data[i].from>=arr[arr.length-1].to){
				arr.push(data.splice(i,1)[0]);
				length--;
			}
			else{
				i++;
			}
		}
		rows.push(arr);
		if(data.length>0){
			setRow(++row);
		}
	}
	setRow(0);
	$s.rows=rows;

	$s.mousemove=function(e){
		// console.log($element);
		$s.mouseX=e.pageX-$element[0].offsetLeft;
		$s.mouseY=e.pageY-$element[0].offsetTop;
		$s.time=Math.floor($s.mouseX/view.zoom+timeline.min);
	}

})

.controller('rulerCtrl',function($scope,timeline,view){
	var $s=$scope;		

	var bars=[];
	for(var i=0;i<timeline.span*view.zoom/4;i++){
		var bar={};
		if(i%10==0){
			bar.type=3;
		}
		else if(i%5==0){
			bar.type=2;
		}
		else{
			bar.type=1;
		}
		bars.push(bar);
	}
	$s.bars=bars;
})

.controller('controlCtrl',function($scope,timeline,view){
	var $s=$scope;

	timeline.getTimeline()
})



































