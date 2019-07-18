import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MultilangsService } from 'src/app/multilangs/multilangs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isShowSideBar: boolean;

  constructor(
    private translate: TranslateService,
    private multilangsService: MultilangsService,
  ) { }
  ngOnInit() {
    this.isShowSideBar = true;
    this.multilangsService.getSelectedLang().subscribe((lang) => {
      console.log(lang);
      // this.curentLang = lang;
      this.translate.use(lang);
    });
  }

  toggleSidebar() {
    this.isShowSideBar = !this.isShowSideBar;
  }
}
