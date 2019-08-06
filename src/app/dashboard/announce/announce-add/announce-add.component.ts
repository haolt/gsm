import { Component, OnInit, Input } from '@angular/core';
import { DivisionService } from 'src/app/dashboard/division/division.service';
import { Subscription } from 'rxjs';

import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnnounceService } from './../announce.service';
import { checklistValidator } from '../checklist-validator';

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

  // Check Division
  public checklist: any;
  public checkedList: any;

  constructor(
    private divisionService: DivisionService,
    private announceService: AnnounceService
  ) { }

  ngOnInit() {
    this.isShowAddForm = false;
    this.subscription = this.divisionService.getAllDivisions().subscribe((data) => {
      this.allDivisions = data;
      this.allDivisions = this.allDivisions.map((div) => {
        div.isSelected = true;
        return div;
      });
      this.initNewAnnounceForm();
      this.getCheckedItemList();
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
      assignTo: new FormControl(
        this.allDivisions
        // [
        //   checklistValidator
        // ]
      ),
      content: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(50)
        ]
      ),
      createdBy: new FormControl(this.currentUser),
      votes: new FormControl([]),
      masterSelected: new FormControl(true)
    });
  }

  public onAddAnnounce() {
    this.isShowAddForm = !this.isShowAddForm;
    this.getCheckedItemList();
    this.announceService.createAnAnnounce(this.newAnnounce.value).subscribe(
      (data) => {
        this.initNewAnnounceForm();
        this.getCheckedItemList();
      },
      (errs) => {
        this.announceService.handleError(errs);
      }
    );
  }

  checkUncheckAll() {
    this.allDivisions = this.allDivisions.map((item) => {
      item.isSelected = this.newAnnounce.value.masterSelected;
      return item;
    });
    this.getCheckedItemList();
  }

  isAllSelected(id) {

    const changedDivision = this.allDivisions.filter((div) => div._id === id)[0];
    changedDivision.isSelected = !changedDivision.isSelected;

    this.newAnnounce.value.masterSelected = this.allDivisions.every( (item) => {
        return item.isSelected === true;
    });
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.newAnnounce.value.assignTo = [];
    this.allDivisions.forEach((item) => {
      if (item.isSelected) {
        this.newAnnounce.value.assignTo.push(item);
      }
    });
  }

}
