import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'datepipe'
})
export class DatepipePipe extends DatePipe implements PipeTransform {

  
datePipe = new DatePipe('en-US');

  transform(unixTime: number): string {
    const dateUnixTime = new Date(unixTime)
    const datetime = this.changeFormat(new Date(unixTime));
    const now = this.changeFormat(new Date());
    
    let format = "";
    if(datetime.year === now.year && datetime.month === now.month && datetime.date === now.date){
      format = this.datePipe.transform(dateUnixTime, 'HH:mm'); 
    } else {
      format = this.datePipe.transform(dateUnixTime, 'MM/dd');
    }
    return format;
  }

  changeFormat(datetime){
    const targetDatetime = {
      year:datetime.getFullYear(),
      month:datetime.getMonth() + 1,
      date:datetime.getDate()
    };
    return targetDatetime;
  }
}
