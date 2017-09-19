import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  template: `
          <h1 class="hello-world"> Hello world!</h1>`,
  styles: ['.hello-world { color: blue; }']
})
export class HelloWorldComponent {
}
