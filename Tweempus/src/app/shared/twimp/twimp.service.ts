import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Author } from '../author/author.model';
import { Twimp } from './twimp.model';
import { environment } from 'environments/environment';

@Injectable()
export class TwimpService {

  private urlTwimps: string = environment.url + 'twimps';
  private urlFavorite: string = environment.url + 'author-favorites';

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

  getAuthorTwimps(idAuthor: string): Observable<Twimp[]> {
    let twimps: Twimp[] = [];

    return this.http.get(this.urlTwimps)
    .map(response => {
      let dbTwimpList: any = response.json();
      for(let i in dbTwimpList){
        if(dbTwimpList[i].author === idAuthor) {
          let twimp: Twimp = new Twimp(dbTwimpList[i].id,
            'localhost:4200/twimp/' + dbTwimpList[i].id,
            new Author(dbTwimpList[i].author),
            dbTwimpList[i].content,
            dbTwimpList[i].timestamp
          );
          twimps.push(twimp);
        }
      }
      return twimps;
    })
    .catch(this.handleError);

  }

  isFavoriteByAuthor(idAuthor: string, idTwimp: string): Observable<boolean> {
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

  getFavoritesByAuthor(idAuthor: string): Observable<string[]> {
    return this.http.get(this.urlFavorite + '/' + idAuthor)
    .map(response => {
      let favorites: string[] = response.json().twimps;
      return favorites;
    })
    .catch(this.handleError);
  }

  setFavoritesByAuthor(idAuthor: string, twimps: string[]): Observable<boolean> {
    let body: Object = {'twimps': twimps};

    return this.http.put(this.urlFavorite + '/' + idAuthor, body)
    .map(response => {
      return response.json();
    })
    .catch(this.handleError);
  }

  setTwimp(twimp: Twimp): Observable<any> {
    let dbTwimp: any = {
      'id': twimp.id,
      'author': twimp.author.id,
      'by': twimp.author.fullName,
      'content': twimp.content,
      'timestamp': twimp.timestamp
    };

    return this.http.post(this.urlTwimps, dbTwimp)
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
