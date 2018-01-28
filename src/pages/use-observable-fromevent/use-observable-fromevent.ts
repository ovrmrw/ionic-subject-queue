import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/do";
import { QiitaService } from "../../services/qiita.service";
import { QiitaItem } from "../../types/index";
import { FocusService } from "../../services/focus.service";
import { DisposerService } from "../../services/disposer.service";

@Component({
  selector: "page-use-observable-fromevent",
  templateUrl: "use-observable-fromevent.html",
  providers: [FocusService, DisposerService]
})
export class UseObservableFromEventPage {
  items: QiitaItem[];
  // items$: Promise<QiitaItem[]> | Observable<QiitaItem[]>;
  requestCount: number = 0;
  responseCount: number = 0;

  constructor(
    private qiitaService: QiitaService,
    focusService: FocusService,
    disposer: DisposerService,
    view: ViewController
  ) {
    view.didEnter.subscribe(() => {
      focusService.focus("ion-input");

      const input = view.contentRef().nativeElement.querySelector("ion-input");
      disposer.stack = Observable.fromEvent<KeyboardEvent>(input, "keyup")
        .debounceTime(200) // 200ms間隔が空くのを待つ。
        .map(event => (event.target as HTMLInputElement).value)
        .distinctUntilChanged() // 前回と違う値が流れてきたときだけ通す。
        .do(() => this.requestCount++) // リクエストが送られた回数をカウントする。
        .switchMap(
          // 未完了のリクエストをいい感じにキャンセルする。
          text =>
            this.qiitaService
              .requestQiitaItemsByHttpClient(text)
              .do(() => this.responseCount++) // レスポンスが返ってきた回数をカウントする。
        )
        .startWith([]) // this.itemsの初期値をセットする。
        .subscribe(items => {
          this.items = items;
        });
    });
  }

  clickItem(url: string): void {
    alert(url);
  }
}
