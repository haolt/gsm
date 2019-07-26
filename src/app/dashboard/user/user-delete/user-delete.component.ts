import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from './../user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  @Input() user: any;
  @Output() closeFormEventEmitter = new EventEmitter();
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  deleteUser() {
    this.userService.deleteAUser(this.user._id).subscribe( (data) => {
        this.emitValueToOutside(this.user._id, true);
    });
  }

  closeModal() {
    this.emitValueToOutside(this.user._id, false);
  }

  private emitValueToOutside(id: string, hasDelete: boolean) {
    this.closeFormEventEmitter.emit({id, hasDelete});
  }
}
