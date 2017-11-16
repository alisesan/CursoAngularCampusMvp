import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { TwimpService } from '../../shared/twimp/twimp.service';
import { AuthenticationService } from '../../core/authentication.service';

import { Twimp } from '../../shared/twimp/twimp.model';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'tweempus-my-twimps',
  templateUrl: './my-twimps.component.html',
  styleUrls: ['./my-twimps.component.css']
})
export class MyTwimpsComponent implements OnInit {

  mytwimpslist: Array<Twimp> = null;
  //mytwimpslist: Twimp[] = [];
  idAuthor: string = null;

  constructor(private twimpService: TwimpService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.idAuthor = this.route.parent.snapshot.params['id'];
    this.twimpService.getAuthorTwimps(this.idAuthor)
    .subscribe(response => {
      console.log(response);
      this.mytwimpslist = response;
    });

  }

}
