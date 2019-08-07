import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AnnounceService } from './../announce.service';

@Component({
  selector: 'app-announce-delete',
  templateUrl: './announce-delete.component.html',
  styleUrls: ['./announce-delete.component.css']
})
export class AnnounceDeleteComponent implements OnInit {

  @Input() announce: any;
  @Output() closeFormEventEmitter = new EventEmitter();

  constructor(
    private announceService: AnnounceService
  ) { }

  ngOnInit() {
  }

  deleteAnAnnounce() {
    this.announceService.deleteAnAnnounce(this.announce._id).subscribe(
      data => this.emitValueToOutside(this.announce._id, true),
      errors => this.announceService.handleError(errors)
    );
  }

  closeModal() {
    this.emitValueToOutside(this.announce._id, false);
  }
  private emitValueToOutside(id: string, hasDelete: boolean) {
    this.closeFormEventEmitter.emit({id, hasDelete});
  }
}
