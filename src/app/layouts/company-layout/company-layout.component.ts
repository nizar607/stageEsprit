import { Component } from '@angular/core';

@Component({
  selector: 'app-company-layout',
  templateUrl: './company-layout.component.html',
  styleUrls: ['./company-layout.component.css']
})
export class CompanyLayoutComponent {
  selectedLink = 0;
  navLinks = [
    "Find jobs",
    "Company reviews",
    "Find salaries"
  ];
  selectLink(index: number) {
    this.selectedLink = index;
  }
  
  getRange(size: number): number[] {
    return Array(size).fill(0).map((value, index) => index);
  }
}
