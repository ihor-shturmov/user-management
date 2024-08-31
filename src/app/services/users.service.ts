import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {delay, Observable, of} from "rxjs";

@Injectable({providedIn: 'root'})
export class UsersService {
  private users: User[] = [
    {id: 1, username: 'admin', role: 'admin'},
    {id: 2, username: 'user1', role: 'user'},
    {id: 3, username: 'user2', role: 'user'},
  ];

  getUsers(): Observable<User[]> {
    return of([...this.users]).pipe(delay(1000)); // Simulate network delay
  }

  updateUser(user: User): Observable<User> {
    return of(user).pipe(delay(1000)); // Simulate network delay
  }
}
