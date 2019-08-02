import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-request-filter',
  templateUrl: './request-filter.component.html',
  styleUrls: ['./request-filter.component.css']
})

export class RequestFilterComponent implements OnInit {
  public month: string;
  public status: string;
  public type: string;
  
  @Output() filterFieldsEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    this.month = '';
    this.status = '';
    this.type = '';
  }

  filterRequests() {
    const filterFields = {
      month: this.month,
      status: this.status,
      type: this.type
    };
    this.filterFieldsEventEmitter.emit(filterFields);
  }
}
