import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class HttpClientService {

  constructor(
    private http: HttpClient,
    private toastr: ToastsManager
  ) { }

  public get<T>(url: string, headers: HttpHeaders) {
    return this.http
      .get<T>(url, { headers })
      .pipe(
      catchError(err => this.handleError(err))
      )
  }

  public post<T>(url: string, body: any, headers: HttpHeaders) {
    return this.http
      .post<T>(url, body, { headers })
      .pipe(
      catchError(err => this.handleError(err))
      )
  }


  public put<T>(url: string, body: any, headers: HttpHeaders) {
    return this.http
      .put<T>(url, body, { headers })
      .pipe(
      catchError(err => this.handleError(err))
      )
  }


  public delete<T>(url: string, id: number, headers: HttpHeaders) {
    return this.http
      .delete<T>(`${url}/${id}`, { headers})
      .pipe(
      catchError(err => this.handleError(err))
      )
  }

  private handleError(error: any) {
    if (error.status) {
      if (error.status === 404) {
        this.toastr.error("Page Not Found", "404!")
      }

      // Other status codes needed in app 
    }

    return Observable.throw(new Error(error.message));
  }
}