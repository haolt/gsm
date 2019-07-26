import { Component, OnInit } from '@angular/core';
import { CurentUserService } from '../../curent-user.service';
import { UserService } from '../user.service';
import { User } from '../../user.class';
import { DivisionService } from '../../division/division.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public title = 'User Managing';
  public isAdmin: boolean;
  public allUsers: any;
  public allUsersResult: any;
  public allDivisions: any;

  constructor(
    private router: Router,
    private curentUserService: CurentUserService,
    private userService: UserService,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {
    this.curentUserService.getIsAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.userService.getAllUsers().subscribe((data: User) => {
      this.allUsers = data;
      this.allUsersResult = data;
      this.allUsersResult = this.allUsersResult.map((user) => {
        user.hasDisplayDeleteForm = false;
        user.hasDisplayEditForm = false;
        return user;
      });
      this.allUsersResult.reverse();
      // console.log(this.allUsersResult);
    });
    this.divisionService.getAllDivisions().subscribe((data) => {
      this.allDivisions = data;
    });
  }

  onFilter(e) {
    const filterConditions = e;
    this.allUsersResult = this.filterUsers(filterConditions, this.allUsers);
    this.allUsersResult.reverse();
  }

  private filterUsers(conditions, [...allUsers]) {
    if (conditions) {
      if (conditions.name) {
        conditions.name = conditions.name.toLowerCase();
        allUsers = allUsers.filter((user) => user.name.toLowerCase().includes(conditions.name));
      }
      if (conditions.position) {
        conditions.position = conditions.position.toLowerCase();
        allUsers = allUsers.filter((user) => user.position.toLowerCase().includes(conditions.position));
      }
      if (conditions.role) {
        switch (conditions.role) {
          case 'all':
            break;
          case 'admin':
            allUsers = allUsers.filter((user) => user.role === 'admin');
            break;
          case 'staff':
            allUsers = allUsers.filter((user) => user.role === 'staff');
            break;
          default:
            break;
        }
      }
      if ( conditions.divisions.length < this.allDivisions.length) {
        allUsers = allUsers.filter((user) => conditions.divisions.indexOf(user.division) + 1);
      }
      return [...allUsers];
    }
    return [...allUsers];
  }

  handleClickEditBtn(id) {
    const editedUser = this.allUsersResult.filter((user) => user._id === id)[0];
    editedUser.hasDisplayEditForm = true;
    // console.log(id);
  }

  handleClickDeleteBtn(id) {
    const deletedUser = this.allUsersResult.filter((user) => user._id === id)[0];
    deletedUser.hasDisplayDeleteForm = true;
  }

  onSaveEditedUser(e) {
    this.allUsersResult = this.allUsersResult.map((user) => {
      if (user._id === e._id) {
        user = e;
      }
      return user;
    });
  }

  onCloseModal({id, hasDelete}) {
    const deletedUser = this.allUsersResult.filter((user) => user._id === id)[0];
    if (deletedUser ) {
      deletedUser.hasDisplayDeleteForm = false;
    }
    if (hasDelete) {
      this.allUsersResult = this.allUsersResult.filter((user) => user._id !== id);
    }
  }

  handleClickViewBtn(id) {
    this.router.navigate(['/dashboard/users', id]);
  }

}
