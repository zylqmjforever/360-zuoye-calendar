;(function (root) {
	//日历工具
	var calendarUtl={
		/*
		*	基本的农历，节气，天干，地支等数据 BASEDATA
		*
		*/
		BASEDATA:{
			lunarInfo:[0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,//1900-1909
			0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,//1910-1919
			0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,//1920-1929
			0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,//1930-1939
			0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,//1940-1949
			0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,//1950-1959
			0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,//1960-1969
			0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,//1970-1979
			0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,//1980-1989
			0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,//1990-1999
			0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,//2000-2009
			0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,//2010-2019
			0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,//2020-2029
			0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,//2030-2039
			0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,//2040-2049
			0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50, 0x06b20,0x1a6c4,0x0aae0,//2050-2059
			0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,//2060-2069
			0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,//2070-2079
			0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,//2080-2089
			0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,//2090-2099
			0x0d520],
			Gan:["\u7532","\u4e59","\u4e19","\u4e01","\u620a","\u5df1","\u5e9a","\u8f9b","\u58ec","\u7678"],
			Zhi:["\u5b50","\u4e11","\u5bc5","\u536f","\u8fb0","\u5df3","\u5348","\u672a","\u7533","\u9149","\u620c","\u4ea5"],
			Animals:["\u9f20","\u725b","\u864e","\u5154","\u9f99","\u86c7","\u9a6c","\u7f8a","\u7334","\u9e21","\u72d7","\u732a"],
			solarTerm:["\u5c0f\u5bd2","\u5927\u5bd2","\u7acb\u6625","\u96e8\u6c34","\u60ca\u86f0","\u6625\u5206","\u6e05\u660e","\u8c37\u96e8","\u7acb\u590f","\u5c0f\u6ee1","\u8292\u79cd","\u590f\u81f3","\u5c0f\u6691","\u5927\u6691","\u7acb\u79cb","\u5904\u6691","\u767d\u9732","\u79cb\u5206","\u5bd2\u9732","\u971c\u964d","\u7acb\u51ac","\u5c0f\u96ea","\u5927\u96ea","\u51ac\u81f3"],
			sTermInfo:[	'9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',
				'97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
				'97bcf97c359801ec95f8c965cc920f','97bd0b06bdb0722c965ce1cfcc920f','b027097bd097c36b0b6fc9274c91aa',
				'97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',	'97bd0b06bdb0722c965ce1cfcc920f',
				'b027097bd097c36b0b6fc9274c91aa','9778397bd19801ec9210c965cc920e','97b6b97bd19801ec95f8c965cc920f',
				'97bd09801d98082c95f8e1cfcc920f','97bd097bd097c36b0b6fc9210c8dc2','9778397bd197c36c9210c9274c91aa',
				'97b6b97bd19801ec95f8c965cc920e','97bd09801d98082c95f8e1cfcc920f',	'97bd097bd097c36b0b6fc9210c8dc2',
				'9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec95f8c965cc920e','97bcf97c3598082c95f8e1cfcc920f',
				'97bd097bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e',
				'97bcf97c3598082c95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
				'97b6b97bd19801ec9210c965cc920e','97bcf97c3598082c95f8c965cc920f',	'97bd097bd097c35b0b6fc920fb0722',
				'9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',
				'97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
				'97bcf97c359801ec95f8c965cc920f','97bd097bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa',
				'97b6b97bd19801ec9210c965cc920e','97bcf97c359801ec95f8c965cc920f',	'97bd097bd07f595b0b6fc920fb0722',
				'9778397bd097c36b0b6fc9210c8dc2','9778397bd19801ec9210c9274c920e','97b6b97bd19801ec95f8c965cc920f',
				'97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
				'97b6b97bd19801ec95f8c965cc920f','97bd07f5307f595b0b0bc920fb0722','7f0e397bd097c36b0b6fc9210c8dc2',
				'9778397bd097c36c9210c9274c91aa','97b6b97bd19801ec9210c965cc920e','97bd07f1487f595b0b0bc920fb0722',
				'7f0e397bd097c36b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
				'97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
				'97b6b97bd19801ec9210c965cc920e','97bcf7f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
				'9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e','97bcf7f1487f531b0b0bb0b6fb0722',
				'7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b97bd19801ec9210c965cc920e',
				'97bcf7f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b6fc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
				'97b6b97bd19801ec9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
				'9778397bd097c36b0b6fc9210c91aa','97b6b97bd197c36c9210c9274c920e','97bcf7f0e47f531b0b0bb0b6fb0722',
				'7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','9778397bd097c36c9210c9274c920e',
				'97b6b7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722',	'7f0e397bd097c36b0b6fc9210c8dc2',
				'9778397bd097c36b0b70c9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
				'7f0e397bd097c35b0b6fc9210c8dc2','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
				'7f0e27f1487f595b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
				'97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
				'9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
				'7f0e397bd097c35b0b6fc920fb0722','9778397bd097c36b0b6fc9274c91aa','97b6b7f0e47f531b0723b0b6fb0721',
				'7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',	'9778397bd097c36b0b6fc9274c91aa',
				'97b6b7f0e47f531b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
				'9778397bd097c36b0b6fc9210c91aa','97b6b7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
				'7f0e397bd07f595b0b0bc920fb0722','9778397bd097c36b0b6fc9210c8dc2','977837f0e37f149b0723b0787b0721',
				'7f07e7f0e47f531b0723b0b6fb0722','7f0e37f5307f595b0b0bc920fb0722','7f0e397bd097c35b0b6fc9210c8dc2',
				'977837f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0721','7f0e37f1487f595b0b0bb0b6fb0722',
				'7f0e397bd097c35b0b6fc9210c8dc2','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
				'7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722','977837f0e37f14998082b0787b06bd',
				'7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd097c35b0b6fc920fb0722',
				'977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722',
				'7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
				'7f0e27f1487f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',	'977837f0e37f14998082b0787b06bd',
				'7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0b0bb0b6fb0722','7f0e397bd07f595b0b0bc920fb0722',
				'977837f0e37f14998082b0723b06bd','7f07e7f0e37f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
				'7f0e397bd07f595b0b0bc920fb0722','977837f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b0721',
				'7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f595b0b0bb0b6fb0722','7f0e37f0e37f14898082b0723b02d5',
				'7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722','7f0e37f1487f531b0b0bb0b6fb0722',
				'7f0e37f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
				'7f0e37f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35','7ec967f0e37f14998082b0787b06bd',
				'7f07e7f0e47f531b0723b0b6fb0721','7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e37f14898082b072297c35',
				'7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',	'7f0e27f1487f531b0b0bb0b6fb0722',
				'7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f149b0723b0787b0721',
				'7f0e27f1487f531b0b0bb0b6fb0722','7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14998082b0723b06bd',
				'7f07e7f0e47f149b0723b0787b0721','7f0e27f0e47f531b0723b0b6fb0722','7f0e37f0e366aa89801eb072297c35',
				'7ec967f0e37f14998082b0723b06bd','7f07e7f0e37f14998083b0787b0721','7f0e27f0e47f531b0723b0b6fb0722',
				'7f0e37f0e366aa89801eb072297c35','7ec967f0e37f14898082b0723b02d5','7f07e7f0e37f14998082b0787b0721',
				'7f07e7f0e47f531b0723b0b6fb0722','7f0e36665b66aa89801e9808297c35',	'665f67f0e37f14898082b0723b02d5',
				'7ec967f0e37f14998082b0787b0721','7f07e7f0e47f531b0723b0b6fb0722',	'7f0e36665b66a449801e9808297c35',
				'665f67f0e37f14898082b0723b02d5','7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',
				'7f0e36665b66a449801e9808297c35','665f67f0e37f14898082b072297c35',	'7ec967f0e37f14998082b0787b06bd',
				'7f07e7f0e47f531b0723b0b6fb0721','7f0e26665b66a449801e9808297c35',	'665f67f0e37f1489801eb072297c35',
				'7ec967f0e37f14998082b0787b06bd','7f07e7f0e47f531b0723b0b6fb0721',	'7f0e27f1487f531b0b0bb0b6fb0722'],
			nStr1:["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341"],
			nStr2:["\u521d","\u5341","\u5eff","\u5345"],
			nStr3:["\u6b63","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03","\u516b","\u4e5d","\u5341","\u51ac","\u814a"]
		},
		/*
		*	是否为闰年
		*
		*/
		lYearDays:function(y) {
			var i, sum = 348;
			for(i=0x8000; i>0x8; i>>=1) { sum += (calendarUtl.BASEDATA.lunarInfo[y-1900] & i)? 1: 0; }
			return(sum+calendarUtl.leapDays(y));
		},
		/*
		*	是否为闰月
		*
		*/
		leapMonth:function(y) { 
			return(calendarUtl.BASEDATA.lunarInfo[y-1900] & 0xf);
		},
		/*
		*	是否为闰年
		*
		*/
		leapDays:function(y) {
			if(calendarUtl.leapMonth(y))  { 
				return((calendarUtl.BASEDATA.lunarInfo[y-1900] & 0x10000)? 30: 29); 
			}
			return(0);
		},
		/*
		*	某年某月共有多少天
		*
		*/
		monthDays:function(y,m) {
			if(m>12 || m<1) {return -1}//月份参数从1至12，参数错误返回-1
			return( (calendarUtl.BASEDATA.lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
		},
		/*
		*	根据偏离年数计算天干地支
		*
		*/
		toGanZhi:function(offset) {
			return(calendarUtl.BASEDATA.Gan[offset%10]+calendarUtl.BASEDATA.Zhi[offset%12]);
		},
		/*
		*	计算某年第n个节气是什么
		*
		*/
		getTerm:function(y,n) {
			if(y<1900 || y>2100) {return -1;}
			if(n<1 || n>24) {return -1;}
			y=Number(y);
			var _table = calendarUtl.BASEDATA.sTermInfo[y-1900];
			var _info = [
				parseInt('0x'+_table.substr(0,5)).toString() ,
				parseInt('0x'+_table.substr(5,5)).toString(),
				parseInt('0x'+_table.substr(10,5)).toString(),
				parseInt('0x'+_table.substr(15,5)).toString(),
				parseInt('0x'+_table.substr(20,5)).toString(),
				parseInt('0x'+_table.substr(25,5)).toString()
			];
			var _calday = [
				_info[0].substr(0,1),
				_info[0].substr(1,2),
				_info[0].substr(3,1),
				_info[0].substr(4,2),
				
				_info[1].substr(0,1),
				_info[1].substr(1,2),
				_info[1].substr(3,1),
				_info[1].substr(4,2),
				
				_info[2].substr(0,1),
				_info[2].substr(1,2),
				_info[2].substr(3,1),
				_info[2].substr(4,2),
				
				_info[3].substr(0,1),
				_info[3].substr(1,2),
				_info[3].substr(3,1),
				_info[3].substr(4,2),
				
				_info[4].substr(0,1),
				_info[4].substr(1,2),
				_info[4].substr(3,1),
				_info[4].substr(4,2),
				
				_info[5].substr(0,1),
				_info[5].substr(1,2),
				_info[5].substr(3,1),
				_info[5].substr(4,2),
			];
			return parseInt(_calday[n-1]);
		},
		/*
		*	数字转化为中国的月份
		*
		*/
		toChinaMonth:function(m) { // 月 => \u6708
			if(m>12 || m<1) {return -1} 
			var s = calendarUtl.BASEDATA.nStr3[m-1];
			s+= "\u6708";//加上月字
			return s;
		},
		/*
		*	转化为农历的天数，2=>初二
		*
		*/
		toChinaDay:function(d){ //日 => \u65e5
			var s;
			switch (d) {
				case 10:
				s = '\u521d\u5341'; break;
			case 20:
				s = '\u4e8c\u5341'; break;
				break;
			case 30:
				s = '\u4e09\u5341'; break;
				break;
			default :
				s = calendarUtl.BASEDATA.nStr2[Math.floor(d/10)];
				s += calendarUtl.BASEDATA.nStr1[d%10];
			}
			return(s);
		},
		// 计算生肖
		getAnimal: function(y) {
			return calendarUtl.BASEDATA.Animals[(y - 4) % 12]
		},
		solar2lunar:function (y,m,d) { //参数区间1900.1.31~2100.12.31
		 var lFtv = new Array("0101*春节","0115 元宵节","0505 端午节","0707 七夕情人节","0715 中元节","0815 中秋节","0909 重阳节","1208 腊八节","1224 小年","0100*除夕");
         var sFtv = new Array("0101*元旦","0214 情人节","0308 妇女节","0312 植树节","0315 消费者权益日","0401 愚人节","0501 劳动节","0504 青年节","0512 护士节","0601 儿童节","0701 建党节","0801 建军节","0910 教师节","1001*国庆节",
            "1006 老人节","1024 联合国日","1225 圣诞节");
		if(y<1900 || y>2100) {return -1;}
		if(y==1900&&m==1&&d<31) {return -1;}
		if(!y) { 
			var objDate = new Date();
		}else {
			var objDate = new Date(y,parseInt(m)-1,d)
		}
		var i, leap=0, temp=0;
		
		var y = objDate.getFullYear(),m = objDate.getMonth()+1,d = objDate.getDate();
		var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;
		for(i=1900; i<2101 && offset>0; i++) { temp=calendarUtl.lYearDays(i); offset-=temp; }
		if(offset<0) { offset+=temp; i--; }
		
		//是否今天
		var isTodayObj = new Date(),isToday=false;
		if(isTodayObj.getFullYear()==y && isTodayObj.getMonth()+1==m && isTodayObj.getDate()==d) {
			isToday = true;
		}
		//星期几
		var nWeek = objDate.getDay(),cWeek = calendarUtl.BASEDATA.nStr1[nWeek];
		if(nWeek==0) {nWeek =7;}
		//农历年
		var year = i;
		
		var leap = calendarUtl.leapMonth(i); //闰月
		var isLeap = false;
		
		//效验闰月
		for(i=1; i<13 && offset>0; i++) {
			//闰月
			if(leap>0 && i==(leap+1) && isLeap==false){ 
				--i;
				isLeap = true; temp = calendarUtl.leapDays(year); //计算农历闰月天数
			}
			else{
				temp = calendarUtl.monthDays(year, i);//计算农历普通月天数
			}
		
			if(isLeap==true && i==(leap+1)) { isLeap = false; }
			offset -= temp;
		}
		
		if(offset==0 && leap>0 && i==leap+1)
		if(isLeap){
			isLeap = false;
		}else{ 
			isLeap = true; --i;
		}
		if(offset<0){ offset += temp; --i; }
		//农历月
		var month 	= i;
		//农历日
		var day 		= offset + 1;
		
		//天干地支处理
		var sm 		= 	m-1;
		var term3	=	calendarUtl.getTerm(year,3); //该农历年立春日期
		var gzY 		= 	calendarUtl.toGanZhi(year-4);//普通按年份计算，下方尚需按立春节气来修正
		
		//依据立春日进行修正gzY
		if(sm<2 && d<term3) {
			gzY = calendarUtl.toGanZhi(year-5);
		}else {
			gzY = calendarUtl.toGanZhi(year-4);
		}
		
		//月柱 1900年1月小寒以前为 丙子月(60进制12)
		var firstNode 	= calendarUtl.getTerm(y,(m*2-1));//返回当月「节」为几日开始
		var secondNode = calendarUtl.getTerm(y,(m*2));//返回当月「节」为几日开始
		
		//依据12节气修正干支月
		var gzM 	= 	calendarUtl.toGanZhi((y-1900)*12+m+11);
		if(d>=firstNode) {
			gzM 	= 	calendarUtl.toGanZhi((y-1900)*12+m+12);
		}
		
		//传入的日期的节气与否
		var isTerm = false;
		var Term = null;
		if(firstNode==d) {
			isTerm 	= true;
			Term 	= calendarUtl.BASEDATA.solarTerm[m*2-2];
		}
		if(secondNode==d) {
			isTerm 	= true;
			Term 	= calendarUtl.BASEDATA.solarTerm[m*2-1];
		}
		//日柱 当月一日与 1900/1/1 相差天数
		var dayCyclical = Date.UTC(y,sm,1,0,0,0,0)/86400000+25567+10;
		var gzD = calendarUtl.toGanZhi(dayCyclical+d-1);
		var lunarFestival=null,solarFestival=null,tmp1,tmp2;
		//农历节日
              for(var i in lFtv)
              if(lFtv[i].match(/^([\d]{2})([\d]{2})([\s*])(.+)/g)) {
               tmp1=Number(RegExp.$1)-month;
               tmp2=Number(RegExp.$2)-day;
               if(tmp1==0 && tmp2==0) lunarFestival=RegExp.$4
              }
              //国历节日
              for(var i in sFtv)
              if(sFtv[i].match(/^([\d]{2})([\d]{2})([\s*])(.+)/g)){
               tmp1=Number(RegExp.$1)-(m);
               tmp2=Number(RegExp.$2)-d;
               if(tmp1==0 && tmp2==0) solarFestival = RegExp.$4
              }
		
		return {'lYear':year,'lMonth':month,'lDay':day,'Animal':calendarUtl.getAnimal(year),'IMonthCn':(isLeap?"\u95f0":'')+calendarUtl.toChinaMonth(month),'IDayCn':calendarUtl.toChinaDay(day),'cYear':y,'cMonth':m,'cDay':d,'gzYear':gzY,'gzMonth':gzM,'gzDay':gzD,'isToday':isToday,'isLeap':isLeap,'nWeek':nWeek,'ncWeek':"\u661f\u671f"+cWeek,'isTerm':isTerm,'Term':Term,'lunarFestival':lunarFestival,'solarFestival':solarFestival};
		},	
	
	
		allDaysYearMonth:function (y,m) {
			
		},
		//对输入年，月，日范围验证，规定年1990-2100，月1-12，日1-31，无输入默认返回当天时间。
		formatYMD:function (y,m,d) {
			var self = this;
			var t = new Date();
			var Year = t.getFullYear();
			var Month = t.getMonth()+1;
			var Day = t.getDate();

			y = y&&parseInt(y,10);
			m = m&&parseInt(m,10);
			d =d&&parseInt(d,10);
			var flag = /^(19|20)\d{2}$|^2100$/.test(y)&&/^0?[1-9]$|^1[0-2]$/.test(m)&&/^0?\d$|^[1-2]\d$|^30$/.test(d);
			Year = String(Year);
			// Month1 = String(Month).length==1?'0'+Month:Month;
			Day = String(Day).length==1?'0'+Day:Day;
			var lunarObj = self.solar2lunar(Year, Month, Day);
			var lm = lunarObj.IMonthCn;
			var ld = lunarObj.IDayCn;
			var ganziNYD = lunarObj.gzYear+'年'+lunarObj.gzMonth+'月'+lunarObj.gzDay +'日';
			var obj = {
				y:Year,
				m:Month,
				d:Day,
				fullDate:Year +'-'+(String(Month).length>1?Month:'0'+Month)+'-'+(String(Day).length>1?Day:'0'+Day),
				currentDate:String(Day).length>1?Day:'0'+Day,
				lunarMonthDate:'农历'+lm+ld,
				ganziNYD:ganziNYD

			};
			if (!!flag) {
				return {
					y:y,
					m:m,
					d:d
				};	
			} else{
				return obj;
			}
		},
		//生成某年某月的二维数组，元素为日期所有属性的对象自面量，该函数为核心
		tableDataYearMonth:function (y,m) {
			var totalDays = this.totalDaysOfYearMonth(y, m);//总天数
			var weeks = Math.ceil(totalDays/7+1);//周数
			var firstDay = this.firstDayOfYearMonth(y, m);//第一天是周几
			var results = [];
			var solarTolunar = this.solar2lunar;
			for(var i=0;i<weeks;i++){
				var tmp = [];
				for(var j = 1;j<8;j++){

					var t = i*7 + j - firstDay;
					var flag = (t>0)&&(t<=totalDays);
					var tDateBase = new Date(y,m-1,t);
					var tDate = tDateBase.getDate();
					var tMonth = Number(tDateBase.getMonth()+1);
					var tYear = tDateBase.getFullYear();
					var tWeek = tDateBase.getDay();
					var lunarObj = solarTolunar(tYear,tMonth,tDate);
					var lm = lunarObj.IMonthCn;
					var ld = lunarObj.solarFestival||lunarObj.lunarFestival||lunarObj.IDayCn;
					var ganziNYD = lunarObj.gzYear+'年'+lunarObj.gzMonth+'月'+lunarObj.gzDay +'日';
					var animalYear = lunarObj.Animal +'年';
					var lw = lunarObj.ncWeek;
					var lunarMonthDate = '农历'+lm+ld;
					var fulldate = tYear +'-'+(String(tMonth).length>1?tMonth:'0'+tMonth)+'-'+(String(tDate).length>1?tDate:'0'+tDate);
					tmp.push({
						y:tYear,
						m:tMonth,
						d:tDate,
						w:tWeek,
						lm:lm,
						ld:ld,
						ganziNYD:ganziNYD,
						animalYear:animalYear,
						lw:lw,
						fulldate:fulldate,
						lunarMonthDate:lunarMonthDate,
						flag:flag
					})
				}
				results.push(tmp)
			}
			return results;
		},
		//字符串转化为数字
		str2Num :function (t) {
			return Number(t);
		},
		//数字转换为字符串
		num2Str:function(t) {
			return String(t);
		},
		//某年某月共有多少天
		totalDaysOfYearMonth:function (y,m) {
			var t = new Date(y,m,0);
			var days = t.getDate();
			return days;
		},
		//某年某月1号是星期几
		firstDayOfYearMonth:function(y,m) {
			var t = new Date(y,m-1,1);
			var firstDay = t.getDay();
			return firstDay;
		},
	};
	//选取节点
	function  $ (el) {
		var el = document.querySelectorAll(el);
		if (el.length==1) {
			return el[0];
		} else {
			return el;
		}
	};
	//实现jquery append
	function append(ele, node){
		if(!ele || !node){ return; }

		if(typeof node === "object"){
			ele.appendChild(node);
			return ele;
		}

		node += "";
		var fragment = document.createDocumentFragment();
		var div = document.createElement("div");
		div.innerHTML = node;

		while(div.childNodes[0]){
			fragment.appendChild(div.childNodes[0]);
		}

		ele.appendChild(fragment);
		div = null;
		return ele;
	}
	//事件处理
	var EventUtl = {
		addEvent : function (el,eventType,cb) {
			if(el.addEventListener(eventType,cb,false)){
				el.addEventListener(eventType,cb,false);
			}else if(el.attachEvent){
				el.attachEvent(eventType,cb)
			}else{
				el['on'+eventType]=cb
			}
		}
	};
	//日历实现
	var calendar = {
		//页面dom标签提前声明
		config:{
			selectYearOpt : $("#yearOpt"),//select 年
			selectMonthOpt : $('#monthOpt'),//select 月
			tbody : $('#calendar tbody'),//表格主体tbody
			fulldate : $('.fullDate'),//
			currentDate : $('.currentDate'),//
			lunarMonthDate:$('.lunarMonthDate'),//
			gzYearMonDate:$('.gzYearMonDate')//
		},
		init:function (opts) {
			var defaults = {

			};
			 // opts = $.extend(defaults,opts);
			 this.create_header();
			 this.eventBind();
		},
		/*
		* 生成tbody主体函数
		* param y 年 2010
		* param m 月 1
		* 
		*/
		create_body:function(y,m) {
			var self = this;
			var preTag = '<tr class="tbl">';
			var nextTag = '</tr>'
			// 具体某年某月内所有的日期，二位数组，数组单元为对象自面量，包括所有基本日期属性
			var tableDataYearMonthArr = calendarUtl.tableDataYearMonth(y, m).reduce(function (pre,next) {
				return pre.concat(next);
			});
			console.log(calendarUtl.tableDataYearMonth(2016, 4))
			//生成表格html标签字符串数据，'<td class="..." date="..."></td>'
			var optsData = tableDataYearMonthArr.map(function (item) {
				var opt = {};
				opt.flag = item.flag;
				opt.class = !item.flag?'current':'none';
				opt.solar = item.d;
				opt.lunar = item.ld;
				opt.animal = item.animalYear;
				opt.ganziNYD = item.ganziNYD;
				opt.week = item.w;
				if(item.w==0||item.w==6){
					opt.class+=' week'
				}
				opt.lweek = item.lw;
				opt.fulldate = item.fulldate;
				opt.lunarMonthDate=item.lunarMonthDate;
				return opt;
			}).map(function (item,index) {
				var i = (index+1)%7;
				//对td 元素添加tr wrapper;
				switch(i){
					case 0:
						return  self.create_htmlTag(1, item)+ nextTag;
					break;
					case 1:
						return preTag + self.create_htmlTag(1, item);
					break;
					default:
						return self.create_htmlTag(1, item)
				}
				
			}).join(' ');
			// 渲染DOM 主体元素
			self.config.tbody.innerHTML=optsData;
			self.eventBind();
			// return optsData;
		},
		// 页面初始化函数，渲染具体header (年，月)，生成主体Body;

		create_header:function() {
			var self = this;
			// 当天日期相关属性对象（年，月，日，农历日期，天干地支日期）
			var dateObj = calendarUtl.formatYMD();
			var nowYear = dateObj.y;
			var nowMonth = dateObj.m;
			var fulldate = dateObj.fullDate;
			var currentDate = dateObj.currentDate;
			var lunarMonthDate = dateObj.lunarMonthDate;
			var ganziNYD = dateObj.ganziNYD;
			// 万历年所有年份option 字符串，（1900-2100）
			var dataYear = Array.apply(null,Array(201)).map(function (item,index) {
				var obj = {};
				obj.data = index + 1900;
				return self.create_htmlTag(0, obj)
			}).join(' ');

			// 万历年所有月份option 字符串，（1-12）
			var dataMonth = Array.apply(null,Array(12)).map(function (item,index) {
				var obj = {};
				obj.data = index +1;
				return self.create_htmlTag(0, obj)
			}).join(' ');
			//生成header 
			console.log(dataYear);
			this.create_body(nowYear, nowMonth);
			var selYO = this.config.selectYearOpt
			append(selYO,dataYear);
			// this.config.selectYearOpt.innerHTML=dataYear;
			this.config.selectYearOpt.value=nowYear;
			append(this.config.selectMonthOpt,dataMonth);
			// this.config.selectMonthOpt.innerHTML=dataMonth;
			this.config.selectMonthOpt.value = nowMonth;
			//生成tbody
			this.create_sideIcon(fulldate, currentDate, lunarMonthDate, ganziNYD)

		},
		/*
		* 渲染日历右侧 right-icon 内容函数
		* param f 详细日期 ‘2010-01-01’
		* param c 点击日期 ‘01’
		* param l 点击日期 ‘农历二月初一’
		* param g 天干地支日期 ‘辛亥年辛丑月丁卯日’
		* return null
		*/ 
		create_sideIcon:function(f,c,l,g) {
			this.config.fulldate.innerHTML=f;
			this.config.currentDate.innerHTML=c;
			this.config.lunarMonthDate.innerHTML=l;
			this.config.gzYearMonDate.innerHTML=g;
		},
		/* 
		 *日历内所有事件绑定，切换年，月，点击具体某一天。
		*/
		eventBind:function () {

			var self = this;
			var Td = $('tbody td');
			var selectYearOpt = self.config.selectYearOpt;
			var selectMonthOpt = self.config.selectMonthOpt;
			var selOptYear = Number(selectYearOpt.value);
			var selOptMonth =Number(selectMonthOpt.value);
			//年份选择事件绑定
			EventUtl.addEvent(selectYearOpt,'change',function(e) {
				var selectedOptYear = this.value;
				self.create_body(selectedOptYear, selOptMonth);
			});
			//月份选择事件绑定
			EventUtl.addEvent(selectMonthOpt,'change',function(e) {
				var selectedOptMonth = this.value;
				self.create_body(selectedOptMonth, selOptMonth);
			});
			// 日期click事件绑定
			[].forEach.call(Td,function(item,index) {
				EventUtl.addEvent(item,'click',function(e) {
					var flag = this.getAttribute('flag'),
						f = this.getAttribute('fulldate'),
						c = this.getAttribute('solar'),
						l = this.getAttribute('lunarMonthDate'),
						g = this.getAttribute('ganziNYD');
						if(flag=='true'){
							[].forEach.call(this.parentNode.parentNode.getElementsByTagName("td"),function(item){item.classList.remove('clickedTd')})
							this.classList.add('clickedTd');
							self.create_sideIcon(f, c, l, g);
						}else{
							//点击上月日期时，渲染上一个月
							if(Number(c)>20){

								selectMonthOpt.value=selOptMonth-1;
								self.create_body(selOptYear, selOptMonth-1);
								if(selOptMonth==1){
									selectMonthOpt.value=12;
									selectYearOpt.value=selOptYear-1;
									self.create_body(selOptYear-1, 12);
								}
							//点击下月日期时，渲染下一个月
							} else{
								selectMonthOpt.value=selOptMonth+1;
								self.create_body(selOptYear, selOptMonth+1);
								if(selOptMonth==12){
									selectMonthOpt.value=1;
									selectYearOpt.value=selOptYear+1;
									self.create_body(selOptYear+1, 1);
								}
							}
						}
				})
			})
		},
		/* 创建带有日期相关所有属性的html字符串。
		* param tag 返回html标签的标志位，1:返回'<td>....</td>'
		* param tag 返回html标签的标志位，0:返回'<option>....</option>'
		* return str 返回具体的html 字符串, 作为DOM元素。
		*/
		create_htmlTag:function(tag,opt) {
			var str;
			if (tag) {
				str = '<td class="tdl '+ opt.class +' " solar="'
					  + opt.solar+'" flag="'
					  + opt.flag+'" lunar="'
					  + opt.lunar+'" animal="'
					  + opt.animal+'" ganziNYD="'
					  + opt.ganziNYD+'" week="'
					  +opt.week+'" lweek="'
					  +opt.lweek+'" lunarMonthDate="'
					  +opt.lunarMonthDate+'" fulldate="'
					  + opt.fulldate+'"><span class="solar">' 
					  + opt.solar+ '</span><span class="lunar">'
					  + opt.lunar +'</span></td>';
			} else {
				str = '<option>' + opt.data + '</option>'
			};
			return str;
		}
	};

	//AMD CMD 对外接口
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = calendar;
	else if(typeof define === 'function' && define.amd)
		define([], calendar);
	else if(typeof exports === 'object')
		exports["calendar"] = calendar;
	else
		root["calendar"] = calendar;
		root["calendarUtl"] = calendarUtl;
	calendar.init()
})(this,undefined);
