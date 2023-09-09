import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../pages/offer/offer.component';
import { HttpParams } from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  SERVER_URL: string = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  // Get all formations
  public getOffers() {
    return this.httpClient.get<Offer[]>(`${this.SERVER_URL + '/offers'}`, { responseType: "json" });
  }

  // Search offers
  // public searchOffers(title: string, location: string) {


  //   let queryParams = new HttpParams();
  //   return this.httpClient.post<Offer[]>(`${this.SERVER_URL + /offers/search}`,  {params:queryParams} );

  // }


  searchOffers(title: string, location: string) {
    return this.httpClient.post<Offer[]>("http://localhost:3000/offers/search", { title, location });
}



  // Get Formation By id
  public getOffer(id: any) {
    return this.httpClient.get<{ formation: any }>(`${this.SERVER_URL + '/offers'}/${id}`, { responseType: "json" });
  }

  // Create Formation
  public createOffer(offer: any) {
    return this.httpClient.post<{ message: any }>(`${this.SERVER_URL + '/offers'}`, offer)
  }

  // Delete Formation
  public deleteOffer(id: any) {
    return this.httpClient.delete<{ message: any }>(`${this.SERVER_URL + '/offers'}/${id}`)
  }

  public updateOffer(offer: any) {
    return this.httpClient.put<{ message: any }>(`${this.SERVER_URL + '/offers'}/${offer._id}`, offer)
  }
}
