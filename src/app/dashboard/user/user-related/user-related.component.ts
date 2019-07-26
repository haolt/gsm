import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user-related',
  templateUrl: './user-related.component.html',
  styleUrls: ['./user-related.component.css']
})
export class UserRelatedComponent implements OnInit {
  @Input() exceptId: string;
  private allUsers: any;
  public relatedUsers: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data => {
      this.allUsers = data;
      this.relatedUsers = this.allUsers.filter((user) => user._id !== this.exceptId).reverse().slice(0, 9);
    }));
  }
}
