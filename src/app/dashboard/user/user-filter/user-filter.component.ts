import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DivisionService } from '../../division/division.service';
import { CookieService } from 'src/app/core/cookie.service';

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent implements OnInit {

  public isShowFilterForm = false;
  public allDivisions: any;
  @Output() filterConditionsEventEmitter = new EventEmitter();
  // filterConditions
  public name = '';
  public position = '';
  public divisions = [];
  public role = 'all';

  constructor(
    private cookieService: CookieService,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {
    const token = this.cookieService.getCookie('token');
    this.divisionService.getAllDivisions(token).subscribe((data) => {
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
}
