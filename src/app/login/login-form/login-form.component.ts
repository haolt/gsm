import { Component, OnInit } from '@angular/core';
import { MultilangsService } from 'src/app/multilangs/multilangs.service';
import { TranslateService } from '@ngx-translate/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './../login.service';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/core/cookie.service';
import { patternValidator } from '../../shared/pattern-validator';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  public curentLang: string;
  public defaultLoginUser = { email: '', password: ''};
  public loginUser: FormGroup;

  constructor(
    private translate: TranslateService,
    private multilangsService: MultilangsService,
    private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService
  ) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|vi/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.multilangsService.getSelectedLang().subscribe((lang) => {
      console.log(lang);
      this.curentLang = lang;
      this.translate.use(lang);
    });

    this.loginUser = new FormGroup({
      email: new FormControl(
        this.defaultLoginUser.email,
        [
          Validators.required,
          patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]
      ),
      password: new FormControl(
        this.defaultLoginUser.password,
        [
          Validators.required
        ]
      ),
    });
  }
  onLogin() {
    console.log(this.loginUser.value);
    this.loginService.doLogin(this.loginUser.value).subscribe(
      (res) => {
        console.log(res);
        this.cookieService.setCookie('token', res.token, 7);
        this.router.navigate(['dashboard']);
      },
      (err) => {
        this.loginService.handleError(err);
      }
    );
  }
}
