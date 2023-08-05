import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-offer-mobile',
  templateUrl: './offer-mobile.component.html',
  styleUrls: ['./offer-mobile.component.css']
})
export class OfferMobileComponent {
  constructor(private router: Router) {

   }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(['/offer']);
  }

}
