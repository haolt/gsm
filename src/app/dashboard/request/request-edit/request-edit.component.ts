import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurentUserService } from '../../curent-user.service';
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
  public editedRequest: FormGroup;
  // public currentUser: any;
  // public currentTime: any;

  constructor(
    private curentUserService: CurentUserService,
    // private requestService: RequestService
  ) { }

  ngOnInit() {
    // this.curentUserService.getCurrentUser().subscribe((data) => {
    //   this.currentUser = data;
    // });
    // const currentTime = new Date();
    // this.currentTime = this.setTimeFormatToInputDateTimeLocal(currentTime);
    // this.editRequest.map((request) => {
    //   request =this.setTimeFormatToInputDateTimeLocal(currentTime);
    //   return request;
    // });
    this.createEditedRequest();
    console.log(this.editedRequest.value);
  }
  // 2019-07-30T07:26:00.000Z => format_value Input
  private fromJsonApiDateToDateTime(formatValueApiResponse: string) {

    const timeObj = new Date(formatValueApiResponse);

    const hours = timeObj.getHours();
    const mins = timeObj.getMinutes();
    const date = timeObj.getDate();
    let month = (timeObj.getMonth() + 1).toString();
    month = (month.length === 1) ? `0${month}` : month;
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
          value: this.editRequest._id,
          disabled: true
        },
        [
          Validators.required
        ]
      ),
      name: new FormControl(
        {
          value: this.editRequest.name,
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
    request.id = this.editRequest._id;
    console.log('suỬA NHÉ', request);
  }
}
