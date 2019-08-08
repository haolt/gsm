import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { DivisionService } from '../../division/division.service';
import { AnnounceService } from '../announce.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-announce-edit',
  templateUrl: './announce-edit.component.html',
  styleUrls: ['./announce-edit.component.css']
})
export class AnnounceEditComponent implements OnInit {

  @Input() allDivisions: any;
  @Input() announce: any;

  public subscription: Subscription;

  public editAnnounce: FormGroup;
  // Text Editor
  public decoupledEditor = DecoupledEditor;

  // Check Division
  public hasSelectAll: boolean;

  @Output() closeFormEventEmitter = new EventEmitter();
  constructor(
    private announceService: AnnounceService
  ) { }

  ngOnInit() {
    this.allDivisions = this.allDivisions.map((div) => {
      div.isSelected = false;
      return div;
    });
    this.initNewAnnounceForm();
    const arrdivisions = this.announce.assignTo;
    arrdivisions.forEach((division) => {
      const selectedDivision = this.allDivisions.filter(div => div._id === division._id)[0];
      selectedDivision.isSelected = true;
    });
    this.checkStatusCheckAll();
  }

  private checkStatusCheckAll() {
    this.hasSelectAll = this.allDivisions.every( (item) => {
      return item.isSelected === true;
    });
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  private initNewAnnounceForm() {
    this.editAnnounce = new FormGroup({
      assignTo: new FormControl(
        this.announce.assignTo
      ),
      content: new FormControl(
        this.announce.content,
        [
          Validators.required,
          Validators.minLength(50)
        ]
      )
    });
  }

  public onEditAnnounce() {
    this.editAnnounce.value.assignTo = this.allDivisions.filter(div => div.isSelected === true);
    this.editAnnounce.value._id = this.announce._id;
    this.announceService.updateAnAnnounce(this.editAnnounce.value).subscribe(
      data => this.emitValueToOutside(this.announce._id, this.editAnnounce.value),
      errors => this.announceService.handleError(errors)
    );
  }

  closeEditForm() {
    this.emitValueToOutside(this.announce._id, null);
  }

  private emitValueToOutside(id: string, editedAnnounce: boolean) {
    this.closeFormEventEmitter.emit({id, editedAnnounce});
  }

  onChangeCheckBoxDivision(id) {
    const changedDivision = this.allDivisions.filter(div => div._id === id)[0];
    changedDivision.isSelected = !changedDivision.isSelected;
    this.checkStatusCheckAll();
  }

  onChangeCheckBoxAllDivision() {
    this.allDivisions.forEach(division => {
      division.isSelected = !this.hasSelectAll;
    });
    this.checkStatusCheckAll();
  }
}
