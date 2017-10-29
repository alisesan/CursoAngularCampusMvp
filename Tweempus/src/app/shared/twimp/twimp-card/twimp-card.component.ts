import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import { TwimpService } from '../twimp.service';

import { Twimp } from '../twimp.model';

@Component({
  selector: 'tweempus-twimp-card',
  templateUrl: './twimp-card.component.html',
  styleUrls: ['./twimp-card.component.css']
})
export class TwimpCardComponent {
  @Input() twimp: Twimp;

  constructor(private twimpService: TwimpService){}

  setFavorite(): void {
    this.twimp.favorite = !this.twimp.favorite;
    this.twimpService.getFavoritesByAuthor("1").subscribe(twimps => {
      let favoriteTwimps = twimps;

      var index = favoriteTwimps.indexOf(this.twimp.id);

      if (this.twimp.favorite){
        if (index === -1) {
            favoriteTwimps.push(this.twimp.id);
        }
      }
      else {
        if(index !== -1) {
          favoriteTwimps.splice(index, 1);
        }
      }

      this.twimpService.setFavoritesByAuthor("1", favoriteTwimps).subscribe();
    });
  }
}
