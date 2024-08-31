import {Component, inject} from '@angular/core';
import {UsersFacade} from "../../facades/users-facade.service";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-user-edit-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatDialogActions,
    MatLabel,
    MatSelect,
    MatOption,
    MatError
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.scss'
})
export class UserEditDialogComponent {
  private userFacade = inject(UsersFacade);
  private dialogRef = inject(MatDialogRef<UserEditDialogComponent>);
  private fb = inject(FormBuilder);
  public data: { user: User } = inject(MAT_DIALOG_DATA);

  form = this.fb.group({
    id: [this.data.user.id],
    username: [this.data.user.username, Validators.required],
    role: [this.data.user.role, Validators.required],
  });

  onSave() {
    this.userFacade.editUser(this.form.value as User);
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
