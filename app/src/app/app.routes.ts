import { Routes } from '@angular/router'
import { OverviewComponent } from './components/overview/overview.component'
import { FeedbackComponent } from './components/feedback/feedback.component'
import { TravelComponent } from './components/travel/travel.component'
import { ProfileComponent } from './components/profile/profile.component'
import { AdminComponent } from './components/admin/admin.component'
import { LogoutComponent } from './components/authentication/logout/logout.component'
import { LoginComponent } from './components/authentication/login/login.component'
import { RegisterComponent } from './components/authentication/register/register.component'
import { PostFeedbackComponent } from './components/post-feedback/post-feedback.component'
import { AuthGuard } from './core/guards/auth.guard'
import { RoleGuard } from './core/guards/role.guard'
import { UnderConstructionComponent } from './components/under-construction/under-construction.component'


export const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'feedback', canActivate: [AuthGuard], component: UnderConstructionComponent },
  { path: 'reports', canActivate: [AuthGuard], component: FeedbackComponent },
  { path: 'travel', canActivate: [AuthGuard], component: UnderConstructionComponent },
  { path: 'profile', canActivate: [AuthGuard], component: UnderConstructionComponent },
  { path: 'admin', canLoad: [RoleGuard], component: UnderConstructionComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'overview', pathMatch: 'full' },
]