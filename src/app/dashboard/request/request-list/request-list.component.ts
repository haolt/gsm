import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from './../request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  @Input() allRequests: any;
  @Input() isAdmin: boolean;
  public isShowModal: boolean;
  public isShowModalDetail: boolean;

  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit() {
    if (this.allRequests) {
      this.allRequests = this.allRequests.map((request) => {
        request.hasChecked = false;
        request.hasEditted = false;
        request.hasSeeDetail = false;
        return request;
      });
    }
  }

  handleStatusChange(id: string, e: any) {
    const type = e.target.value.toString();
    // API, edit for Admin
    this.requestService.updateARequest(id, type).subscribe((data) => {
      console.log(data);
    });
    // this.updateARequest({id, type});

    // VIEW
    const changedRequest = this.allRequests.filter(request => request._id === id)[0];
    changedRequest.status = type;
  }

  openModalEdit(id: string) {
    const editRequest = this.allRequests.filter((request) => request._id === id)[0];
    editRequest.hasEditted = true;
    this.isShowModal = !this.isShowModal;
  }

  openModalSeeDetail(id: string) {
    const editRequest = this.allRequests.filter((request) => request._id === id)[0];
    editRequest.hasSeeDetail = true;
    this.isShowModalDetail = !this.isShowModalDetail;
  }
  // updateARequest(request) {
  //   this.requestService._updateARequest_version_full(request).subscribe((data) => {
  //     console.log(data);
  //   });
  // }
}
