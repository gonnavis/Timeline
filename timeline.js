var timelines=[
	{
		name:'主干'
		,data:[
			{name:'夏朝',from:-2000,to:-1500}
			,{name:'商朝',from:-1700,to:-1027}
			,{name:'周朝',from:-1066,to:-221}
			,{name:'秦朝',from:-221,to:-207}
			,{name:'汉朝',from:-206,to:220}
			,{name:'三国',from:220,to:280}
			,{name:'晋朝',from:265,to:420}
			,{name:'南朝',from:420,to:588}
			,{name:'北朝',from:386,to:588}
			,{name:'隋朝',from:581,to:617}
			,{name:'唐朝',from:618,to:907}
			,{name:'五代',from:907,to:960}
			,{name:'十国',from:907,to:979}
			,{name:'宋朝',from:960,to:1279}
			,{name:'辽',from:916,to:1225}
			,{name:'西夏',from:1038,to:1227}
			,{name:'金',from:1115,to:1234}
			,{name:'元朝',from:1279,to:1368}
			,{name:'明朝',from:1368,to:1644}
			,{name:'清朝',from:1644,to:1911}
		]
	}
	,{
		name:'三国'
		,data:[
			{name:'曹魏',from:220,to:266}
			,{name:'蜀汉',from:221,to:263}
			,{name:'孙吴',from:229,to:280}
		]
	}
	,{
		name:'五代'
		,data:[
			{name:'后梁',from:907,to:923}
			,{name:'后唐',from:923,to:936}
			,{name:'后晋',from:936,to:947}
			,{name:'后汉',from:947,to:951}
			,{name:'后周',from:951,to:960}
		]
	}
	,{
		name:'十国'
		,data:[
			{name:'前蜀',from:907,to:925}
			,{name:'后蜀',from:934,to:965}
			,{name:'南吴',from:902,to:937}
			,{name:'南唐',from:937,to:975}
			,{name:'吴越国',from:907,to:978}
			,{name:'闽国',from:909,to:945}
			,{name:'南楚',from:896,to:951}
			,{name:'南汉',from:917,to:971}
			,{name:'南平',from:907,to:963}
			,{name:'北汉',from:951,to:979}
		]
	}
]

// var processTimelines=function(timelines){ // turn timelines from array to object
// 	var tempTimelines=angular.copy(timelines);
// 	timelines={};
// 	for(var i=0;i<tempTimelines.length;i++){
// 		timelines['i']=tempTimelines[i];
// 	}
// }

// console.log(timelines);