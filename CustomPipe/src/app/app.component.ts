import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  value: number = 23.56782;
  cadena: Array<string> = ['a','b','c', 'd','e','f'];
  fecha: number = Date.now();
  fecha2: Date = new Date(2017,9,33);
  precio: number = 29.99;
  object: Object = {foo: 'bar', baz: 'qux', nested: {xyz: 3, numbers: [1, 2, 3, 4, 5]}};
  nombre: string = 'alicia serrano';
  numero: number = 0.2345;
}
