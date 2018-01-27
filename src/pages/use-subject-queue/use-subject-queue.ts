import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/startWith";
import { QiitaService } from "../../services/qiita.service";
import { QiitaItem } from "../../types/index";
import { FocusService } from "../../services/focus.service";

@Component({
  selector: "page-use-subject-queue",
  templateUrl: "use-subject-queue.html",
  providers: [FocusService]
})
export class UseSubjectQueuePage {
  items: QiitaItem[];
  // items$: Promise<QiitaItem[]> | Observable<QiitaItem[]>;
  private queue$: Subject<string> = new Subject();
  private disposable$: Subscription;

  constructor(
    private qiitaService: QiitaService,
    focusService: FocusService,
    view: ViewController
  ) {
    view.didEnter.subscribe(() => {
      focusService.focus("ion-input");

      this.disposable$ = this.queue$
        .debounceTime(200)
        .distinctUntilChanged()
        .switchMap(text =>
          this.qiitaService.requestQiitaItemsByHttpClient(text)
        )
        .startWith([])
        .subscribe(items => {
          this.items = items;
        });
    });

    view.didLeave.subscribe(() => {
      if (this.disposable$) {
        this.disposable$.unsubscribe();
      }
    });
  }

  requestQiitaItems(text: string): void {
    // this.items$ = this.qiitaService.requestQiitaItemsByFetch(text);
    this.queue$.next(text);
  }

  clickItem(url: string): void {
    alert(url);
  }
}
