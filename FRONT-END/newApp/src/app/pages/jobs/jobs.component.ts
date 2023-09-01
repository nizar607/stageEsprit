import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { OfferFormComponent } from '../offer-form/offer-form.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { OfferService } from 'src/app/services/offer.service';
import { ViewChild, TemplateRef } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {

  offers: any[] = [];
  pageSize = 5;
  currentPage = 0;
  paginatedOffers: any[] = [];
  totalOffers = 0;
  isMobile = false;
  selectedDiv!: number;
  currentOffer: any = null;
  @ViewChild('deleteDialog') deleteDialogTemplate!: TemplateRef<any>;
  
  constructor(
    public dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private OfferService:OfferService,
    
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
    this.OfferService.getOffers().subscribe((data: any) => {
      this.offers = data;
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

  openDeleteDialog(){
    const dialogRef = this.dialog.open(this.deleteDialogTemplate);
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

  deleteJob(): void {
    this.OfferService.deleteOffer(this.currentOffer._id).subscribe((data: any) => {
      this.updatePagination();
      this.currentOffer = this.offers[this.selectedDiv];
      this.totalOffers = this.offers.length;
    });
  }
}
