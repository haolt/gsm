import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-division-checkbox',
  templateUrl: './division-checkbox.component.html',
  styleUrls: ['./division-checkbox.component.css']
})
export class DivisionCheckboxComponent implements OnInit {

  @Input() allDivisions: any;
  public selectedDivisions: any;
  constructor() { }

  ngOnInit() {
    this.allDivisions.forEach(division => {
      division.hasChecked = true;
      this.selectedDivisions.push(division);
    });
  }

  onChangeADivison(id) {
    const checkedDivision = this.allDivisions.filter(div => div._id === id)[0];
    checkedDivision.hasChecked = checkedDivision.hasChecked;

    this.selectedDivisions.map((selectedDivision) => {
      if (selectedDivision._id === id) {
        this.selectedDivisions = this.selectedDivisions.filter((div) => div._id !== id);
      } else {
        this.selectedDivisions.push(checkedDivision);
      }
    });
    console.log(this.selectedDivisions);

  }
}
