import { Component, OnInit } from '@angular/core';
import { RequestService } from './../../dashboard/request/request.service';
import { UserService } from 'src/app/dashboard/user/user.service';
import { DivisionService } from 'src/app/dashboard/division/division.service';

import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistic-info',
  templateUrl: './statistic-info.component.html',
  styleUrls: ['./statistic-info.component.css']
})
export class StatisticInfoComponent implements OnInit {

  public allPosts: any;
  public allRequests: any;
  public allUsers: any;
  public allDivisions: any;

  constructor(
    private router: Router,
    private requestService: RequestService,
    private userService: UserService,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {

    forkJoin([
      this.requestService.getAllRequests(),
      this.userService.getAllUsers(),
      this.divisionService.getAllDivisions()
    ]).subscribe(results => {
      this.allRequests = results[0];

      this.allUsers = results[1];
      this.allUsers = this.allUsers.slice(1, 15);

      this.allDivisions = results[2];
    });
  }

  seeInfoAUser(id) {
    this.router.navigate(['/dashboard', 'users', id]);
  }

  goToUsersModule() {
    this.router.navigate(['/dashboard', 'users']);
  }
}
