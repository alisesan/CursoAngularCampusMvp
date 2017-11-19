import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Author } from './author.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthorService {

  private url: string = environment.url + 'authors';
  private urlFavorite: string = environment.url + 'author-favorites';

  constructor(private http: Http) { }

  getAuthors(): Observable<Author[]> {
    let authors: Author[] = [];

    return this.http.get(this.url)
      .map(response => {
        let dbAuthors: any = response.json();
        for(let i in dbAuthors) {
          let author: Author = new Author(dbAuthors[i].id);
          author.fullName = dbAuthors[i].fullName;
          author.image = dbAuthors[i].image;
          author.url = 'http://localhost:4200/profile/' + dbAuthors[i].id;

          authors.push(author);
        }
        return authors;
      })
      .catch(this.handleError);
  }

  getAuthor(id: string): Observable<Author> {
    let author: Author = null;
    return this.http.get(this.url + '/' + id )
      .map(response => {
        let dbAuthor: any = response.json();
        author = new Author(dbAuthor.id);
        author.fullName = dbAuthor.fullName;
        author.image = dbAuthor.image;
        author.url = 'http://localhost:4200/profile/' + dbAuthor.id;
        return author;
      })
      .catch(this.handleError);
  }

  setAuthor(idAuthor: string, fullName: string, image: string): Observable<any> {
    let dbAuthor: any = {'id': idAuthor, 'fullName': fullName, 'image': image};

    return this.http.post(this.url, dbAuthor)
      .map(response => response.json())
      .catch(this.handleError);
  }

  updateAuthor(idAuthor: string, fullName: string, image: string): Observable<any> {
    let dbAuthor: any = {'id': idAuthor, 'fullName': fullName, 'image': image};

    return this.http.put(this.url + '/' + idAuthor, dbAuthor)
      .map(response => response.json())
      .catch(this.handleError);
  }

  createFavorite(idAuthor: string): Observable<any> {
    let dbAuthorFav: any = { 'id': idAuthor, 'twimps': []};

    return this.http.post(this.urlFavorite, dbAuthorFav)
      .map(response => response.json())
      .catch(this.handleError);
  }

  handleError(error: any){
    let errMsg = (error.message) ? error.message :
      error.status ? `$(error.status) - $(error.statusText)` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
