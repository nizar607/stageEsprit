import { Component } from '@angular/core';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent {
  constructor(private accountService :AccountService ) { }

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

  close(){
    
  }

  logout(){
    this.accountService.logout();
  }

}
