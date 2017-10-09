import { Component } from '@angular/core';

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html'
})
export class MyButtonComponent {
  save () {
    console.log("He guardado los datos");
  }
}
