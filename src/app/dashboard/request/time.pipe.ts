import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string): string {
    // const result = this.convertUTCDateToLocalDate(new Date(value));
    const result = this.formatDate(value);
    return result;
  }

  private formatDate = (time) => {
    const timeObj = new Date(time);
    // const dayNames = [
    //   'Mon', 'Tue', 'Web', 'Thur', 'Fri', 'Sat', 'Sun'
    // ];
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];
    const hours = timeObj.getHours();
    const seconds = timeObj.getMinutes();
    // const dayIndex = timeObj.getMonth();
    const date = timeObj.getDate();
    const monthIndex = timeObj.getMonth();
    const year = timeObj.getFullYear();

    // return hours + ':' + seconds + ' | ' + dayNames[dayIndex] + ', ' + monthNames[monthIndex] + ' ' + date + ', ' + year;
    return hours + ':' + seconds + ' | ' + monthNames[monthIndex] + ' ' + date + ', ' + year;
  }
  // private convertUTCDateToLocalDate = (date) => {
  //   const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  //   const offset = date.getTimezoneOffset() / 60;
  //   const hours = date.getHours();
  //   newDate.setHours(hours - offset);
  //   return newDate;
  // }
}
