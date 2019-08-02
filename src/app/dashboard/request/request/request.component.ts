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
  public curentUser: any;
  public isAdmin: boolean;
  public allRequests: any;
  public allRequestsResult: any;

  constructor(
    private requestService: RequestService,
    private curentUserService: CurentUserService
  ) { }

  private getAllRequests() {
    this.requestService.getAllRequests().subscribe((data) => {
      this.allRequests = data;
      this.allRequestsResult =  data;
      this.allRequestsResult = this.allRequestsResult.reverse();
      this.checkIsAdminToFilterRequest(this.curentUser, this.allRequestsResult);
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
    if (curentUser.role !== 'admin') {
      this.allRequestsResult = allRequests.filter(request => request.createdBy._id === curentUser._id);
    }
  }

  openModal() {
    this.isShowModal = !this.isShowModal;
  }

  onAddedRequest(request) {
    this.allRequestsResult.push(request);
    this.allRequestsResult = this.allRequestsResult.reverse();
  }

  onFilterFields(filterFields) {
    this.allRequests = this.allRequests.map((req) => {
      req.createdAtMonth = req.createdAt.slice(5, 7);
      return req;
    });

    this.allRequestsResult = this.allRequests.filter(req => req.createdAtMonth.includes(filterFields.month));
    this.allRequestsResult =  this.allRequestsResult.filter(req => req.status.includes(filterFields.status));
    this.allRequestsResult =  this.allRequestsResult.filter(req => req.type.includes(filterFields.type));
    this.checkIsAdminToFilterRequest(this.curentUser, this.allRequestsResult);
  }
}
