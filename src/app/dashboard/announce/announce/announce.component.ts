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
  // Filter
  public keywords: string;
  public sltDivisionsToFiter: string[];

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
          announce.isDeleteable = false;
        });
        this.getParamsToFilter();
        console.log('All Announces', this.allAnnounces);
      },
      (errs) => {
        this.allAnnounces = [];
        this.announceService.handleError(errs);
      }
    );
  }

  onOpenModalDelete(id) {
    const deletedAnnounce = this.allAnnounces.filter((announce) => announce._id === id)[0];
    deletedAnnounce.isDeleteable = true;
  }

  private getParamsToFilter() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.sltDivisionsToFiter = params.division ? params.division.split(' ') : '' ;
      this.keywords = params.s ? params.s.toLowerCase() : '';
      console.log(this.keywords, this.sltDivisionsToFiter);
      this.filterAnnounces();
    });
  }

  filterAnnounces() {
    this.allAnnounces = this.allAnnouncesOriginal.filter(announce => announce.content.toLowerCase().includes(this.keywords));
    // if (this.sltDivisionsToFiter) {
    //   this.sltDivisionsToFiter.forEach((divisionAbbr) => {
    //     this.allAnnounces = this.allAnnounces.filter(announce => announce.assignTo.includes())
    //   });
    // }
    this.allAnnounces.reverse();
  }

  onAddNewAnnounce(announce) {
    this.allAnnounces.push(announce);
    this.allAnnouncesOriginal.push(announce);
    this.allAnnounces.reverse();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCloseModalDelete({id, hasDelete}) {
    const deletedAnnounce = this.allAnnounces.filter((announce) => announce._id === id)[0];
    if (deletedAnnounce ) {
      deletedAnnounce.isDeleteable = false;
    }
    if (hasDelete) {
      this.allAnnounces = this.allAnnounces.filter((announce) => announce._id !== id);
    }
  }

  closeEditForm({ id, editedAnnounce }) {
    const announce = this.allAnnounces.filter((ann) => ann._id === id)[0];
    announce.isEditable = false;
    announce.isShowDropdownOptions = false;
    if (editedAnnounce) {
      announce.assignTo = editedAnnounce.assignTo;
      announce.content = editedAnnounce.content;
    }
  }
}
