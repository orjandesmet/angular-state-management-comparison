import { Pipe, PipeTransform } from '@angular/core';
import { convertSecondsToDate, DateTimeSeconds } from '../model/date-time-seconds';

@Pipe({
  name: 'secondsToDate'
})
export class SecondsToDatePipe implements PipeTransform {

  transform(dateTimeSeconds: DateTimeSeconds): Date {
    return convertSecondsToDate(dateTimeSeconds);
  }

}
