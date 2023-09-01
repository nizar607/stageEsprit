import { Component } from '@angular/core';

@Component({
  selector: 'app-company-nav',
  templateUrl: './company-nav.component.html',
  styleUrls: ['./company-nav.component.css']
})
export class CompanyNavComponent {

  open = true;
  getState(){
    return this.open ? "bx-menu" : "bx-menu-alt-right"  ;
  }

  toggle(){
    this.open = !this.open;
  }

  checkStyle(){
    if(this.open){
      return "display: hidden;";
    }
    return "display: none;";
  }
}

