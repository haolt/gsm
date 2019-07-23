import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  goToAnnounce() {
    this.router.navigate(['dashboard', 'announces']);
  }
  goToRequest() {
    this.router.navigate(['dashboard', 'requests']);
  }
}
