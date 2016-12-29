import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { CircleStoreService } from '../../services/circle.store.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
})
export class RootComponent implements OnInit {
  constructor(
    private router: Router,
    public circleStoreService: CircleStoreService,
  ) { }

  get isRegisterd() {
    return this.circleStoreService.isRegisterd;
  }

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
