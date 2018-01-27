import { Injectable } from "@angular/core";
import { ViewController } from "ionic-angular";

@Injectable()
export class FocusService {
  constructor(private view: ViewController) {}

  focus(selector: string): void {
    setTimeout(() => {
      const selectors: string[] = [selector, selector + " input"];
      selectors.forEach(s => this._focus(s));
    });
  }

  private _focus(selector: string): void {
    const element: HTMLInputElement = this.view
      .contentRef()
      .nativeElement.querySelector(selector);
    if (element && typeof element.focus === "function") {
      element.focus();
    }
  }
}
