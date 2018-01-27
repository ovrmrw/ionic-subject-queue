import { Component } from "@angular/core";
import { ViewController } from "ionic-angular";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import { QiitaService } from "../../services/qiita.service";
import { QiitaItem } from "../../types/index";
import { FocusService } from "../../services/focus.service";

@Component({
  selector: "page-use-observable-fromevent",
  templateUrl: "use-observable-fromevent.html",
  providers: [FocusService]
})
export class UseObservableFromEventPage {
  // items: QiitaItem[];
  items$: Promise<QiitaItem[]> | Observable<QiitaItem[]>;

  constructor(
    private qiitaService: QiitaService,
    focusService: FocusService,
    view: ViewController
  ) {
    view.didEnter.subscribe(() => {
      focusService.focus("ion-input input");

      const input = view.contentRef().nativeElement.querySelector("ion-input");
      this.items$ = Observable.fromEvent<KeyboardEvent>(input, "keyup")
        .debounceTime(200)
        .map(event => (event.target as HTMLInputElement).value)
        .distinctUntilChanged()
        .switchMap(
          text =>
            text ? this.qiitaService.requestQiitaItemsByHttpClient(text) : []
        );
    });
  }

  clickItem(url: string): void {
    alert(url);
  }
}
