import { Component, OnInit } from '@angular/core';
import { CurentUserService } from '../../curent-user.service';
import { User } from '../../user.class';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  public currentUser: User;

  constructor(
    private curentUserService: CurentUserService
  ) { }

  ngOnInit() {
    this.curentUserService.getCurrentUser().subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

}
