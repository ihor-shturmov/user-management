import {Component, inject} from '@angular/core';
import {UsersFacade} from "../../facades/users-facade.service";
import {User, UserRole} from "../../models/user.model";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from "@angular/material/table";
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {RoleDirective} from "../../directives/role.directive";
import {MatLabel} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    AsyncPipe,
    MatButton,
    MatRowDef,
    MatHeaderRowDef,
    RoleDirective,
    MatLabel,
    MatProgressSpinner
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  private readonly usersFacade: UsersFacade = inject(UsersFacade);

  users$ = this.usersFacade.users$;
  loading$ = this.usersFacade.loading$;

  readonly displayedColumns: string[] = ['id', 'username', 'role', 'actions'];
  readonly adminRole: UserRole = 'admin';

  onEdit(user: User): void {
    this.usersFacade.triggerEditUserDialog(user);
  }
}
