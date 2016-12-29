import { Component, OnInit } from '@angular/core';
import { CircleService } from '../../services/circle.service';
import { ICircleEntity, CircleEntity } from '../../entity/circle.entity';

@Component({
  templateUrl: './circle.component.html',
})
export class CircleComponent implements OnInit {
  private circle: CircleEntity;
  public name = '';
  constructor(public circleService: CircleService) { }

  ngOnInit() {
    this.circleService.get()
      .toPromise()
      .then(res => {
        const c = <ICircleEntity>res.json();
        if (!c) return;
        this.name = c.name;
        this.circle = new CircleEntity(c.id, c.twitter_id, c.name);
      });
  }

  onSave() {
    if (this.circle) {
      this.circle.name = this.name;
      this.circleService.update(this.circle).toPromise().then(res => {
        console.log(res.json());
      });
    } else {
      this.circleService.create(this.name).toPromise().then(res => {
        const c = <ICircleEntity>res.json();
        if (!c) return;
        this.name = c.name;
        this.circle = new CircleEntity(c.id, c.twitter_id, c.name);
      });
    }
  }
}
