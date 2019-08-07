import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { CurentUserService } from './../../curent-user.service';
import { AnnounceService } from './../announce.service';
import { DivisionService } from 'src/app/dashboard/division/division.service';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.css']
})

export class AnnounceComponent implements OnInit, OnDestroy {

  public title = 'Announcements';
  public currentUser: any;
  public allAnnounces: any;
  public allAnnouncesOriginal: any;
  public allDivisions: any;
  private subscription: Subscription;
  public keywords: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private curentUserService: CurentUserService,
    private announceService: AnnounceService,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {
    this.subscription = this.curentUserService.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
    this.subscription = this.divisionService.getAllDivisions().subscribe((data) => {
      this.allDivisions = data;
    });
    this.subscription = this.announceService.getAllAnnounces().subscribe(
      (data) => {
        this.allAnnouncesOriginal = data;
        this.allAnnounces = data;
        this.allAnnounces.forEach((announce) => {
          announce.isShowDropdownOptions = false;
          announce.isEditable = false;
        });
        this.getParamsToFilter();
      },
      (errs) => {
        this.allAnnounces = [];
        this.announceService.handleError(errs);
      }
    );
  }

  private getParamsToFilter() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.keywords = params.s ? params.s : '';
      console.log(this.keywords);
      this.filterAnnounces();
    });
  }

  filterAnnounces() {
    this.allAnnounces = this.allAnnouncesOriginal.filter(announce => announce.content.includes(this.keywords));
    this.allAnnounces.reverse();
  }

  onAddNewAnnounce(announce) {
    this.allAnnounces.push(announce);
    this.allAnnounces.reverse();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
