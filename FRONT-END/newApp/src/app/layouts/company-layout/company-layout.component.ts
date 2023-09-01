import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RecruitComponent } from 'src/app/pages/recruit/recruit.component';


@Component({
  selector: 'app-company-layout',
  templateUrl: './company-layout.component.html',
  styleUrls: ['./company-layout.component.css']
})
export class CompanyLayoutComponent {

  showFiller = false;
  selectedLink = 0;
  navLinks = [
    "Find jobs",
    "Company reviews",
    "Find salaries"
  ];

  routes = [
    "/company/recruit",
    "/company/reviews",
    "/company/salary"
  ];

  constructor(
    private router:Router,
    public dialog: MatDialog
    ) {

   }

  selectLink(index: number) {
    this.selectedLink = index;
  }
  getState(){
    return "open";
  }

  navigate(index:number){
    this.router.navigate(['/company/recruit']);
    console.log("navigate");
  }

  changeTab(index:number) {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
  
    tabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
  
    tabs[index].classList.add('active');
    tabContents[index].classList.add('active');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RecruitComponent);
  }
}
