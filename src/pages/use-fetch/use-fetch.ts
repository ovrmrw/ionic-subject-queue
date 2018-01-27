import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import { QiitaService } from "../../services/qiita.service";
import { QiitaItem } from "../../types/index";
import { FocusService } from "../../services/focus.service";

@Component({
  selector: "page-use-fetch",
  templateUrl: "use-fetch.html",
  providers: [FocusService]
})
export class UseFetchPage {
  items: QiitaItem[];
  items$: Promise<QiitaItem[]> | Observable<QiitaItem[]>;

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
    this.items$ = this.qiitaService.requestQiitaItemsByFetch(text);
    this.items$.then(items => {
      this.items = items;
    });
  }

  clickItem(url: string): void {
    alert(url);
  }
}
