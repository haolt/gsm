import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { patternValidator } from 'src/app/shared/pattern-validator';
import { DivisionService } from '../../division/division.service';
import { Router } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  public title = ' User Managing / Add User';
  public addUser: FormGroup;
  public allDivisions: any;
  public isShowConfirmPasswordCheck = false;
  public isSuccessfullyConfirmPassword: boolean;

  constructor(
    private divisionService: DivisionService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.divisionService.getAllDivisions().subscribe((data) => {
      this.allDivisions = data;
    });
    this.createAddForm();
  }

  createAddForm() {
    this.addUser = new FormGroup({
      name: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      email: new FormControl(
        '',
        [
          Validators.required,
          patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ),
      avatar: new FormControl(
        'https://cdn0.iconfinder.com/data/icons/avatar-profile/452/pikachu_pokemon_profile_avatar_people-512.png'
      ),
      position: new FormControl(
        ''
      ),
      division: new FormControl(
        '',
        [
          Validators.required
        ]
      ),
      role: new FormControl(
        '',
        [
          Validators.required
        ]
      )
    });
  }

  getKeywords(e) {
    console.log(e);
  }

  onAddUser() {
    // console.log(this.addUser.value);
    this.userService.addAUser(this.addUser.value).subscribe((data) => {
      console.log('Thành công :v');
      this.backToUserManager();
    });
  }

  backToUserManager() {
    this.router.navigate(['dashboard', 'users']);
  }

  checkConfirmPassword(rePassword) {
    this.isSuccessfullyConfirmPassword = (rePassword === this.addUser.value.password) ? true : false;
  }

  onClickRePassword() {
    this.isShowConfirmPasswordCheck = true;
  }
}
