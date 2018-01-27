import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { QiitaService } from "../../services/qiita.service";
import { QiitaItem } from "../../types/index";
import { FocusService } from "../../services/focus.service";

@Component({
  selector: "page-use-httpclient-asyncpipe",
  templateUrl: "use-httpclient-asyncpipe.html",
  providers: [FocusService]
})
export class UseHttpClientAsyncPipePage {
  // items: QiitaItem[];
  items$: Promise<QiitaItem[]> | Observable<QiitaItem[]>;

  constructor(
    private qiitaService: QiitaService,
    focusService: FocusService,
    view: ViewController
  ) {
    view.didEnter.subscribe(() => {
      focusService.focus("ion-input input");
    });
  }

  requestQiitaItems(text: string): void {
    this.items$ = this.qiitaService.requestQiitaItemsByHttpClient(text);
  }

  clickItem(url: string): void {
    alert(url);
  }
}
