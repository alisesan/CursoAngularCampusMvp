import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthorService } from '../shared/author/author.service';

import { Author } from '../shared/author/author.model';

import { Token } from './token.model';
import { environment } from 'environments/environment';

@Injectable()
export class AuthenticationService {

  private url: string = environment.url + 'authenticated';

  token: Token = null;

  constructor(private http: Http,
              private router: Router,
              private authorService: AuthorService,
              ) { }

  login(idAuthor: string): void {
    this.authorService.getAuthor(idAuthor).subscribe(author => {
      let tokenGenerated = this.generateToken();
      this.saveSession(tokenGenerated, author.id).subscribe(response => {
        this.token = new Token(response['id'], response['author']);
        this.router.navigate(['/dashboard']);
      });
    });
  }

  logout(): void {
    this.deleteSession().subscribe(response => {
      this.token = null;
      this.router.navigate(['/login']);
    });
  }

  generateToken(): string {
    let date: number = new Date().getTime();
    let text: string = "";
    let possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5 ; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    text += date;

    return text;
  }

  saveSession(tokenGenerated: string, idAuthor: string): Observable<Object> {
    let session: Object = {'id': tokenGenerated, 'author': idAuthor};

    return this.http.post(this.url, session)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  deleteSession(): Observable<Object> {
    return this.http.delete(this.url + "/" + this.token.key)
      .map(response => {
        return response.json();
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
