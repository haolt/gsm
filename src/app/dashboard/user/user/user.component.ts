import { Component, OnInit } from '@angular/core';
import { CurentUserService } from '../../curent-user.service';
import { UserService } from '../user.service';
import { CookieService } from 'src/app/core/cookie.service';
import { User } from '../../user.class';
import { DivisionService } from '../../division/division.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public title = 'User Managing';
  public keywords: string;
  public isAdmin: boolean;
  public allUsers: any;
  public allUsersResult: any;
  public allDivisions: any;

  constructor(
    private curentUserService: CurentUserService,
    private userService: UserService,
    private cookieService: CookieService,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {
    this.keywords = '';
    this.curentUserService.getIsAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    const token = this.cookieService.getCookie('token');
    this.userService.getAllUsers(token).subscribe((data: User) => {
      this.allUsers = data;
      this.allUsersResult = data;
    });
    this.divisionService.getAllDivisions(token).subscribe((data) => {
      this.allDivisions = data;
    });
  }
  getKeywords(e) {
    this.keywords = e;
  }

  onFilter(e) {
    const filterConditions = e;
    this.allUsersResult = this.filterUsers(filterConditions, this.allUsers);
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
}
