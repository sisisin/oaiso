import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { CircleStoreService } from '../../services/circle.store.service';
import { ProfileService } from '../../services/profile.service';
import { IProfile, Profile } from '../../entity/profile.entity';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  profile: Profile;
  constructor(
    private router: Router,
    public circleStoreService: CircleStoreService,
    public profileService: ProfileService,
  ) { }

  get isRegisterd() {
    return this.circleStoreService.isRegisterd;
  }

  get displayName() {
    if (!this.profile) return '';
    return this.profile.displayName;
  }

  get photo() {
    if (!this.profile) return '';
    return this.profile.photos[0].value;
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

    this.profileService.get()
      .toPromise()
      .then(res => {
        const p = res.json();
        this.profile = new Profile(p.id, p.photos, p.displayName);
        console.log(this.profile)
      });
  }
}
