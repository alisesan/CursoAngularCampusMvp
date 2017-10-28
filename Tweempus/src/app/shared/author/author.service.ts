import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Author } from './author.model';

@Injectable()
export class AuthorService {

  private url: string = 'http://localhost:3000/authors';

  constructor(private http: Http) { }

  getAuthor(id: string): Observable<Author> {
    let author: Author = null;

    return this.http.get(this.url + '/' + id )
      .map(response => {
        let dbAuthor: any = response.json();
        author = new Author(dbAuthor.id);
        author.fullName = dbAuthor.fullName;
        author.image = dbAuthor.image;
        author.url = 'http://localhost:4200/author/'+ dbAuthor.id;
        return author;
      })
      .catch(this.handleError);
  }

  handleError(error: any){
    let errMsg = (error.message) ? error.message :
      error.status ? `$(error.status) - $(error.statusText)` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
