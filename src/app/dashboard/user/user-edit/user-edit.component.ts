import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DivisionService } from './../../division/division.service';
import { patternValidator } from '../../../shared/pattern-validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() user: any;
  @Output() editUserEventEmitter = new EventEmitter();

  public editUser: FormGroup;
  public allDivisions: any;
  constructor(
    private divisionService: DivisionService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.divisionService.getAllDivisions().subscribe((data) => {
      this.allDivisions = data;
    });

    this.editUser = new FormGroup({
      id: new FormControl(
        // this.user._id,
        {
          value: this.user._id,
          disabled: true
        },
        [
          Validators.required
        ]
      ),
      name: new FormControl(
        this.user.name,
        [
          Validators.required
        ]
      ),
      email: new FormControl(
        this.user.email,
        [
          Validators.required,
          patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ),
      password: new FormControl(
        this.user.password,
        [
          Validators.required,
          Validators.minLength(6)
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
    this.editUser.get('id').disable();
  }
  closeEditForm() {
    this.user.hasDisplayEditForm = false;
  }

  setDefaultAvatar() {
    this.editUser.value.avatar =
    'https://cdn0.iconfinder.com/data/icons/avatar-profile/452/pikachu_pokemon_profile_avatar_people-512.png';
  }

  saveEditUser() {
    if (this.editUser.value.avatar === '') {
      this.setDefaultAvatar();
    }
    // console.log('ban đầu: ', this.user);
    // console.log('sau khi sửa: ', this.editUser.value);
    this.editUser.value.id = this.user._id;
    this.userService.updateAUser(this.editUser.value)
    .subscribe((data) => {
      this.editUserEventEmitter.emit(data);
      this.closeEditForm();
    });
  }
}
