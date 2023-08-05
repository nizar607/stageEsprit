import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  addEducationEnabled: boolean = false;

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
  secondFormGroup = this._formBuilder.group({
    //secondCtrl: ['', Validators.required],
  });

  currentYear: number = new Date().getFullYear();

  startYear: number = 1923;

  years: number[] = [];


  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  ngOnInit() {
    for (let year = this.currentYear; year >= this.startYear; year--) {
      this.years.push(year);
    }
  }
  constructor(private _formBuilder: FormBuilder) { }


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

  addEducation(){
    this.addEducationEnabled = false;
  }

}
