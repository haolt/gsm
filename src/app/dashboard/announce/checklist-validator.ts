import { AbstractControl } from '@angular/forms';

export function checklistValidator(listArray: AbstractControl) {
  const length = listArray.value.length;
  return ( length ? { invalidListArray: true } : null );
}
