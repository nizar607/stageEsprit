import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild, TemplateRef, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OfferService } from 'src/app/services/offer.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent {
  @ViewChild('successDialog') successDialogTemplate!: TemplateRef<any>;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  file: any = null;
  keepSpinning: boolean = true;
  userInfo: any = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "streetAddress": "",
    "postalCode": "",
    "city": ""
  };

  progressForm = 0;
  fileUrl!: string;

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog, private dialogRef: MatDialogRef<OfferFormComponent>, private http: HttpClient) { }

  updateProgress(value: number) {
    this.progressForm += value;
  }

  onFileSelected(event: any): any {
    this.keepSpinning = true;

    this.file = event.target.files[0];

    if (!this.file || this.file.type !== 'application/pdf') {
      this.file = null;
      return null;
    }
  
    const formData = new FormData();
    formData.append('resume', this.file);
    setTimeout(() => {
      this.keepSpinning = false;}, 500);

    return true;
  }

  

  previewResume(): void {
    window.open(window.URL.createObjectURL(this.file));
  }




  firstFormGroup = this._formBuilder.group({
    //firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    //secondCtrl: ['', Validators.required],
  });
  isLinear = true;


  sumbitCandidature() {
    this.dialog.open(this.successDialogTemplate);

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteResume(){
    this.file = null;
    this.fileInput.nativeElement.value = '';
  }
}
