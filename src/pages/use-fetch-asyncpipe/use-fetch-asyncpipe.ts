import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { QiitaService } from "../../services/qiita.service";
import { QiitaItem } from "../../types/index";
import { FocusService } from "../../services/focus.service";

@Component({
  selector: "page-use-fetch-asyncpipe",
  templateUrl: "use-fetch-asyncpipe.html",
  providers: [FocusService]
})
export class UseFetchAsyncPipePage {
  // items: QiitaItem[];
  items$: Promise<QiitaItem[]> | Observable<QiitaItem[]>;
  requestCount: number = 0;
  responseCount: number = 0;

  constructor(
    private qiitaService: QiitaService,
    focusService: FocusService,
    view: ViewController
  ) {
    view.didEnter.subscribe(() => {
      focusService.focus("ion-input");
    });
  }

  requestQiitaItems(text: string): void {
    this.requestCount++;
    this.items$ = this.qiitaService
      .requestQiitaItemsByFetch(text)
      .then(items => {
        this.responseCount++;
        return items;
      });
  }

  clickItem(url: string): void {
    alert(url);
  }
}
