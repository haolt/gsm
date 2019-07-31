import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { CurentUserService } from '../../curent-user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})

export class RequestComponent implements OnInit {
  public title = 'Requests';
  public isShowModal: boolean;
  public curentUser: any;
  public isAdmin: boolean;
  public allRequests: any;

  constructor(
    private requestService: RequestService,
    private curentUserService: CurentUserService
  ) { }

  private getAllRequests() {
    this.requestService.getAllRequests().subscribe((data) => {
      this.allRequests = data;
      this.allRequests = this.allRequests.reverse();
      console.log(this.allRequests);
      this.checkIsAdminToFilterRequest(this.curentUser, this.allRequests);
    });
  }

  ngOnInit() {
    this.curentUserService.getCurrentUser().subscribe(data => {
      this.curentUser = data;
      this.isAdmin = this.curentUser.role === 'admin';
      this.getAllRequests();
    });
    // this.isShowModal = false;
  }

  private checkIsAdminToFilterRequest(curentUser, allRequests) {
    // console.log(curentUser, allRequests);

    if (curentUser.role !== 'admin') {
      this.allRequests = allRequests.filter(request => request.createdBy._id === curentUser._id);
    }
  }

  openModal() {
    this.isShowModal = !this.isShowModal;
  }
}
