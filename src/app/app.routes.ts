import {Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {authGuard} from "./guards/auth.guard";
import {usersListResolver} from "./resolvers/users-list.resolver";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UserListComponent, canActivate: [authGuard], resolve: {users: usersListResolver}},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];
