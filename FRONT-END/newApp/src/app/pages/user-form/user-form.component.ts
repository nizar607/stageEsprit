import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CandidatureService } from 'src/app/services/candidature.service';
import { ProfileService } from 'src/app/services/profile.service';

export interface UserProfile {
  _id: String,
  userId: String,
  address: number,
  city: String,
  education:[],
  email:[String],
  firstName:String,
  lastName: String,
  phoneNumber:number,
  postalCode:number,
  resume:number,
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})




export class UserFormComponent {


  
  addEducationEnabled: boolean = false;
  anotherSchoolEnabled: boolean = false;
  espritSchoolsEnabled: boolean = false;
  keepSpinning: boolean = true;
  user!: any;
  userInfo: any = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "streetAddress": "",
    "postalCode": "",
    "city": ""
  };

  ecoles = [
    "Esprit Buisiness",
    "Esprit Ecole Ingénieur",
  ];
  progressForm = 0;
  isLinear = true;

  selectedLink = 0;
  navLinks = [
    "Find jobs",
    "Company reviews",
    "Find salaries"
  ];


  @ViewChild(MatStepper, { static: false }) stepper!: MatStepper;

  firstFormGroup = this._formBuilder.group({
    //firstCtrl: ['', Validators.required],
  });

  form: any;
  educationForm: any;

  currentYear: number = new Date().getFullYear()+10;

  startYear: number = 1923;

  years: number[] = [];


  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  myControl = new FormControl('');
  options: string[] = [
    'Esprit Prepa 1st year',
    'Esprit Prepa 2st year',
    'Esprit Engineering 3 A',
    'Esprit Engineering 3 B',

    'Esprit Engineering 4 eme TWIN(Technologie web)',
    'Esprit Engineering 4 eme SE (Genie Logiciel)',
    'Esprit Engineering 4 eme IA (inteligence artificielle)',
    'Esprit Engineering 4 eme SLEAM',
    'Esprit Engineering 4 eme SIM (mobile)',
    'Esprit Engineering 4 eme Artic (cloud)',
    'Esprit Engineering 4 eme BI (buisiness intelligence)',

    'Esprit Engineering 5 eme TWIN(Technologie web)',
    'Esprit Engineering 5 eme SE (Genie Logiciel)',
    'Esprit Engineering 5 eme IA (inteligence artificielle)',
    'Esprit Engineering 5 eme SLEAM',
    'Esprit Engineering 5 eme SIM (mobile)',
    'Esprit Engineering 5 eme Artic (cloud)',
    'Esprit Engineering 5 eme BI (buisiness intelligence)',

    'Esprit Business licence',
    'Esprit Business master',

  ];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    for (let year = this.currentYear; year >= this.startYear; year--) {
      this.years.push(year);
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.form = this._formBuilder.group({
      email: [this.user.email],
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      phoneNumber: [this.user.phoneNumber],
      address: [''],
      city: [''],
      postalCode: [''],
      education: [[]],
    });

    this.educationForm = this._formBuilder.group({
      schoolName: [''],
      major: [''],
      startingMonth: [''],
      startingYear: [''],
      finishingMonth: [''],
      finishingYear: [''],
    });

  }
  constructor(private _formBuilder: FormBuilder, private http: HttpClient,private candidatureService:CandidatureService, private profileService:ProfileService) { }



  selectLink(index: number) {
    this.selectedLink = index;
  }

  updateProgress(value: number) {
    this.progressForm += value;
  }

  addEducationPage() {
    this.addEducationEnabled = true;
    this.stepper.next();
  }

  addEducation() {
    // this.anotherSchoolEnabled = false;
    if(this.espritSchoolsEnabled){
      this.educationForm.value.schoolName = "esprit";
    }
    this.form.value.education.push(this.educationForm.value);
    this.form.value.resume=this.resumeName;
    this.form.value.userId=this.user._id;
    
    console.log("profile complete ",this.form.value);

    this.profileService.createUserProfile(this.form.value).subscribe((res:any)=>{
      console.log("user profile created ",res);
    },
    (error:any)=>{
      console.log("user profile error ",error);
    }
    );

  }

  enableAnotherSchool(enable: boolean) {
    this.anotherSchoolEnabled = enable;
    this.espritSchoolsEnabled = false;
  }

  enableEspritSchools(enable: boolean) {
    this.espritSchoolsEnabled = enable;
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  file: any = null;
  resumeName: string = "";

  onFileSelected(event: any): any {
    this.keepSpinning = true;

    this.file = event.currentTarget.files[0];
    if (!this.file || this.file.type !== 'application/pdf') {
      this.file = null;
      return null;
    }


    const formData = new FormData();
    formData.append('resume', this.file);

    this.candidatureService.uploadResume(formData).subscribe(
      (res: any) => {
        console.log("resume here ", res);
        this.form.value.resume=res.resume;
        this.resumeName= res.resume;
        this.form.value.resume=res.resume;
        return res;
      },
      (err: any) => {
        console.log(err);
        return "";
      },
      this.keepSpinning = false
    );

    // this.http.post<any>('http://localhost:3000/upload', formData).subscribe(
    //   file => {

    //     console.log("here dude ", file.aiResponse.LLAMA);
    //     const regex = /(\}\s*)(\})*$/m;

    //     const result = file.aiResponse.response;
    //     console.log(result);

    //     const jsonObject = JSON.parse(result);
    //     console.log(jsonObject);

    //     this.userInfo = jsonObject;
    //     this.keepSpinning = false;
    //   },
    //   error => {
    //     console.error('Error while uploading PDF:', error);
    //     this.keepSpinning = false;
    //   }
    // );
    return true;
  }





}
