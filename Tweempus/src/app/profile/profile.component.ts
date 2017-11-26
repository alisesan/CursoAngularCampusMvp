import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthorService } from '../shared/author/author.service';

import { SharedService } from '../shared/shared.service';

import { Author } from '../shared/author/author.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'tweempus-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  idAuthor: string = null;
  author: Author = null;
  subscription: Subscription

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService,
    private sharedService: SharedService ) {
      this.subscription = sharedService.changeEmitted$.subscribe(
        author => {
          this.author = author;
        }
      );
    }

  ngOnInit() {
    this.idAuthor = this.route.snapshot.params['id'];
    this.authorService.getAuthor(this.idAuthor).subscribe(author => {
      this.author = author;
    });


  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
