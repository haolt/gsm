import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from './../request.service';
import { CurentUserService } from '../../curent-user.service';

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
  }

  private getAllRequests() {
    this.requestService.getAllUsers().subscribe((data) => {
      this.allRequests = data;
      this.allRequests = this.allRequests.map((request) => {
        request.hasChecked = false;
        return request;
      });
      console.log(this.allRequests);

    });
  }

  ngOnDestroy() {
    // this.curentUserService.getIsAdmin().unsubscribe();
  }
}
