import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Author } from '../author/author.model';
import { Twimp } from './twimp.model';

@Injectable()
export class TwimpService {

  private urlTwimps: string = 'http://localhost:3000/twimps';
  private urlFavorite: string = 'http://localhost:3000/author-favorites';

  constructor(private http: Http) { }

  getTwimps(): Observable<Twimp[]> {
    let twimps: Twimp[] = [];

    return this.http.get(this.urlTwimps)
      .map(response => {
        let dbTwimpList: any = response.json();
        for(let i in dbTwimpList){
          let twimp: Twimp = new Twimp(dbTwimpList[i].id,
                                    'localhost:4200/twimp/' + dbTwimpList[i].id,
                                    new Author(dbTwimpList[i].author),
                                    dbTwimpList[i].content,
                                    dbTwimpList[i].timestamp
                                  );
          twimps.push(twimp);
        }
        return twimps;
      })
      .catch(this.handleError);
  }

  getFavoritesByAuthor(idAuthor: string, idTwimp: string): Observable<boolean> {
    return this.http.get(this.urlFavorite + '/' + idAuthor)
    .map(response => {
      let favorites: string[] = response.json().twimps;
      if (favorites.indexOf(idTwimp) == -1) {
        return false;
      } else {
        return true;
      }
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
