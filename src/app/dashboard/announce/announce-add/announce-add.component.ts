import { Component, OnInit, Input } from '@angular/core';
import { DivisionService } from 'src/app/dashboard/division/division.service';
import { Subscription } from 'rxjs';

import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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


  constructor(
    private divisionService: DivisionService
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
      voted: new FormControl([])
    });
  }

  public onAddAnnounce() {
    this.isShowAddForm = !this.isShowAddForm;
    console.log(this.newAnnounce.value);
  }

  onChangeADivision(id) {
    const assignToArr = this.newAnnounce.value.assignTo;
    if ( assignToArr.includes(id)) {
      this.newAnnounce.value.assignTo = assignToArr.filter((divId) => divId !== id);
    } else {
      assignToArr.push(id);
    }

    console.log(this.newAnnounce.value.assignTo);
  }

}
