import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css'],
  animations: [
    trigger('add_request_dialog', [
      transition('void => *', [
        style({
          transform: 'scale3d(.5, .5, .5)',
          opacity: 0
        }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({
          transform: 'scale3d(.0, .0, .0)',
          opacity: 1
        }))
      ])
    ])
  ]
})

export class RequestDetailComponent implements OnInit {
  @Input() visible: boolean;
  @Input() request: any;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public currentUser: any;
  public currentTime: any;

  constructor() { }

  ngOnInit() { }

  private setTimeFormatToInputDateTimeLocal(time) {
    let day = time.getDate().toString();
    day = (day.length === 1) ? `0${day}` : day;
    let month = (time.getMonth() + 1).toString();
    month = (month.length === 1) ? `0${month}` : month;
    const year = time.getFullYear().toString();
    let hour = time.getHours().toString();
    hour = (hour.length === 1) ? `0${hour}` : hour;
    let mins = time.getMinutes().toString();
    mins = (mins.length === 1) ? `0${mins}` : mins;
    return `${year}-${month}-${day}T${hour}:${mins}`;
  }

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
