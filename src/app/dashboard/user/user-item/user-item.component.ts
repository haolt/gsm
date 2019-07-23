import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  public isShowFilterForm = false;

  constructor() { }

  ngOnInit() {
  }

  showFilterForm() {
    this.isShowFilterForm = !this.isShowFilterForm;
  }

}
