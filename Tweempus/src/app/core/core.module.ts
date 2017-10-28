import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule
  ],
  declarations: [HeaderComponent, NavComponent],
  providers: [AuthGuardService, AuthenticationService],
  exports: [HeaderComponent, NavComponent]
})
export class CoreModule { }
