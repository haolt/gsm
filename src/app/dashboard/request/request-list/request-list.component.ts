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
        request.hasDisplayDeleteForm = false;
        request.hasSeeDetail = false;
        return request;
      });
    }
  }

  handleStatusChange(id: string, e: any) {
    // handleStatusChange(_id: string, e: any) {
    const status = e.target.value.toString();
    // API, edit for Admin
    // this.requestService.updateARequestForAdmin(id, type).subscribe((data) => {
    //   console.log('Admin edited: ', data);
    // });
    this.requestService.updateARequest({ _id : id, status}).subscribe(data => {
      console.log('Admin edited: ', data);
    });

    // VIEW
    const changedRequest = this.allRequests.filter(request => request._id === id)[0];
    changedRequest.status = status;
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

  handleClickDeleteBtn(id) {
    const deletedRequest = this.allRequests.filter((user) => user._id === id)[0];
    deletedRequest.hasDisplayDeleteForm = true;
  }

  onCloseModalDelete({id, hasDelete}) {
    const deletedRequest = this.allRequests.filter((user) => user._id === id)[0];
    if (deletedRequest ) {
      deletedRequest.hasDisplayDeleteForm = false;
    }
    if (hasDelete) {
      this.allRequests = this.allRequests.filter((user) => user._id !== id);
    }
  }

  onEditRequest(req) {
    console.log(this.allRequests);

    console.log(req);
    const editedReq = this.allRequests.filter(request => request._id === req._id)[0];
    // editedReq = {...req}; why not works :((
    editedReq.checkTime = req.checkTime;
    editedReq.compensationFromTime = req.compensationFromTime;
    editedReq.compensationToTime = req.compensationToTime;
    editedReq.createdAt = req.createdAt;
    editedReq.createdBy = req.createdBy;
    editedReq.reason = req.reason;
    editedReq.status = req.status;
    editedReq.type = req.type;
    editedReq._id = req._id;
  }
}
