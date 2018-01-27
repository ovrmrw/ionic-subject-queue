import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/startWith";
import { QiitaService } from "../../services/qiita.service";
import { QiitaItem } from "../../types/index";
import { FocusService } from "../../services/focus.service";

@Component({
  selector: "page-use-observable-fromevent",
  templateUrl: "use-observable-fromevent.html",
  providers: [FocusService]
})
export class UseObservableFromEventPage {
  items: QiitaItem[];
  // items$: Promise<QiitaItem[]> | Observable<QiitaItem[]>;
  private eventHandler$: Subscription;

  constructor(
    private qiitaService: QiitaService,
    focusService: FocusService,
    view: ViewController
  ) {
    view.didEnter.subscribe(() => {
      focusService.focus("ion-input");

      const input = view.contentRef().nativeElement.querySelector("ion-input");
      this.eventHandler$ = Observable.fromEvent<KeyboardEvent>(input, "keyup")
        .debounceTime(200) // 200ms間隔が空くのを待つ。
        .map(event => (event.target as HTMLInputElement).value)
        .distinctUntilChanged() // 前回と違う値が流れてきたときだけ通す。
        .switchMap(text =>
          this.qiitaService.requestQiitaItemsByHttpClient(text)
        )
        .startWith([]) // this.items$の初期値をセットする。
        .subscribe(items => {
          this.items = items;
        });
    });

    view.didLeave.subscribe(() => {
      if (this.eventHandler$) {
        this.eventHandler$.unsubscribe();
      }
    });
  }

  clickItem(url: string): void {
    alert(url);
  }
}
