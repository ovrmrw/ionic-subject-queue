import { Injectable } from "@angular/core";
import { ViewController } from "ionic-angular";

@Injectable()
export class FocusService {
  constructor(private view: ViewController) {}

  focus(selector: string): void {
    setTimeout(() => {
      const element = this.view
        .contentRef()
        .nativeElement.querySelector(selector);
      if (element && typeof element.focus === "function") {
        element.focus();
      }
    });
  }
}
