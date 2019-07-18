import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from './core/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private cookieService: CookieService,
    private router: Router
  ) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|vi/) ? browserLang : 'en');
    // RegEx
  }

  ngOnInit(): void {
    if ( this.cookieService.getCookie !== null ) {
      this.router.navigate(['dashboard']);
    }
  }
}
