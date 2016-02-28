

angular.module('timeline.controller',[])

.controller('timelineCtrl',function($scope,timeline,view,$element){
	var $s=$scope;

	$s.mousemove=function(e){
		// console.log($element);
		$s.mouseX=e.pageX-$element[0].offsetLeft;
		$s.mouseY=e.pageY-$element[0].offsetTop;
		$s.mouseTime=Math.floor($s.mouseX/view.zoom+timeline.min);
	}

})

.controller('areaCtrl',function($scope,timeline,view,$element){
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
	function setColor(data){
		for(var i=0;i<data.length;i++){
			data[i].color='rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+',0.5)';
		}
	}

	//rows
	function getRows(data){
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
		return rows;
	}

	//begin test add 朝代 data
	var tempData=angular.copy(data);
	for(var i=0;i<tempData.length;i++){
		console.log(1);
		if(
			tempData[i].name=='三国'
			||tempData[i].name=='五代'
			||tempData[i].name=='十国'
		){
			data=data.concat(tempData[i].timeline.data);
		}
	}
	//end test add 朝代 data

	data.sort(function(a,b){return a.from-b.from});//排序

	for(var i=0;i<data.length;i++){//算出各项参数
		var period=data[i];
		if(!min){
			var min=period.from;
		}
		else{
			if(period.from<min){
				min=period.from;
			}
		}
		if(!max){
			var max=period.to;
		}
		else{
			if(period.to>max){
				max=period.to;
			}
		}
		period.span=period.to-period.from;
	}

	setColor(data);
	$s.rows=getRows(data);

	$s.periodMouseenter=function(e){
		// console.log(e);
		// console.log(e.currentTarget);
		// console.log(e.target);
		// console.log(this);
		// if(e.target!=e.currentTarget){
		// 	return;
		// }
		var period=e.currentTarget;
		var name=jq(period).find('.area_name')[0];
		var nameTextNode=name.childNodes[0];
		// console.log(period.clientWidth);
		// console.log(name.clientWidth);
		// console.log('');
		period.style.borderColor='red';
		period.style.outline='solid 1px red';
		if(nameTextNode.clientWidth>period.clientWidth){
			name.style.top='-35px';
			nameTextNode.style.backgroundColor='white';
			// name.style.display='none';
		}
		// debugger;
	}
	$s.periodMouseleave=function(e){
		var period=e.currentTarget;
		var name=jq(period).find('.area_name')[0];
		var nameTextNode=name.childNodes[0];
		period.style.borderColor='black';
		period.style.outline='none';
		name.style.top=0;
		nameTextNode.style.backgroundColor='transparent';
		// name.style.display='block';
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



































