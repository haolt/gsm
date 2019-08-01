import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { patternValidator } from 'src/app/shared/pattern-validator';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css'],
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
export class RequestEditComponent implements OnInit {

  @Input() visible: boolean;
  @Input() editRequest: any;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() editedRequestEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  public editedRequest: FormGroup;

  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.createEditedRequest();
  }

  // 2019-07-30T07:26:00.000Z => format_value Input
  private fromJsonApiDateToDateTime(formatValueApiResponse: string) {

    const timeObj = new Date(formatValueApiResponse);

    let date = timeObj.getDate().toString();
    date = (date.length === 1) ? `0${date}` : date;

    let month = (timeObj.getMonth() + 1).toString();
    month = (month.length === 1) ? `0${month}` : month;

    let mins = timeObj.getMinutes().toString();
    mins = (mins.length === 1) ? `0${mins}` : mins;

    let hours = timeObj.getHours().toString();
    hours = (hours.length === 1) ? `0${hours}` : hours;

    const year = timeObj.getFullYear();
    return `${year}-${month}-${date}T${hours}:${mins}`;
  }

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  private createEditedRequest() {
    this.editedRequest = new FormGroup({
      id: new FormControl(
        {
          value: this.editRequest.createdBy._id,
          disabled: true
        },
        [
          Validators.required
        ]
      ),
      name: new FormControl(
        {
          value: this.editRequest.createdBy.name,
          disabled: true
        },
        [
          Validators.required
        ]
      ),
      type: new FormControl(
        this.editRequest.type,
        [
          Validators.required
        ]
      ),
      checkTime: new FormControl(
        this.fromJsonApiDateToDateTime(this.editRequest.checkTime),
        [
          Validators.required,
          patternValidator(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/)
        ]
      ),
      compensationFromTime: new FormControl(
        this.fromJsonApiDateToDateTime(this.editRequest.compensationFromTime),
        [
          Validators.required,
          patternValidator(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/)
        ]
      ),
      compensationToTime: new FormControl(
        this.fromJsonApiDateToDateTime(this.editRequest.compensationToTime),
        [
          Validators.required,
          patternValidator(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/)
        ]
      ),
      reason: new FormControl(
        this.editRequest.reason,
        Validators.required
      )
    });
  }

  onEditRequest() {
    const request = this.editedRequest.value;
    request._id = this.editRequest._id;

    this.requestService.updateARequest(request).subscribe(data => {
      this.editedRequestEventEmitter.emit(data);
      // console.log('Nomal User edited: ', data);
    });
    this.closeModal();
  }
}
