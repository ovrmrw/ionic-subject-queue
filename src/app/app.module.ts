import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { UseFetchPage } from "../pages/use-fetch/use-fetch";
import { UseFetchAsyncPipePage } from "../pages/use-fetch-asyncpipe/use-fetch-asyncpipe";
import { UseHttpClientAsyncPipePage } from "../pages/use-httpclient-asyncpipe/use-httpclient-asyncpipe";
import { UseObservableFromEventPage } from "../pages/use-observable-fromevent/use-observable-fromevent";
import { UseSubjectQueuePage } from "../pages/use-subject-queue/use-subject-queue";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { QiitaService } from "../services/qiita.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    UseFetchPage,
    UseFetchAsyncPipePage,
    UseHttpClientAsyncPipePage,
    UseObservableFromEventPage,
    UseSubjectQueuePage
  ],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    UseFetchPage,
    UseFetchAsyncPipePage,
    UseHttpClientAsyncPipePage,
    UseObservableFromEventPage,
    UseSubjectQueuePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    QiitaService
  ]
})
export class AppModule {}
