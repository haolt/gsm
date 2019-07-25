import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideKey'
})
export class HideKeyPipe implements PipeTransform {

  transform(text: string): any {
    const quantity = text.length;
    let result = '';
    for ( let i = 0; i < quantity; i++) {
      result += '*';
    }
    return result;
  }

}
