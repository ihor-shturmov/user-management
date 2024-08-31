import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthFacade} from "../../facades/auth-facade.service";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormField,
    MatProgressSpinner,
    MatError,
    AsyncPipe,
    MatButton,
    MatInput,
    MatLabel
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly authFacade: AuthFacade = inject(AuthFacade);

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  loading$ = this.authFacade.loading$;
  error$ = this.authFacade.error$;

  onLogin(): void {
    const {username, password} = this.loginForm.value;
    this.authFacade.login(username!, password!);
  }
}
