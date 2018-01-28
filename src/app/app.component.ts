import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
// import { ListPage } from "../pages/list/list";
import { UseFetchPage } from "../pages/use-fetch/use-fetch";
import { UseFetchAsyncPipePage } from "../pages/use-fetch-asyncpipe/use-fetch-asyncpipe";
import { UseHttpClientAsyncPipePage } from "../pages/use-httpclient-asyncpipe/use-httpclient-asyncpipe";
import { UseObservableFromEventPage } from "../pages/use-observable-fromevent/use-observable-fromevent";
import { UseSubjectQueuePage } from "../pages/use-subject-queue/use-subject-queue";

interface PageObject {
  title: string;
  component: any;
}

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<PageObject>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: "Home", component: HomePage },
      // { title: "List", component: ListPage },
      { title: "Fetch", component: UseFetchPage },
      { title: "Fetch with AsyncPipe", component: UseFetchAsyncPipePage },
      {
        title: "HttpClient with AsyncPipe",
        component: UseHttpClientAsyncPipePage
      },
      {
        title: "HttpClient with Observable.fromEvent",
        component: UseObservableFromEventPage
      },
      {
        title: "HttpClient with Subject queue",
        component: UseSubjectQueuePage
      }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
