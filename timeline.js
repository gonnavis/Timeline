var timelines=[
	{
		name:'主干'
		,data:[
			{name:'夏朝',from:-2000,to:-1500}
			,{name:'商朝',from:-1700,to:-1027}
			,{name:'周朝',from:-1066,to:-221}
			,{name:'春秋',from:-770,to:-476}
			,{name:'战国',from:-475,to:-221}
			,{name:'秦朝',from:-221,to:-207}
			,{name:'汉朝',from:-206,to:220}
			,{name:'新朝',from:8,to:23}
			,{name:'三国',from:220,to:280}
			,{name:'晋朝',from:265,to:420}
			,{name:'十六国',from:304,to:439}
			,{name:'南朝',from:420,to:588}
			,{name:'北朝',from:386,to:581}
			,{name:'隋朝',from:581,to:617}
			,{name:'唐朝',from:618,to:907}
			,{name:'武周',from:690,to:705}
			,{name:'五代',from:907,to:960}
			,{name:'十国',from:907,to:979}
			,{name:'宋朝',from:960,to:1279}
			,{name:'金',from:1115,to:1234}
			,{name:'元朝',from:1279,to:1368}
			,{name:'明朝',from:1368,to:1644}
			,{name:'清朝',from:1644,to:1911}
			// ,{name:'',from:,to:}
			// ,{name:'',from:,to:}
			// ,{name:'',from:,to:}
			// ,{name:'',from:,to:}
		]
	}
	,{
		name:'春秋战国'
		,data:[
			{name:'秦国',from:-900,to:-207}
			,{name:'吴国',from:-1046,to:-473}
			,{name:'齐国',from:-1046,to:-379}
			,{name:'鲁国',from:-1046,to:-256}
			,{name:'燕国',from:-1046,to:-221}
			,{name:'蔡国',from:-1046,to:-447}
			,{name:'曹国',from:-1046,to:-487}
			,{name:'陈国',from:-1046,to:-478}
			,{name:'卫国',from:-1040,to:-209}
			,{name:'宋国',from:-1040,to:-286}
			,{name:'晋国',from:-1033,to:-349}
			,{name:'楚国',from:-1046,to:-223}
			,{name:'越国',from:-2000,to:-306}
			,{name:'郑国',from:-806,to:-375}
			,{name:'魏国',from:-403,to:-225}
			,{name:'赵国',from:-403,to:-222}
			,{name:'韩国',from:-403,to:-230}
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
		name:'十六国'
		,data:[
			{name:'前凉',from:300,to:376}
			,{name:'南凉',from:397,to:414}
			,{name:'北凉',from:397,to:439}
			,{name:'西凉',from:400,to:421}
			,{name:'后凉',from:386,to:403}
			,{name:'前燕',from:307,to:370}
			,{name:'南燕',from:398,to:410}
			,{name:'后燕',from:384,to:407}
			,{name:'北燕',from:407,to:436}
			,{name:'前秦',from:351,to:394}
			,{name:'后秦',from:384,to:417}
			,{name:'西秦',from:385,to:431}
			,{name:'汉赵',from:304,to:329}
			,{name:'后赵',from:319,to:351}
			,{name:'成汉',from:304,to:347}
			,{name:'胡夏',from:407,to:431}
			,{name:'代',from:338,to:376}
			,{name:'西燕',from:384,to:394}
			,{name:'冉魏',from:350,to:352}
			,{name:'西蜀',from:405,to:413}
			,{name:'翟魏',from:388,to:392}
		]
	}
	,{
		name:'南朝'
		,data:[
			{name:'南朝宋',from:420,to:479}
			,{name:'南朝齐',from:479,to:502}
			,{name:'南朝梁',from:502,to:557}
			,{name:'南朝陈',from:557,to:589}
		]
	}
	,{
		name:'北朝'
		,data:[
			{name:'北魏',from:386,to:534}
			,{name:'东魏',from:534,to:550}
			,{name:'北齐',from:550,to:577}
			,{name:'西魏',from:535,to:556}
			,{name:'北周',from:557,to:581}
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
	,{
		name:'周边'
		,data:[
			{name:'鲜卑',from:200,to:600}
			,{name:'突厥',from:552,to:658}
			,{name:'吐蕃',from:700,to:1100}
			,{name:'回鹘',from:744,to:846}
			,{name:'高棉',from:802,to:1462}
			,{name:'蒙古',from:1206,to:1368}
			,{name:'大理',from:937,to:1253}
			,{name:'辽',from:916,to:1225}
			,{name:'西夏',from:1038,to:1227}
			,{name:'匈奴',from:-300,to:46}
		]
	}
	,{
		name:'中亚'
		,data:[
			{name:'苏美尔',from:-4000,to:-2000,englishName:''}
			,{name:'亚美尼亚',from:-95,to:-60,englishName:'Armenian Empire'}
			,{name:'安息波斯',from:-247,to:224,englishName:'Parthian Empire'}
			,{name:'阿契美尼德波斯',from:-650,to:-330,englishName:''}
			,{name:'阿卡德',from:-2350,to:-2150,englishName:''}
			,{name:'亚述',from:-1920,to:-609,englishName:''}
			,{name:'巴比伦',from:-1900,to:-1600,englishName:''}
			,{name:'埃兰波斯',from:-2700,to:-539,englishName:''}
			,{name:'以色列',from:-1050,to:-920,englishName:''}
			,{name:'赫梯',from:-1460,to:-1180,englishName:''}
			,{name:'尼西亚',from:1204,to:1261,englishName:''}
			,{name:'阿拉伯',from:632,to:661,englishName:''}
			,{name:'阿拔斯',from:750,to:1258,englishName:''}
			,{name:'萨珊波斯',from:224,to:642,englishName:''}
			,{name:'塞琉西',from:-323,to:-60,englishName:''}
			,{name:'塞尔柱土耳其',from:1037,to:1194,englishName:''}
			,{name:'帖木儿',from:1401,to:1505,englishName:''}
			,{name:'萨非',from:1501,to:1736,englishName:''}
			,{name:'奥斯曼',from:1299,to:1923,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
		]
	}
	,{
		name:'欧洲'
		,data:[
			{name:'罗马帝国',from:-27,to:476,englishName:''}
			,{name:'罗马共和国',from:-509,to:-27,englishName:''}
			,{name:'西罗马帝国',from:395,to:476,englishName:''}
			,{name:'拜占庭',from:330,to:1453,englishName:''}
			,{name:'神圣罗马帝国',from:962,to:1806,englishName:''}
			,{name:'法兰克王国',from:250,to:950,englishName:''}
			,{name:'葡萄牙王国',from:1415,to:1999,englishName:'Portuguese Empire'}
			,{name:'西班牙王国',from:1402,to:1975,englishName:'Spanish Empire'}
			,{name:'古希腊',from:-800,to:-146,englishName:''}
			,{name:'俄罗斯帝国',from:1721,to:1917,englishName:''}
			,{name:'马其顿',from:-338,to:-309,englishName:''}
			,{name:'高卢',from:260,to:274,englishName:''}
			,{name:'奥匈帝国',from:1867,to:1918,englishName:''}
			,{name:'雅典帝国',from:-477,to:-431,englishName:''}
			,{name:'奥地利帝国',from:1804,to:1867,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
		]
	}
	,{
		name:'非洲'
		,data:[
			{name:'埃及帝国',from:-1570,to:-1070,englishName:'Egyptian Empire'}
			,{name:'古埃及',from:-3200,to:-343,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
			// ,{name:'',from:,to:,englishName:''}
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