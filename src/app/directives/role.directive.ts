import {Directive, effect, inject, input, InputSignal, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthFacade} from "../facades/auth-facade.service";
import {map, take} from "rxjs/operators";
import {UserRole} from "../models/user.model";
import {Nullable} from "../utils/types/nullable";

@Directive({
  selector: '[appRole]',
  standalone: true
})
export class RoleDirective {
  private readonly authFacade = inject(AuthFacade);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef<any>);

  appRole: InputSignal<Nullable<UserRole | undefined>> = input<Nullable<UserRole | undefined>>(undefined);

  private _ = effect(() => {
    this.authFacade.userRole$.pipe(
      take(1),
      map(role => role === this.appRole())
    ).subscribe(isAuthorized => {
      if (isAuthorized) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  });
}
