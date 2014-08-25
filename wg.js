//alert("hi");
var data = window.frames[2].document.querySelector("#ctl00_cphMain_CalendarAC").querySelectorAll("tr.list_body")
var id = window.frames[2].document.querySelector("#ctl00_cphTop_LbEmployee").innerHTML;
var month_string = window.frames[2].document.querySelector("#ctl00_cphMain_CalendarAC").querySelector("table").querySelector("td").innerHTML;
var year = month_string.substr(0, 4);
var month = month_string.substr(5, 1);
var size = data.length;
var min_all = 0;
var all_string = "";
var work_day = 0;
for(var i=0; i< size ; i++) {
	if(i%3==1){
		var time_string = data[i].children[0].innerHTML;	
    var day= data[i-1].children[0].children[0].children[0].innerHTML;
    var day_string = year + "-" + month+ "-"+ day;
    var week_day = new Date(day_string).getDay('d');
    var today = new Date().getDate();
    // only cal to last day
    if(day >= today){
      break;
    }
    //workday
    if(!(week_day == 0 || week_day == 6)) {
      if(time_string == "无刷卡记录"){
      } else{
        min_all += cal_day_time(time_string); 
      }
      all_string = all_string +"\n"+day_string + " "+time_string;
      work_day += 1;
      continue;
    } else{
      //workend
      if(time_string != "无刷卡记录"){
        all_string = all_string +"\n"+day_string + " "+time_string+"周末加班";
        min_all += cal_day_time(time_string); 
      }
    }
	}
}
alert(all_string);
var day_work_hour = 9;
var work_hour = min_all/60;
var less = (work_day*day_work_hour) - work_hour;
alert("min:"+min_all+"\nhour:"+work_hour+"\nday:"+work_day+"\n"+"per/day:"+work_hour/work_day+"\n截止今天差:"+less);

function cal_day_time(time_string){
     var data = time_string.match(/(\d+):(\d+)~(\d+):(\d+)/);    
     hour_start = data[1];
     min_start = data[2];
     hour_end = data[3];
     min_end = data[4];
     var work_min = (hour_end - hour_start)*60 + (min_end - min_start);
     //if 18:00 ~18:30 is dinner time, del this time area
     /*if(hour_end >= 19 ||(hour_end==18 && min_end >= 30)) {
     	work_min = work_min - 30;	
     }else if(hour_end < 18){
     }
     else{
     	work_min = work_min - min_end;
     }
     */


     return work_min;
}
