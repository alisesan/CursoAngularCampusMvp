import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { TwimpService } from '../../shared/twimp/twimp.service';
import { AuthenticationService } from '../../core/authentication.service';
import { AuthorService } from '../../shared/author/author.service';

import { Twimp } from '../../shared/twimp/twimp.model';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'tweempus-my-twimps',
  templateUrl: './my-twimps.component.html',
  styleUrls: ['./my-twimps.component.css']
})
export class MyTwimpsComponent implements OnInit {

  mytwimpslist: Twimp[] = [];
  idAuthor: string = null;

  constructor(private twimpService: TwimpService,
    private authService: AuthenticationService,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.idAuthor = this.route.parent.snapshot.params['id'];
    this.twimpService.getAuthorTwimps(this.idAuthor)
    .subscribe(mytwimps => {
      Observable.from(mytwimps).subscribe(twimp => {
        this.authorService.getAuthor(twimp.author.id).subscribe(author => {
          twimp.author = author;
          this.twimpService.isFavoriteByAuthor(this.idAuthor, twimp.id).subscribe(favorite =>{
            twimp.favorite = favorite;
            this.mytwimpslist.push(twimp);
          });
        });
      });
    });

  }

}
