import { Component ,ViewChild, ElementRef} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { OfferFormComponent } from '../offer-form/offer-form.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';

export interface Offer {
        _id: String,
        title: String,
        company_id: number ,
        type: String,
        profile_insights:[String],
        job_details:[String],
        about:String,
        description: String,
        min_salary:number,
        max_salary:number,
        rating:number,
        location:String,
        number_of_people: number,
        profile_image:String,
        background_image:String,
        schedules: [String],
}

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent {
  offers: Offer[] = [];
  allOffers: Offer[] = [];
  pageSize = 5;
  currentPage = 0;
  paginatedOffers: any[] = [];
  totalOffers = 0;
  isMobile = false;
  selectedDiv!: number;
  currentOffer!: Offer ;
  currentDay:any;

  @ViewChild('titleInput') titleInput!: ElementRef;
  @ViewChild('locationInput') locationInput!: ElementRef;

  constructor(
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private offerService : OfferService
  ) {
    this.selectedDiv = 0;
    this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Tablet]) // You can add more breakpoints if needed
    .subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    console.log('OfferComponent');
    this.currentDay = new Date();
  
    this.offerService.getOffers().subscribe(data => {
      console.log("Complete data received: ", data);
      this.offers = data;
      this.allOffers = data;
      this.currentOffer = this.offers[this.selectedDiv];
      this.totalOffers = this.offers.length;
      this.updatePagination();
    });

    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OfferFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  closeDialog(): void {
    const dialogRef = this.dialog.open(OfferFormComponent);
    dialogRef.close();
  }


  updatePagination() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedOffers = this.offers.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.selectedDiv = this.currentPage * this.pageSize;
    this.currentOffer = this.offers[this.selectedDiv];
    this.updatePagination();
  }

  onSelectDiv(index: number) {
    this.currentOffer = this.offers[index + this.currentPage * this.pageSize];
    this.selectedDiv = index + this.currentPage * this.pageSize;
  }

  offerClick(index: number) {
    if (this.isMobile) {
      this.router.navigate(['/offer-mobile']);
      // this.router.navigate(['/offer-mobile', 3]); // the id of the offer is 3
    }
  }

  searchOffers(){
    
    if(this.titleInput.nativeElement.value == "" && this.locationInput.nativeElement.value == ""){
      console.log("empty");
      // this.offers = this.allOffers;
      // this.updatePagination();
      return;
    }
    console.log("searching",this.titleInput.nativeElement.value,this.locationInput.nativeElement.value);
    this.offerService.searchOffers(this.titleInput.nativeElement.value, this.locationInput.nativeElement.value).subscribe(data => {
      console.log("Complete data received: ", data);  
      this.offers=data;
      this.updatePagination();
    });

  }

}
