import { AuthService } from './authentication/auth.service';
import { HttpClientService } from './http-client.service';
import { EarthquakeService } from './earthquakes/earthquake.service';
import { ReportService } from './reports/report.service';

export const allServices = [AuthService, HttpClientService, EarthquakeService, ReportService]