import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announce',
  templateUrl: './announce.component.html',
  styleUrls: ['./announce.component.css']
})
export class AnnounceComponent implements OnInit {
  public title = 'Announcements';
  public keywords: string;
  constructor() { }

  ngOnInit() {
    this.keywords = '';
  }
  getKeywords(e) {
    this.keywords = e;
  }
}
