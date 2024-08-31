import {CanActivateFn, Router} from '@angular/router';
import {AuthFacade} from "../facades/auth-facade.service";
import {inject} from "@angular/core";
import {map, tap} from "rxjs/operators";

export const authGuard: CanActivateFn = () => {
  const authFacade: AuthFacade = inject(AuthFacade);
  const router: Router = inject(Router);

  return authFacade.user$.pipe(
    map(user => !!user), // Check if the user is authenticated
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
      }
    })
  );
};
