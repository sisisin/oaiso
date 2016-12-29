import { Component, OnInit } from '@angular/core';
import { CircleService } from '../../services/circle.service';
import { CircleStoreService } from '../../services/circle.store.service';
import { ICircleEntity, CircleEntity } from '../../entity/circle.entity';

@Component({
  templateUrl: './circle.component.html',
})
export class CircleComponent implements OnInit {
  private circle: CircleEntity;
  public name = '';
  constructor(
    public circleService: CircleService,
    private circleStoreService: CircleStoreService,
  ) { }

  ngOnInit() {
    this.circleService.get()
      .toPromise()
      .then(res => {
        const c = <ICircleEntity>res.json();
        if (!c) {
          this.circleStoreService.isRegisterd = false;
          return;
        }
        this.name = c.name;
        this.circle = new CircleEntity(c.id, c.twitter_id, c.name);
      });
  }

  onSave() {
    if (this.circle) {
      this.circle.name = this.name;
      this.circleService.update(this.circle).toPromise().then(res => {
        Materialize.toast('サークル名を更新しました', 5000);
      });
    } else {
      this.circleService.create(this.name).toPromise().then(res => {
        const c = <ICircleEntity>res.json();
        if (!c) return;
        this.name = c.name;
        this.circle = new CircleEntity(c.id, c.twitter_id, c.name);
        this.circleStoreService.isRegisterd = true;
        Materialize.toast('サークルを登録しました', 5000);        
      });
    }
  }
}
