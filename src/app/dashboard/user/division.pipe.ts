import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'division'
})
export class DivisionPipe implements PipeTransform {

  transform(divID: string): any {
    if (divID) {
      const allDivision = [
        {
          _id: '5d3689057854da2ecc5ca37e',
          name: 'Design Unit'
        },
        {
          _id: '5d36893a062c182ecce09aea',
          name: 'Division 1'
        },
        {
          _id: '5d368943062c182ecce09aeb',
          name: 'Division 2'
        },
        {
          _id: '5d36894b062c182ecce09aec',
          name: 'Division 3'
        },
        {
          _id: '5d368974062c182ecce09aed',
          name: 'Data Research'
        }
      ];
      const divisionName = allDivision.filter((div) => div._id === divID)[0].name;
      return (divisionName ? divisionName : '');
    }
    return '';
  }
}
