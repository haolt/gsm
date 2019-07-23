import { Component, OnInit } from '@angular/core';
import { CurentUserService } from '../../curent-user.service';
import { UserService } from '../user.service';
import { CookieService } from 'src/app/core/cookie.service';
import { User } from '../../user.class';
import { DivisionService } from '../../division/division.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public title = 'User Managing';
  public keywords: string;
  public isAdmin: boolean;
  public allUsers: any;
  public allDivisions: any;

  constructor(
    private curentUserService: CurentUserService,
    private userService: UserService,
    private cookieService: CookieService,
    private divisionService: DivisionService
  ) { }

  ngOnInit() {
    this.keywords = '';
    this.curentUserService.getIsAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    const token = this.cookieService.getCookie('token');
    this.userService.getAllUsers(token).subscribe((data: User) => {
      this.allUsers = data;
    });
    this.divisionService.getAllDivisions(token).subscribe((data) => {
      this.allDivisions = data;
      // console.log(data);
    });
    // Mock data
  //   this.isAdmin = false;
  //   this.allUsers = [
  //     {
  //         "_id": "5d2df1fb452290230848fcf7",
  //         "name": "Snoopy",
  //         "email": "snoopy@hiworld.com",
  //         "role": "admin",
  //         "password": "$2a$08$FY8cvSyVBv/FRB5FpdTcTeat0HqBi2mlqIOplTj6tFAp4h9vl/tGm",
  //         "__v": 0,
  //         "avatar": "data:image/png;base64,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",
  //         "position": "Team Lead",
  //         "division": "Design Unit"
  //     },
  //     {
  //         "_id": "5d2fc8e3a317982e24126ab8",
  //         "name": "Hao Chan",
  //         "email": "haolt@hiworld.com",
  //         "role": "admin",
  //         "password": "$2a$08$FY8cvSyVBv/FRB5FpdTcTeat0HqBi2mlqIOplTj6tFAp4h9vl/tGm",
  //         "__v": 0,
  //         "avatar": "https://images.viblo.asia/60x60/45775073-006e-4b77-8373-8492620f4565.jpg",
  //         "position": "GL",
  //         "division": "Design Unit"
  //     },
  //     {
  //         "_id": "5d366390c5c9282bb010a87b",
  //         "name": "Pika Cheww",
  //         "email": "pikacheww@hiworld.com",
  //         "role": "staff",
  //         "password": "$2a$08$FY8cvSyVBv/FRB5FpdTcTeat0HqBi2mlqIOplTj6tFAp4h9vl/tGm",
  //         "__v": 0,
  //         "avatar": "http://cdn.trochoiviet.com/wp-content/uploads/2016/08/pikachu.jpg",
  //         "division": "Design Unit",
  //         "position": "Developer"
  //     },
  //     {
  //         "_id": "5d3663cfc5c9282bb010a87c",
  //         "name": "Doraemon Kun",
  //         "email": "doraemon@hiworld.com",
  //         "role": "staff",
  //         "password": "$2a$08$FY8cvSyVBv/FRB5FpdTcTeat0HqBi2mlqIOplTj6tFAp4h9vl/tGm",
  //         "__v": 0,
  //         "avatar": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJJid8RZ0yEGmGz3vYcB0m2AOPG1Umk1SkRFw_Gruiz5tEENT4",
  //         "division": "Division 1",
  //         "position": "Developer"
  //     },
  //     {
  //         "_id": "5d366408c5c9282bb010a87d",
  //         "name": "Totoro Chan",
  //         "email": "totorochan@hiworld.com",
  //         "role": "staff",
  //         "password": "$2a$08$FY8cvSyVBv/FRB5FpdTcTeat0HqBi2mlqIOplTj6tFAp4h9vl/tGm",
  //         "__v": 0,
  //         "avatar": "https://png.pngtree.com/element_origin_min_pic/16/08/16/1957b2f8786a777.jpg",
  //         "division": "D&R",
  //         "position": "Data Researcher"
  //     }
  // ];
    // End Mock data
  }
  getKeywords(e) {
    this.keywords = e;
  }
}
