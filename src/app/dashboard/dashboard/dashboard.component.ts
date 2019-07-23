import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CurentUserService } from '../curent-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isShowSideBar: boolean;
  // public isAdmin: boolean;

  constructor(
    private router: Router,
    // private curentUserService: CurentUserService
  ) { }
  ngOnInit() {
    this.isShowSideBar = false;
    // this.curentUserService.getIsAdmin().subscribe((isAdmin) => {
    //   this.isAdmin = isAdmin;
    // });
  }

  toggleSidebar() {
    this.isShowSideBar = !this.isShowSideBar;
  }
  goToAnnounce() {
    this.router.navigate(['dashboard', 'announces']);
  }
  goToRequest() {
    this.router.navigate(['dashboard', 'requests']);
  }
  goToUser() {
    this.router.navigate(['dashboard', 'users']);
  }
  // ngOnDestroy() {
  //   this.curentUserService.getIsAdmin().unsubscribe();
  // }
}
