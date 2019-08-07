import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CurentUserService } from './../../curent-user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-announce-item-reaction',
  templateUrl: './announce-item-reaction.component.html',
  styleUrls: ['./announce-item-reaction.component.css']
})

export class AnnounceItemReactionComponent implements OnInit, OnDestroy {

  @Input() announce: any;
  public votes: string[];
  public currentUser: any;
  public subscription: Subscription;
  // public isUpvoteActive: boolean;
  // public isDownvoteActive: boolean;

  constructor(
    private curentUserService: CurentUserService
  ) { }

  ngOnInit() {
    this.votes = this.announce.votes;
    this.subscription = this.curentUserService.getCurrentUser().subscribe((data) => {
      this.currentUser = data;
      // this.checkStatusVotes();
    });
  }

  private checkStatusVotes() {
    // console.log(this.votes);
    // console.log(this.currentUser._id);
    // console.log(this.votes);
    // this.isDownvoteActive = this.votes.includes(this.currentUser._id) ? false : true ;
    // this.isUpvoteActive = this.votes.includes(this.currentUser._id) ? false : true;
  }

  onVoteForAnnounce() {
    if (this.votes.includes(this.currentUser._id)) {
      // Downvote
      this.votes = this.votes.filter((idUser) => idUser !== this.currentUser._id);
    } else {
      // Upvote
      this.votes.push(this.currentUser._id);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
