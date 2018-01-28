import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
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
  selector: "page-use-subject-queue",
  templateUrl: "use-subject-queue.html",
  providers: [FocusService, DisposerService]
})
export class UseSubjectQueuePage {
  items: QiitaItem[];
  // items$: Promise<QiitaItem[]> | Observable<QiitaItem[]>;
  private queue$: Subject<string> = new Subject();
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

      disposer.stackWith = this.queue$
        .debounceTime(200) // 200ms間隔が空くのを待つ。
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

  requestQiitaItems(text: string): void {
    this.queue$.next(text);
  }

  clickItem(url: string): void {
    alert(url);
  }
}
