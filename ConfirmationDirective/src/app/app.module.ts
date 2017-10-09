import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyButtonComponent } from './my-button/my-button.component';
import { ConfirmationPanelDirective } from './confirmation-panel.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyButtonComponent,
    ConfirmationPanelDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
