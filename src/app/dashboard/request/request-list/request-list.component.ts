import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from './../request.service';
import { CurentUserService } from '../../curent-user.service';

// import { HttpClient } from '@angular/common/http';
// import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit, OnDestroy {

  public isAdmin: boolean;
  public allRequests: any;

  constructor(
    private requestService: RequestService,
    private curentUserService: CurentUserService
  ) { }

  ngOnInit() {
    this.getAllRequests();
    this.curentUserService.getIsAdmin().subscribe(data => {
      this.isAdmin = data;
    });
    // this.requestService._getAllUsers_version_mergeMap().subscribe((data) => console.log(data));
  }

  private getAllRequests() {
    this.requestService.getAllUsers().subscribe((data) => {
      this.allRequests = data;
      this.allRequests = this.allRequests.reverse().map((request) => {
        request.hasChecked = false;
        return request;
      });
      // console.log(this.allRequests);
    });
  }

  handleStatusChange(id: string, e: any) {
    console.log(id, e);
    const type = e.target.value.toString();
    // API
    this.requestService.updateARequest(id, type).subscribe((data) => {
      console.log(data);
    });
    // VIEW
    const changedRequest = this.allRequests.filter(request => request._id === id)[0];
    changedRequest.status = type;

  }

  ngOnDestroy() {
    // this.curentUserService.getIsAdmin().unsubscribe();
  }
}
