import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../../core/authentication.service';
import { AuthorService } from '../../shared/author/author.service';

import { SharedService } from '../../shared/shared.service';

import { Author } from '../../shared/author/author.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editUserForm: FormGroup;
  userAlreadyExist: boolean = false;
  meAuthor: Author = null;

  constructor(private authorService: AuthorService,
    private authService: AuthenticationService,
    private sharedService: SharedService,
    private fb: FormBuilder) { }

  ngOnInit() {
    var idAuthor = this.authService.token.idAuthor;
    this.editUserForm = new FormGroup({
      idAuthor: new FormControl(),
      fullName: new FormControl(),
      image: new FormControl()
   });
    this.authorService.getAuthor(idAuthor).subscribe(author => {
      this.meAuthor = author;
      this.editUserForm = this.fb.group({
        idAuthor: [author.id, [Validators.required, this.checkNick]],
        fullName: [author.fullName, [Validators.required, Validators.minLength(3)]],
        image: [author.image]
      });
    });
  }

  checkNick(fc: FormControl): { [invalidNick: string]: boolean}  {
    const nick = fc.value,
      regexp = new RegExp('^[a-zA-Z0-9]*$');

    if (regexp.test(nick)) {
      return null;
    } else {
      return { 'invalidNick': true };
    }
  }

  editProfile(form: any) {
    if (this.userAlreadyExist) {
      this.userAlreadyExist = false;
    }

    this.authorService.getAuthors().subscribe(authors => {
      Observable.from(authors).subscribe(author => {
        if (author.id !== this.meAuthor.id) {
          this.authorService.getAuthor(author.id).subscribe(
            distinctAuthor => {
              if (distinctAuthor.id === form.value.idAuthor) {
                this.userAlreadyExist = true;
              }
            },
            error => {
              this.userAlreadyExist = this.userAlreadyExist && false;
            }
          );
        }
      });
      if (!this.userAlreadyExist) {
        this.authorService.updateAuthor(form.value.idAuthor, form.value.fullName, form.value.image).subscribe(response => {
          this.authorService.getAuthor(form.value.idAuthor).subscribe(author => {
            this.sharedService.emitChange(author);
          });
        });
      }
    });
  }
}
