import { Injectable } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class DisposerService {
  private _subs: Subscription[] | null = [];
  set stack(subscription: Subscription) {
    this._subs.push(subscription);
  }

  constructor(view: ViewController) {
    view.didLeave.subscribe(() => {
      if (this._subs) {
        this._subs.forEach(sub => sub.unsubscribe());
      }
      this._subs = null;
    });
  }
}
