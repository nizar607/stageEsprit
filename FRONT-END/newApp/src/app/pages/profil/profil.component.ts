import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  keepSpinning: boolean = true;
  file:any=null;
  user:any;
  profile:any;

  constructor(private profileService:ProfileService) { 
    console.log("here");
  }
  ngOnInit(): void {

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.profileService.getUserProfile(this.user._id).subscribe((res:any)=>{
      this.profile = res[0];
      if(this.profile.resume!=""){
        this.file = this.profile.resume;

      }
      console.log("profile here ",res);
      this.keepSpinning = false;
    },
    (err:any)=>{
      console.log("error here ",err);
      this.keepSpinning = false;
    });
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
      this.keepSpinning = false;
    }, 500);

    return true;
  }

  previewResume(): void {
    const fileUrl = "/src/uploads/"+this.file;
    this.profileService.fetchFile(fileUrl).subscribe((blob: Blob) => {
      const objectUrl = URL.createObjectURL(blob);
      window.open(objectUrl, '_blank');
    });
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

}
