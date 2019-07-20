import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isShowSideBar: boolean;

  constructor(
    private router: Router
  ) { }
  ngOnInit() {
    this.isShowSideBar = false;
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
}
