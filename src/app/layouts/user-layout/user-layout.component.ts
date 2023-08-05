import { Component } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent {
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
