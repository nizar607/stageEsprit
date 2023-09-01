import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent {
  @ViewChild('successDialog') successDialogTemplate!: TemplateRef<any>;

  firstFormGroup = this._formBuilder.group({
    //firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    //secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog,private dialogRef: MatDialogRef<OfferFormComponent>) { }

  sumbitCandidature() {
    this.dialog.open(this.successDialogTemplate);

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
