import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-request-add',
  templateUrl: './request-add.component.html',
  styleUrls: ['./request-add.component.css'],
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
export class RequestAddComponent implements OnInit {
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
