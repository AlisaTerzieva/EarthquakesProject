import { Injectable } from "@angular/core";
import { Earthquake } from "../../models/earthquake.model";
import { HttpClientService } from '../http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class EarthquakeService {

  constructor(private httpService: HttpClientService) { }

  getLast50(): Observable<Earthquake[]> {
    return this.httpService.get('http://localhost:3000/events', null);
  }

  getById(id: string): Observable<Earthquake> {
    return this.httpService.get('http://localhost:3000/events/' + id, null);
  }

}