import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Component, ViewChild, TemplateRef, Input, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OfferService } from 'src/app/services/offer.service';
import { ElementRef } from '@angular/core';
import { CandidatureService } from 'src/app/services/candidature.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent {
  @ViewChild('successDialog') successDialogTemplate!: TemplateRef<any>;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  @Input() companyId!: string;

  user!: any;
  fileTypeError: boolean = false;

  file: any = null;
  keepSpinning: boolean = false;

  progressForm = 0;
  fileUrl!: string;
  form!: FormGroup;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.form = this.formBuilder.group({
      email: [this.user.email,],
      phoneNumber: ['+216 ' + "20202020",],
      resume: ['',],
    });
    this.companyId=this.data.companyId;
    console.log("company id here ", this.companyId);
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: { companyId: string },
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<OfferFormComponent>,
    private candidatureService: CandidatureService) {}

  updateProgress(value: number) {
    this.progressForm += value;
  }
  onFileSelected(event: any): any {
    this.keepSpinning = true;
    this.fileTypeError = false;
    this.file = event.currentTarget.files[0];

    if (!this.file || this.file.type !== 'application/pdf') {
      this.file = null;
      this.fileTypeError = true;
      return null;
    }

    const formData = new FormData();
    formData.append('resume', this.file);

    this.candidatureService.uploadResume(formData).subscribe(
      (res: any) => {
        console.log("resume here ", res);
        this.addCandidature(res.resume)
        return res;
      },
      (err: any) => {
        console.log(err);
        return "";
      },
      this.keepSpinning = false
    );

    return "";
  }

  addCandidature(resume: String) {
    this.form.value.resume = resume;
    this.form.value.userId = this.user._id;
    this.form.value.companyId = this.companyId;

    console.log("candidature here ", this.form.value);
    this.candidatureService.addCandidature(this.form.value).subscribe(
      (res: any) => {
        console.log("candidature response here ", res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }






  previewResume(): void {
    window.open(window.URL.createObjectURL(this.file));
  }

  downloadPdf() {
    const pdfUrl = window.URL.createObjectURL(this.file); // Replace with your PDF file's URL
    const filename = 'myResume.pdf'; // Replace with the desired filename for the downloaded file

    // Create a fetch request to get the PDF file
    fetch(pdfUrl)
      .then(response => response.blob())
      .then(blob => {
        // Create a Blob URL for the PDF content
        const blobUrl = URL.createObjectURL(blob);

        // Create an anchor element to trigger the download
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;

        // Programmatically click the anchor element to trigger the download
        a.click();

        // Release the Blob URL
        URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        console.error('Error downloading PDF:', error);
      });
  }


  isLinear = true;


  sumbitCandidature() {
    this.dialog.open(this.successDialogTemplate);

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteResume() {
    this.file = null;
    this.fileInput.nativeElement.value = '';
  }
}
