import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.css']
})
export class RecruitComponent {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '30vh',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '50px',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      // Custom class for a blockquote
      {
        name: 'quote',
        class: 'quote',
      },
      // Custom class for red text
      {
        name: 'redText',
        class: 'redText'
      },
      // Custom class for a title text (h1)
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
  

  htmlContent="";
  firstFormGroup = this._formBuilder.group({
    // firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    // secondCtrl: ['', Validators.required],
  });
  isLinear = true;


   schedule: string[] = [
    "4 hour shift",
    "8 hour shift",
    "10 hour shift",
    "Monday to Friday",
    "Day shift",
    "Night shift",
    "Evening shift",
    "No nights",
    "Overnight shift",
    "Weekends as needed",
    "Weekends only",
    "No Weekends",
    "On call",
    "Holidays",
    "Choose your own hours",
    "After school",
    "Overtime",
    "Other",
  ];


  selectedOptions: string[] = [];
  
  toggleIcon(option: string): void {
    const index = this.selectedOptions.indexOf(option);
    
    if (index === -1) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions.splice(index, 1);
    }
  }
  
  showCheck(option: string): boolean {
    return this.selectedOptions.includes(option);
  }


  selectedOptions2: string[] = [];
  
  toggleIcon2(option: string): void {
    const index = this.selectedOptions2.indexOf(option);
    
    if (index === -1) {
      this.selectedOptions2.push(option);
    } else {
      this.selectedOptions2.splice(index, 1);
    }
  }
  
  showCheck2(option: string): boolean {
    return this.selectedOptions2.includes(option);
  }


  constructor(private _formBuilder: FormBuilder) {}

}
