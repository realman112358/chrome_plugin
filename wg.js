//alert("hi");
var data = window.frames[2].document.querySelector("#ctl00_cphMain_CalendarAC").querySelectorAll("tr.list_body")
var size = data.length;
var min_all = 0;
var all_string = "";
var work_day = 0;
for(var i=0; i< size ; i++) {
	if(i%3==1){
		var day_string = data[i].children[0].innerHTML;	
		if(day_string == "无刷卡记录")
			continue;
		all_string = all_string +"\n"+day_string;
          work_day = work_day +1;
		min_all += cal_day_time(day_string); 
	}
}
alert(all_string);
var less = (work_day*9) - (min_all/60);
alert("min:"+min_all+"\nhour:"+min_all/60+"\nday:"+work_day+"\n"+"per/day:"+min_all/60/work_day+"\n截止今天差:"+less);

function cal_day_time(time_string){
     var data = time_string.match(/(\d+):(\d+)~(\d+):(\d+)/);    
     hour_start = data[1];
     min_start = data[2];
     hour_end = data[3];
     min_end = data[4];
     var work_min = (hour_end - hour_start)*60 + (min_end - min_start);
     if(hour_end >= 19 ||(hour_end==18 && min_end >= 30)) {
     	work_min = work_min - 30;	
     }else if(hour_end < 18){
     }
     else{
     	work_min = work_min - min_end;
     }
     return work_min;
}
function cal_month_time(){
         
}