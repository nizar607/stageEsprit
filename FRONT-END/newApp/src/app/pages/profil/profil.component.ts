import { Component } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  keepSpinning: boolean = true;
  file:any=null;
  user:any;

  constructor() { }
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
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

}
