import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'datepipe'
})
export class DatepipePipe extends DatePipe implements PipeTransform {

  
datePipe = new DatePipe('en-US');

transform(unixTime: number): string {
  const datetime = new Date(unixTime);
    return this.datePipe.transform(datetime, 'HH:mm');
  }
}
