import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DivisionService } from './../../division/division.service';
import { CookieService } from './../../../core/cookie.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() user: any;
  public editUser: FormGroup;
  public allDivisions: any;
  constructor(
    private divisionService: DivisionService,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    console.log(this.user);
    const token = this.cookieService.getCookie('token');
    this.divisionService.getAllDivisions(token).subscribe((data) => {
      this.allDivisions = data;
    });

    this.editUser = new FormGroup({
      name: new FormControl(
        this.user.name,
        [
          Validators.required
        ]
      ),
      email: new FormControl(
        this.user.email,
        [
          Validators.required
        ]
      ),
      password: new FormControl(
        this.user.password,
        [
          Validators.required
        ]
      ),
      avatar: new FormControl(
        this.user.avatar
      ),
      position: new FormControl(
        this.user.position
      ),
      division: new FormControl(
        this.user.division,
        [
          Validators.required
        ]
      ),
      role: new FormControl(
        this.user.role,
        [
          Validators.required
        ]
      )
    });
  }
  closeEditForm() {
    this.user.hasDisplayEditForm = false;
  }
  onEditUser() {
    console.log(this.editUser.value);

  }
}
