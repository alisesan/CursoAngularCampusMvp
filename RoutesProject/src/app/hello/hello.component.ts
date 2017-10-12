import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  name: string;

  constructor(private route: ActivatedRoute,
  private router: Router) { }
  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
  }

}
