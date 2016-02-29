

angular.module('timeline.controller',[])

.controller('timelineCtrl',function($scope,Timeline,view,$element){
	var $s=$scope;

	$s.periodHeight=30;
	$s.zoom=0.3;
	$s.bias=0;
	$s.totalWidth=0;
	$s.min;

	$s.mousemove=function(e){
		// console.log($element);
		$s.mouseX=e.pageX-$element[0].offsetLeft;
		$s.mouseY=e.pageY-$element[0].offsetTop;
		$s.mouseTime=Math.floor($s.mouseX/$s.zoom+$s.min);
	}

	$s.timelines=timelines;

	$s.areas=[];
	// $s.areas[0]=Timeline.fn.processTimeline(timelines[0]);
	// // $s.areas.push(timeline);
	// console.log($s.areas);
	// // console.log($s.timeline);

	// //set bias
	// if($s.areas[0].min<0){
	// 	$s.bias=-$s.areas[0].min;
	// }
	// else{
	// 	$s.bias=0;
	// }

	//fn
	$s.addTimeline=function(timeline){
		$s.areas.push(timeline);
		if($s.bias<-timeline.min){
			$s.bias=-timeline.min;
		}
		if($s.totalWidth<timeline.span){
			$s.totalWidth=timeline.span;
		}
		if($s.min){
			if(timeline.min<$s.min){
				$s.min=timeline.min;
			}
		}
		else{
			$s.min=timeline.min;
		}
	}
	$s.removeTimeline=function(timeline){
		$s.areas.splice($s.areas.indexOf(timeline),1);
	}
	$s.zoomOut=function(){
		if($s.zoom<=0.1){
			return;
		}
		$s.zoom=(Math.round($s.zoom*10-1)*0.1).toFixed(1);
	}
	$s.zoomIn=function(){
		$s.zoom=(Math.round($s.zoom*10+1)*0.1).toFixed(1);
	}

	//event
	$s.optionTimelineChange=function(checked){
		if(checked){
			$s.addTimeline(this.timeline);
		}
		else{
			$s.removeTimeline(this.timeline);
		}
	}
	$s.periodMouseenter=function(e){
		// console.log(e);
		// console.log(e.currentTarget);
		// console.log(e.target);
		// console.log(this);
		// if(e.target!=e.currentTarget){
		// 	return;
		// }
		var period=e.currentTarget;
		var name=jq(period).find('.name')[0];
		var nameTextNode=name.childNodes[0];
		// console.log(period.clientWidth);
		// console.log(name.clientWidth);
		// console.log('');
		period.style.borderColor='red';
		period.style.outline='solid 1px red';
		if(nameTextNode.clientWidth>period.clientWidth){
			name.style.top='-45px';
			// name.style.left='-100px';
			nameTextNode.style.backgroundColor='white';
			// name.style.display='none';
		}
		// debugger;
	}
	$s.periodMouseleave=function(e){
		var period=e.currentTarget;
		var name=jq(period).find('.name')[0];
		var nameTextNode=name.childNodes[0];
		period.style.borderColor='black';
		period.style.outline='none';
		name.style.top=0;
		// name.style.left=0;
		nameTextNode.style.backgroundColor='transparent';
		// name.style.display='block';
	}

	//init
	$s.addTimeline(timelines[0]);
	timelines[0].checked=true;


})

// .controller('areaCtrl',function($scope,Timeline,view,$element){


// })

// .controller('rulerCtrl',function($scope,Timeline,view){
	// var $s=$scope;		

	// var bars=[];
	// for(var i=0;i<timeline.span*view.zoom/4;i++){
	// 	var bar={};
	// 	if(i%10==0){
	// 		bar.type=3;
	// 	}
	// 	else if(i%5==0){
	// 		bar.type=2;
	// 	}
	// 	else{
	// 		bar.type=1;
	// 	}
	// 	bars.push(bar);
	// }
	// $s.bars=bars;
// })

// .controller('controlCtrl',function($scope,Timeline,view){
	// var $s=$scope;

	// timeline.getTimeline()
// })



































