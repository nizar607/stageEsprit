import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-recuirt-form',
  templateUrl: './recuirt-form.component.html',
  styleUrls: ['./recuirt-form.component.css']
})
export class RecuirtFormComponent {


}
