import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit() {
    $(".button-collapse").sideNav({ draggable: true });
    this.router.events
      .filter(ev => ev instanceof NavigationStart)
      .subscribe(() => {
        setTimeout(() => {
          $('.button-collapse').sideNav('hide');
        }, 150);
      });

  }
}
