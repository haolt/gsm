import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  public title = 'Requests';
  public isShowModal: boolean;
  constructor() { }

  ngOnInit() {
    // this.isShowModal = false;
  }
  openModal() {
    this.isShowModal = !this.isShowModal;
  }
}
