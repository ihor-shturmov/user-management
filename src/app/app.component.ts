import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {WelcomeComponent} from "./components/welcome/welcome.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinner, WelcomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
