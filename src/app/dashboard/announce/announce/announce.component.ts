import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurentUserService } from './../../curent-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.css']
})
export class AnnounceComponent implements OnInit, OnDestroy {

  public title = 'Announcements';
  public currentUser: any;
  private subscription: Subscription;

  constructor(
    private curentUserService: CurentUserService
  ) { }

  ngOnInit() {
    this.subscription = this.curentUserService.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
