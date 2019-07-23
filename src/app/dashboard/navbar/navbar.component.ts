import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../../core/cookie.service';
import { TokenService } from '../token.service';
import { User } from '../user.class';
import { LocalStorageService } from 'src/app/core/local-storage.service';
import { CurentUserService } from './../curent-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currentUser: User;
  // this.currentUser.name = 'Totoro Chan';

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private tokenService: TokenService,
    private curentUserService: CurentUserService
  ) { }

  ngOnInit() {
    const token = this.cookieService.getCookie('token');
    this.tokenService.getInfoByToken(token).subscribe(
      (data: User) => {
        this.currentUser = data;
        this.curentUserService.publishCurrentUser(data);
        this.curentUserService.publishIsAdmin(data.role);
      }
    );
  }

  goToDashboard() {
    this.router.navigate(['dashboard']);
  }

  goToMe() {
    this.router.navigate(['dashboard', 'me']);
  }

  onLogOut() {
    this.cookieService.eraseCookie('token');
    this.router.navigate(['login']);
  }
}
