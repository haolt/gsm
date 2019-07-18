import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { CookieService } from '../core/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
      private router: Router,
      private cookieService: CookieService
  ) { }

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): boolean {
      const cookieToken = this.cookieService.getCookie('token');
      if (cookieToken) {
        // alert('có token');
        return false;
      } else {
        this.router.navigate(['login']);
        // alert('Ko có token');
        return true;
      }
  }
}
