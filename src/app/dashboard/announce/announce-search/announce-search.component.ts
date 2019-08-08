import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announce-search',
  templateUrl: './announce-search.component.html',
  styleUrls: ['./announce-search.component.css']
})
export class AnnounceSearchComponent implements OnInit {

  public keywords: string;
  public selectedDivisions = [];
  public divisionString: string;
  public hasShowSearchAdvance = false;
  @Input() allDivisions: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  onFilterAnnounces() {
    if (this.keywords && this.divisionString ) {
      this.router.navigate(
        ['/dashboard', 'announces'],
        {
          queryParams: {
            s: this.keywords,
            division: this.divisionString
          }
        }
      );
    } else if (this.keywords) {
      this.router.navigate(
        ['/dashboard', 'announces'],
        {
          queryParams: {
            s: this.keywords
          }
        }
      );
    } else if (this.divisionString) {
      this.router.navigate(
        ['/dashboard', 'announces'],
        {
          queryParams: {
            division: this.divisionString
          }
        }
      );
    } else {
      this.router.navigate(
        ['/dashboard', 'announces']
      );
    }
  }

  onChangeCheckboxDivison(abbr) {
    if (this.selectedDivisions.includes(abbr)) {
      this.selectedDivisions = this.selectedDivisions.filter(divAbbr => divAbbr !== abbr);
    } else {
      this.selectedDivisions.push(abbr);
    }
    this.divisionString = this.selectedDivisions.join(' ').trim();
  }

  onFilterAnnouncesAfter1Seconds() {
    setTimeout(() => {
      this.onFilterAnnounces();
    }, 1000);
  }

}
