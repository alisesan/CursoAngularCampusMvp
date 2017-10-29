import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { AuthorService } from '../shared/author/author.service';
import { TwimpService } from '../shared/twimp/twimp.service';

import { Twimp } from '../shared/twimp/twimp.model';

@Component({
  selector: 'tweempus-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  twimpList: Twimp[] = [];

  constructor(private authorService: AuthorService,
              private twimpService: TwimpService) { }

  ngOnInit() {
    // this.authorService.getAuthor("2").subscribe(author => console.log(author));
    //this.twimpService.getTwimps().subscribe(twimps => this.twimpList = twimps);
    this.twimpService.getTwimps().subscribe(twimps => {
      Observable.from(twimps).subscribe(twimp => {
        this.authorService.getAuthor(twimp.author.id).subscribe(author => {
          twimp.author = author;
          this.twimpService.isFavoriteByAuthor("1", twimp.id).subscribe(favorite => {
            twimp.favorite = favorite;
            this.twimpList.push(twimp);
          });
        });
      });
    });
  }
}
