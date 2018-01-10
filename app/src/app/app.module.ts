import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { HttpClientModule } from "@angular/common/http";
import { ServiceModule } from "./core/services/services.module";

import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './core/guards/auth.guard'
import { RoleGuard } from './core/guards/role.guard'

import { RouterModule } from '@angular/router'
import { routes } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { OverviewComponent } from './components/overview/overview.component';
import { FeedbackComponent } from './components/feedback/feedback.component'
import { TravelComponent } from './components/travel/travel.component'
import { ProfileComponent } from './components/profile/profile.component'
import { AdminComponent } from './components/admin/admin.component'
import { LogoutComponent } from './components/authentication/logout/logout.component'
import { LoginComponent } from './components/authentication/login/login.component'
import { RegisterComponent } from './components/authentication/register/register.component'
import { PostFeedbackComponent } from './components/post-feedback/post-feedback.component'

import { UnderConstructionComponent } from './components/under-construction/under-construction.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OverviewComponent,
    FeedbackComponent,
    TravelComponent,
    ProfileComponent,
    AdminComponent,
    LogoutComponent,
    LoginComponent,
    RegisterComponent,
    PostFeedbackComponent,
    UnderConstructionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceModule,
    FormsModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(routes),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
