import { Component, OnInit, Input } from '@angular/core';
import { DivisionService } from 'src/app/dashboard/division/division.service';
import { Subscription } from 'rxjs';

import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnnounceService } from './../announce.service';

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

  public newAnnounce: FormGroup;
  // Text Editor
  public decoupledEditor = DecoupledEditor;
  public Editor = DecoupledEditor;
  public config = {
    placeholder: 'What do you think?'
  };

  public hasCheckedAll = true;

  constructor(
    private divisionService: DivisionService,
    private announceService: AnnounceService
  ) { }

  ngOnInit() {
    this.isShowAddForm = false;
    this.initNewAnnounceForm();
    this.subscription = this.divisionService.getAllDivisions().subscribe((data) => {
      this.allDivisions = data;
      this.allDivisions = this.allDivisions.map((div) => {
        div.hasChecked = true;
        this.newAnnounce.value.assignTo.push(div._id);
        return div;
      });
    });
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  private initNewAnnounceForm() {
    this.newAnnounce = new FormGroup({
      assignTo: new FormControl([]),
      content: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(50)
        ]
      ),
      createdBy: new FormControl(this.currentUser),
      votes: new FormControl([])
    });
  }

  public onAddAnnounce() {
    this.isShowAddForm = !this.isShowAddForm;
    this.announceService.createAnAnnounce(this.newAnnounce.value).subscribe(
      (data) => {
        this.initNewAnnounceForm();
      },
      (errs) => {
        this.announceService.handleError(errs);
      }
    );
  }

  onChangeADivision(id) {
    if ( this.newAnnounce.value.assignTo.includes(id)) {
      this.newAnnounce.value.assignTo = this.newAnnounce.value.assignTo.filter((divId) => divId !== id);
    } else {
      this.newAnnounce.value.assignTo.push(id);
    }
    this.checkStatusCheckAll();
  }

  onChangeCheckAll() {
    this.hasCheckedAll = !this.hasCheckedAll;
    // VIEW
    this.allDivisions = this.allDivisions.map((division) => {
      division.hasChecked = this.hasCheckedAll;
      return division;
    });

    // LOGIC
    this.newAnnounce.value.assignTo = [];
    if (this.hasCheckedAll) {
      this.allDivisions.map((division) => {
        this.newAnnounce.value.assignTo.push(division._id);
      });
    }
  }

  private checkStatusCheckAll() {
    this.hasCheckedAll = (this.newAnnounce.value.assignTo.length === this.allDivisions.length) ? true : false;
  }
}
