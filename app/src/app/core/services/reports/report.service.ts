import { Injectable } from "@angular/core";
import { Report } from "../../models/report.model";
import { HttpClientService } from '../http-client.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ReportService {

  constructor(private httpService: HttpClientService) { }

  getLast30(): Observable<Report[]> {
    return this.httpService.get('http://localhost:3000/reports', null);
  }

}