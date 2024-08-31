import {Injectable} from '@angular/core';
import {delay, map, Observable, of} from "rxjs";
import {UserDTO} from "../models/user.model";
import {Nullable} from "../utils/types/nullable";

@Injectable({providedIn: 'root'})
export class AuthService {
  private users: UserDTO[] = [
    {id: 1, username: 'admin', role: 'admin', password: 'admin'},
    {id: 2, username: 'user', role: 'user', password: 'user'},
  ];

  login(username: string, password: string): Observable<Nullable<UserDTO>> {
    const user = this.users.find((u) => u.username === username && u.password === password);
    return of(user).pipe(
      delay(Math.random() * 2000), // Simulate random response time
      map((user) => user || null)
    );
  }
}
