import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {UsersFacade} from "../facades/users-facade.service";

export const usersListResolver: ResolveFn<void> = () => {
  inject(UsersFacade).loadUsers();
};
