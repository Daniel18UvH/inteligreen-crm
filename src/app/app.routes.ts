import { Routes } from '@angular/router';
import LoginComponent from './features/auth/login.component';
import DashboardComponent from './features/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { About } from './information/about/about';
import { Contact } from './information/contact/contact';
import { Stories } from './information/stories/stories';
import { InitPage } from './information/init-page/init-page';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: '', component: InitPage},
  { path: 'about', component: About },
  { path: 'contact', component: Contact},
  { path: 'stories', component: Stories },
  { path: '**', redirectTo: '' },
];
