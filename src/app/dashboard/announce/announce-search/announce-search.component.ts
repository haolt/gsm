import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announce-search',
  templateUrl: './announce-search.component.html',
  styleUrls: ['./announce-search.component.css']
})
export class AnnounceSearchComponent implements OnInit {

  public keywords: string;
  @Input() allDivisions: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  onFilterAnnounces() {
    if (this.keywords) {
      this.router.navigate(['/dashboard', 'announces'], { queryParams: { s: this.keywords }, queryParamsHandling: 'merge'});
    } else {
      this.router.navigate(['/dashboard', 'announces']);
    }
  }
  onFilterAnnouncesAfter2Seconds() {
    setTimeout(() => {
      this.onFilterAnnounces();
    }, 1000);
  }
}
