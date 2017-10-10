import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NumberListComponent } from './number-list/number-list.component';
import { NumberPrefixPipe } from './number-prefix.pipe';
import { YellowColorDirective } from './yellow-color.directive';
import { ParagraphComponent } from './paragraph/paragraph.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberListComponent,
    NumberPrefixPipe,
    YellowColorDirective,
    ParagraphComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
