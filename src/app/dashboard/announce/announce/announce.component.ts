import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurentUserService } from './../../curent-user.service';
import { Subscription } from 'rxjs';
import { AnnounceService } from './../announce.service';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.css']
})
export class AnnounceComponent implements OnInit, OnDestroy {

  public title = 'Announcements';
  public currentUser: any;
  public allAnnounces: any;
  private subscription: Subscription;

  constructor(
    private curentUserService: CurentUserService,
    private announceService: AnnounceService
  ) { }

  ngOnInit() {
    this.subscription = this.curentUserService.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
    this.subscription = this.announceService.getAllAnnounces().subscribe(
      (data) => {
        this.allAnnounces = data;
        this.allAnnounces.reverse();
      },
      (errs) => {
        this.allAnnounces = [];
        this.announceService.handleError(errs);
      }
    );
  }

  onAddNewAnnounce(announce) {
    this.allAnnounces.push(announce);
    this.allAnnounces.reverse();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
