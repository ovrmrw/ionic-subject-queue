import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import { QiitaService } from "../../services/qiita.service";
import { QiitaItem } from "../../types/index";
import { FocusService } from "../../services/focus.service";

@Component({
  selector: "page-use-subject-queue",
  templateUrl: "use-subject-queue.html",
  providers: [FocusService]
})
export class UseSubjectQueuePage {
  // items: QiitaItem[];
  items$: Promise<QiitaItem[]> | Observable<QiitaItem[]>;
  queue$: Subject<string> = new Subject();

  constructor(
    private qiitaService: QiitaService,
    focusService: FocusService,
    view: ViewController
  ) {
    view.didEnter.subscribe(() => {
      focusService.focus("ion-input input");

      this.items$ = this.queue$
        .debounceTime(200)
        .distinctUntilChanged()
        .switchMap(text =>
          this.qiitaService.requestQiitaItemsByHttpClient(text)
        );
    });

    view.didLeave.subscribe(() => {
      this.queue$.unsubscribe();
    });
  }

  requestQiitaItems(text: string): void {
    // this.items$ = this.qiitaService.requestQiitaItemsByFetch(text);
    // this.items$.then(items => {
    //   this.items = items;
    // });
    this.queue$.next(text);
  }

  clickItem(url: string): void {
    alert(url);
  }
}
