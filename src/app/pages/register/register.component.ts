import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  selectedOption!: string;
  constructor(private dialogRef: MatDialogRef<LoginComponent>) { }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
