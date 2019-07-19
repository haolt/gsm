import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from '../../core/cookie.service';
import { TokenService } from '../token.service';
import { User } from '../user.class';

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
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    const token = this.cookieService.getCookie('token');
    this.tokenService.getInfoByToken(token).subscribe(
      (data: User) => {
        console.log(data);
        this.currentUser = data;
      }
    );
  }

  onLogOut() {
    this.cookieService.eraseCookie('token');
    this.router.navigate(['login']);
  }
}
