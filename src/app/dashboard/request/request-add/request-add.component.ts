import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurentUserService } from '../../curent-user.service';
import { patternValidator } from 'src/app/shared/pattern-validator';

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
  public addRequest: FormGroup;
  public currentUser: any;
  public currentTime: any;

  constructor(
    private curentUserService: CurentUserService
  ) { }

  ngOnInit() {
    this.curentUserService.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
    });
    const currentTime = new Date();
    this.currentTime = this.setTimeFormatToInputDateTimeLocal(currentTime);
    this.createAddRequest();
  }

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

  private createAddRequest() {
    this.addRequest = new FormGroup({
      id: new FormControl(
        {
          value: this.currentUser._id,
          disabled: true
        },
        [
          Validators.required
        ]
      ),
      name: new FormControl(
        {
          value: this.currentUser.name,
          disabled: true
        },
        [
          Validators.required
        ]
      ),
      type: new FormControl(
        'in_late',
        [
          Validators.required
        ]
      ),
      checkTime: new FormControl(
        this.currentTime,
        [
          Validators.required,
          patternValidator(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/)
        ]
      ),
      compensationFromTime: new FormControl(
        this.currentTime,
        [
          Validators.required,
          patternValidator(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/)
        ]
      ),
      compensationToTime: new FormControl(
        this.currentTime,
        [
          Validators.required,
          patternValidator(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/)
        ]
      ),
      reason: new FormControl(
        '',
        Validators.required
      )
    });
  }
  onAddRequest() {
    console.log(this.addRequest.value);
    const request = this.addRequest.value;
    request.createdBy = this.currentUser._id;
    request.createdAt = new Date();
    request.status = 'pending';
    console.log(request);

    this.closeModal();
  }
}
