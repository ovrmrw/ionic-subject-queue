import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { QiitaItem } from "../types";

@Injectable()
export class QiitaService {
  private readonly endpoint = "https://us-central1-qiita-api-functions.cloudfunctions.net/qiitaApiItems";

  constructor(private http: HttpClient) {}

  requestQiitaItemsByHttpClient(text: string): Observable<QiitaItem[]> {
    return this.http
      .post<Record<string, any>[]>(this.endpoint, { title: text })
      .map(items =>
        items.map(item => ({
          title: item.title,
          url: item.url
        }))
      );
  }

  requestQiitaItemsByFetch(text: string): Promise<QiitaItem[]> {
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ title: text }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    return fetch(this.endpoint, options)
      .then<Record<string, any>[]>(res => res.json())
      .then(items =>
        items.map(item => ({
          title: item.title,
          url: item.url
        }))
      );
  }
}
