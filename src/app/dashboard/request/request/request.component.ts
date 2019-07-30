import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { CurentUserService } from '../../curent-user.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  public title = 'Requests';
  public isShowModal: boolean;
  // public isAdmin: boolean;
  // public allRequests: any;

  constructor(
    private requestService: RequestService,
    private curentUserService: CurentUserService
  ) { }

  // private getAllRequests() {
  //   this.requestService.getAllUsers().subscribe((data) => {
  //     this.allRequests = data;
  //     this.allRequests = this.allRequests.reverse().map((request) => {
  //       request.hasChecked = false;
  //       return request;
  //     });
  //     // console.log(this.allRequests);
  //   });
  // }
  ngOnInit() {
    // this.curentUserService.getIsAdmin().subscribe(data => {
    //   this.isAdmin = data;
    // });
    // this.isShowModal = false;
  }
  openModal() {
    this.isShowModal = !this.isShowModal;
  }
}
