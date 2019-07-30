import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(value: string): string {
    let result;
    switch (value) {
      case 'in_late':
        result = 'In late'
        break;
      case 'leave_early':
        result = 'Leave early'
        break;
      case 'off':
        result = 'Off'
        break;
      case 'resign':
        result = 'Resign'
        break;
      default:
        result = ''
        break;
    }
    return result;
  }
}
