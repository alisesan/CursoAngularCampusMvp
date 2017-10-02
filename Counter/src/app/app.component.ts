import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  appValue: number = 3;

  eventListener(event): void {
    this.appValue = event;
  }
}
