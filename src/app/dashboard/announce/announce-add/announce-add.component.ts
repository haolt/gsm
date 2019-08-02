import { Component, OnInit, Input } from '@angular/core';
import { DivisionService } from 'src/app/dashboard/division/division.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-announce-add',
  templateUrl: './announce-add.component.html',
  styleUrls: ['./announce-add.component.css']
})
export class AnnounceAddComponent implements OnInit {

  @Input() currentUser: any;
  public isShowAddForm: boolean;
  public allDivisions: any;
  public subscription: Subscription;

  constructor(
    private divisionService: DivisionService
  ) { }

  ngOnInit() {
    this.isShowAddForm = false;
    this.subscription = this.divisionService.getAllDivisions().subscribe((data) => {
      this.allDivisions = data;
    });
  }

  toggleAddAnnounce() {
    this.isShowAddForm = !this.isShowAddForm;
  }
}
