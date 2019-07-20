import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  public keywords: string;
  @Input() title: string;
  @Output() getKeywordsEventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.keywords = '';
  }
  getKeywords() {
    this.getKeywordsEventEmitter.emit(this.keywords);
  }
}
