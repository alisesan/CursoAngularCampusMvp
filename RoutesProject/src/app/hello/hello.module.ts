import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelloRoutingModule } from './hello-routing.module';

import { HelloComponent } from './hello.component';

@NgModule({
  imports: [
    CommonModule,
    HelloRoutingModule
  ],
  declarations: [HelloComponent]
})
export class HelloModule { }
