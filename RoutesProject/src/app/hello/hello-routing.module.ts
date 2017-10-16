import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HelloComponent } from './hello.component';

const helloRoutes: Routes = [
    { path: 'hello/:name', component: HelloComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(helloRoutes)
    ]
})
export class HelloRoutingModule { }
