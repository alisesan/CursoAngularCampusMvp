import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AuthenticationService } from '../../../core/authentication.service';

import { Author } from '../author.model';

@Component({
  selector: 'tweempus-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css']
})
export class AuthorCardComponent {
  @Input() author: Author;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService) {
    }

  checkAuthor(): boolean {
    var profileAuthor = this.route.snapshot.params['id'];
    var loggedAuthor = this.authService.token.idAuthor;
    return profileAuthor === loggedAuthor;
  }
}
