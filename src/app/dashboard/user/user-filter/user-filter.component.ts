import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DivisionService } from '../../division/division.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {

  public isShowFilterForm = false;
  public allDivisions: any;
  @Input() isAdmin: boolean;
  @Output() filterConditionsEventEmitter = new EventEmitter();
  // filterConditions
  public name = '';
  public position = '';
  public divisions = [];
  public role = 'all';

  constructor(
    private divisionService: DivisionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.divisionService.getAllDivisions().subscribe((data) => {
      this.allDivisions = data;
      this.allDivisions = this.allDivisions.map((div) => {
        div.isChecked = true;
        return div;
      });
      this.divisions = this.allDivisions.map((div) => div._id);
    });
  }

  showFilterForm() {
    this.isShowFilterForm = !this.isShowFilterForm;
  }

  handleChange() {
    const filterConditions = {
      name: this.name,
      position: this.position,
      divisions: this.divisions,
      role: this.role
    };
    this.filterConditionsEventEmitter.emit(filterConditions);
  }

  onCheckDivision(id) {
    if (this.divisions.includes(id) ) {
      this.divisions = this.divisions.filter((item) => item !== id);
    } else {
      this.divisions.push(id);
    }
  }
  goToUserAdd() {
    this.router.navigate(['dashboard', 'users', 'add']);
  }
}
