import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent {
  @ViewChild('successDialog') successDialogTemplate!: TemplateRef<any>;


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
  
  
  constructor(private _formBuilder: FormBuilder,public dialog: MatDialog,private dialogRef: MatDialogRef<OfferFormComponent>, private http: HttpClient) { }

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

    this.http.post<any>('http://localhost:3000/upload', formData).subscribe(
      file => {
        // Process the extracted data to fill form inputs programmatically
        console.log("here dude ", file.aiResponse.LLAMA);
        const regex = /(\}\s*)(\})*$/m;
        const result = file.aiResponse.LLAMA.replace(regex, (match: any, group1: any, group2: any) => {
          if (group2.length > 0) {
            return group1; // Remove extra curly braces
          } else {
            return match; // Keep original match
          }
        });
        console.log(result);

        const jsonObject = JSON.parse(result);
        console.log(jsonObject);

        this.userInfo = jsonObject;
        this.keepSpinning = false;
      },
      error => {
        console.error('Error while uploading PDF:', error);
        this.keepSpinning = false;
      }
    );
    return true;
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
}
