

angular.module('timeline.controller',[])

.controller('timelineCtrl',function($scope,Timeline,view,$element){
	var $s=$scope;

	$s.periodHeight=30;
	$s.zoom=.3;
	$s.bias=0;
	$s.totalWidth=0;

	// $s.timelines=timelines;

	// $s.mousemove=function(e){
	// 	// console.log($element);
	// 	$s.mouseX=e.pageX-$element[0].offsetLeft;
	// 	$s.mouseY=e.pageY-$element[0].offsetTop;
	// 	$s.mouseTime=Math.floor($s.mouseX/view.zoom+timeline.min);
	// }

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

	$s.optionTimelineChange=function(checked){
		if(checked){
			$s.areas.push(this.timeline);
			if($s.bias<-this.timeline.min){
				$s.bias=-this.timeline.min;
			}
			if($s.totalWidth<this.timeline.span){
				$s.totalWidth=this.timeline.span;
			}
			console.log($s.areas);
		}
		else{
			$s.areas.splice($s.areas.indexOf(this.timeline),1);
		}
	}


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



































