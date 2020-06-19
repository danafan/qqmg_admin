var now = new Date(); //当前日期 
// var nowDayOfWeek = now.getDay(); //今天本周的第几天 
// var nowDay = now.getDate(); //当前日 
var nowMonth = now.getMonth(); //当前月 
var nowYear = now.getYear(); //当前年 
nowYear += (nowYear < 2000) ? 1900 : 0; 
//获得某月的天数 
function getMonthDays(myMonth){ 
	var monthStartDate = new Date(nowYear, myMonth, 1); 
	var monthEndDate = new Date(nowYear, myMonth + 1, 1); 
	var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24); 
	return days; 
}
//格式化日期
function formatDate(date) { 
	var myyear = date.getFullYear(); 
	var mymonth = date.getMonth()+1; 
	var myweekday = date.getDate(); 

	if(mymonth < 10){ 
		mymonth = "0" + mymonth; 
	} 
	if(myweekday < 10){ 
		myweekday = "0" + myweekday; 
	} 

	return (myyear+"-"+mymonth + "-" + myweekday + " 00:00:00");
	
	

	
}
//获得本月的开始日期 
export function getMonthStartDate(){ 
	var monthStartDate = new Date(nowYear, nowMonth, 1); 
	return formatDate(monthStartDate); 
}

//获得本月的结束日期 
export function getMonthEndDate(){ 
	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth)); 
	return formatDate(monthEndDate); 
}