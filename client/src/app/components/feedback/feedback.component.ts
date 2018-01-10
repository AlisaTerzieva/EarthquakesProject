import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../core/services/reports/report.service';
import { EarthquakeService } from '../../core/services/earthquakes/earthquake.service';
import { ToastsManager } from 'ng2-toastr';
import { Report } from '../../core/models/report.model';
import { AuthService } from '../../core/services/authentication/auth.service'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  public reportsData: Report[];

  constructor(private authService: AuthService, private reportService: ReportService, private earthquakeService: EarthquakeService, private toastr: ToastsManager) {
    this.reportService.getLast30()
      .subscribe(reportData => {
        this.reportsData = reportData
      }, err => {
        this.toastr.error('Fetching report data failed!', 'Error', { dismiss: 'controlled', showCloseButton: true })
      })
  }
}
