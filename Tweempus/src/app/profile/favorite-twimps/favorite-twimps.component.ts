import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { TwimpService } from '../../shared/twimp/twimp.service';
import { AuthorService } from '../../shared/author/author.service';

import { Twimp } from '../../shared/twimp/twimp.model';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'tweempus-favorite-twimps',
  templateUrl: './favorite-twimps.component.html',
  styleUrls: ['./favorite-twimps.component.css']
})
export class FavoriteTwimpsComponent implements OnInit {

  myfavoritestwimps: Twimp[] = [];
  idAuthor: string = null;

  constructor(private twimpService: TwimpService,
            private authorService: AuthorService,
            private route: ActivatedRoute,
            private router: Router) { }

  ngOnInit() {
    this.idAuthor = this.route.parent.snapshot.params['id'];
    this.twimpService.getTwimps().subscribe(twimps => {
      Observable.from(twimps).subscribe(twimp => {
        this.twimpService.isFavoriteByAuthor(this.idAuthor, twimp.id).subscribe(favorite =>{
          if (favorite) {
            twimp.favorite = favorite;
            this.authorService.getAuthor(twimp.author.id).subscribe(author =>{
              twimp.author = author;
              this.myfavoritestwimps.push(twimp);
            });
          }
        });
      });

    });
  }

}
