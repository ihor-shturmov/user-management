import {Component, inject} from '@angular/core';
import {AuthFacade} from '../../facades/auth-facade.service';
import {AsyncPipe, NgIf} from '@angular/common';
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {Nullable} from "../../utils/types/nullable";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NgIf, AsyncPipe, MatButton],
  template: `
    @if (user$ | async; as user) {
      <div class="welcome-container">
        <div>
          Welcome, {{ user.username }}!
        </div>
        <button mat-button (click)="onLogout()">Logout</button>
      </div>
    } @else {
      <div class="welcome-container">
        Welcome, Guest!
      </div>
    }
  `,
  styles: [
    `
      .welcome-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #f0f0f0;
        font-size: 1.2rem;
        font-weight: bold;
      }
    `,
  ],
})
export class WelcomeComponent {
  private authFacade: AuthFacade = inject(AuthFacade);

  user$: Observable<Nullable<User>> = this.authFacade.user$;

  onLogout(): void {
    this.authFacade.logout();
  }
}
