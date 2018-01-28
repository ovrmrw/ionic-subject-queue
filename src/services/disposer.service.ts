import { Injectable } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class DisposerService {
  private subs: Subscription[] | null;

  set stack(subscription: Subscription) {
    this.subs.push(subscription);
  }

  constructor(view: ViewController) {
    this.subs = [];

    view.didLeave.subscribe(() => {
      if (this.subs) {
        this.subs.forEach(sub => sub.unsubscribe());
      }
      this.subs = null;
    });
  }
}
