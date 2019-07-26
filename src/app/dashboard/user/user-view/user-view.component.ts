import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {
  public title = ' User Managing / Account Information';
  public user: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    const id = this.getIDPassViaURL();
    this.getInformationAUser(id);
  }

  private getIDPassViaURL() {
    return this.activatedRoute.snapshot.paramMap.get('id');

  }

  private getInformationAUser(id) {
    this.userService.getAUser(id).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);

      },
      (errors) => {
        this.userService.handleError(errors);
        this.user = null;
      }
    );
  }

  ngOnDestroy() {
  }
}
