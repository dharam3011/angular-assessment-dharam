import { Routes } from '@angular/router';
import { UserListComponent } from './pages/admin/userList/userList.component';
import { LoginComponent } from './auth/login/login.component';
import { ApplicationFormComponent } from './pages/guest/application-form/application-form.component';
import { UserDetailsComponent } from './pages/admin/user-details/user-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin/user',
    component: UserListComponent,
  },
  {
    path: 'get-app',
    component: ApplicationFormComponent,
  },
  {
    path: 'admin/user-details/:index',
    component: UserDetailsComponent,
  },
];
