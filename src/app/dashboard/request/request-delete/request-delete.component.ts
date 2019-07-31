import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RequestService } from './../request.service';

@Component({
  selector: 'app-request-delete',
  templateUrl: './request-delete.component.html',
  styleUrls: ['./request-delete.component.css']
})

export class RequestDeleteComponent implements OnInit {
  @Input() request: any;
  @Output() closeFormEventEmitter = new EventEmitter();
  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit() {
  }

  deleteARequest() {
    this.requestService.deleteARequest(this.request._id).subscribe( (data) => {
        this.emitValueToOutside(this.request._id, true);
    });
  }

  closeModal() {
    this.emitValueToOutside(this.request._id, false);
  }

  private emitValueToOutside(id: string, hasDelete: boolean) {
    this.closeFormEventEmitter.emit({id, hasDelete});
  }
}
