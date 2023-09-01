import { Component , OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-recruit',
  templateUrl: './recruit.component.html',
  styleUrls: ['./recruit.component.css']
})
export class RecruitComponent {
  public offer: any = {
    title: "",
    company_id: 0,
    type: [String],
    profile_insights: [],
    job_details: [],
    about: "",
    description: "",
    min_salary: 0,
    max_salary: 0,
    rating: 0,
    location: "",
    number_of_people: 0,
    profile_image: "",
    background_image: "",
    schedules: [String],
  };

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
  

  htmlContent!: string;

  selectedSchedules: string[] = [];
  selectedTypes: string[] = [];

  firstFormGroup !: any; 
  
  secondFormGroup !:any;

  thirdFormGroup !:any;

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
  
  toggleIcon(option: string,i:number): void {
    const index = this.selectedOptions.indexOf(option);

    if(this.offer.type.includes(option)){
      console.log(this.offer.type.includes(option),"index ",i);
      this.offer.type.splice(i, 1);
    }else{
      this.offer.type.push(option);
    }

    if (index === -1) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions.splice(index, 1);
    }

    console.log( "here types ", this.offer.type);
  }
  
  showCheck(option: string): boolean {
    return this.selectedOptions.includes(option);
  }


  selectedOptions2: string[] = [];
  
  toggleIcon2(option: string,i:number): void {
    const index = this.selectedOptions2.indexOf(option);


    if(this.offer.schedules.includes(option)){
      this.offer.schedules.splice(i, 1);
    }else{
      this.offer.schedules.push(option);
    }


    if (index === -1) {
      this.selectedOptions2.push(option);
    } else {
      this.selectedOptions2.splice(index, 1);
    }

    console.log( "here schedule ", this.offer.schedules);
  }
  
  showCheck2(option: string): boolean {
    return this.selectedOptions2.includes(option);
  }

ngOnInit() {
  this.firstFormGroup = this._formBuilder.group({
    title: ['', Validators.required],
    people_number: ['', [Validators.required]],
    option: ['', Validators.required]
});
  this.secondFormGroup = this._formBuilder.group({
    insights: ['', Validators.required],
    details: ['', [Validators.required]],
  });

  this.thirdFormGroup = this._formBuilder.group({
    minSalary: ['', [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    maxSalary: ['', [Validators.required,Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  });
}
  constructor(private _formBuilder: FormBuilder,private OfferService:OfferService) {


  }
  deleteDetail(index:number){
    this.offer.job_details.splice(index,1);  
  }

  deleteInsight(index:number){
    this.offer.profile_insights.splice(index,1);  
  }

  addInsight(value:string){
    this.offer.profile_insights.push(value);
  }

  addDetail(value:string){
    this.offer.job_details.push(value);
  }

  SubmitFirst(){
    
  }

  SubmitSecond(){

  }

  SubmitThird(){

  }

  showEditor(s : any){
    console.log(s.textArea.nativeElement.innerHTML);
  }

  addOffer(editor:any){
    this.offer.title = this.firstFormGroup.value.title;
    this.offer.number_of_people = this.firstFormGroup.value.people_number;
    this.offer.description = this.firstFormGroup.value.option;
    this.offer.min_salary = this.thirdFormGroup.value.minSalary;
    this.offer.max_salary = this.thirdFormGroup.value.maxSalary;
    this.offer.about = editor.textArea.nativeElement.innerHTML;
    this.offer.location = this.firstFormGroup.value.option;
    this.offer.rating = 0;
    this.offer.details = this.secondFormGroup.value.details;
    this.offer.insights = this.secondFormGroup.value.insights;
    
    console.log(this.offer);

    this.OfferService.createOffer(this.offer).subscribe(data => {
      console.log("Offer created : ", data);
    }, error => {
      console.log("Error creating an offer: ", error);
    });


  }



  
}
