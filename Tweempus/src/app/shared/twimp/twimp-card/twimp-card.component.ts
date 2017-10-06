import { Component, Input } from '@angular/core';
import { Twimp } from '../twimp.model';

@Component({
  selector: 'tweempus-twimp-card',
  templateUrl: './twimp-card.component.html',
  styleUrls: ['./twimp-card.component.css']
})
export class TwimpCardComponent {
  @Input() twimp: Twimp;

  changeFavorite(): void {
    this.twimp.favorite = !this.twimp.favorite;
    console.log("Is Favorite :", this.twimp.favorite);
  }
} 
