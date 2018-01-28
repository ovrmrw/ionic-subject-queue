import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
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
      .requestQiitaItemsByHttpClient(text)
      .do(() => this.responseCount++);
  }

  clickItem(url: string): void {
    alert(url);
  }
}
