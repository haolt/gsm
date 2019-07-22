import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  public title = 'Requests';
  public keywords: string;
  public isShowModal: boolean;
  constructor() { }

  ngOnInit() {
    this.keywords = '';
    // this.isShowModal = false;
  }
  getKeywords(e) {
    this.keywords = e;
  }
  openModal() {
    this.isShowModal = !this.isShowModal;
  }
}
