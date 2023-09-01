import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer } from '../pages/offer/offer.component';
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
  
    // Get Formation By id
    public getOffer(id: any){
      return this.httpClient.get<{formation :any}>(`${this.SERVER_URL + '/offers'}/${id}`,{ responseType: "json" }); 
    }
  
    // Create Formation
    public createOffer(offer: any){
      return this.httpClient.post<{message:any}>(`${this.SERVER_URL + '/offers'}`, offer)
    }
  
    // Delete Formation
    public deleteOffer(id: any){
      return this.httpClient.delete<{message : any}>(`${this.SERVER_URL + '/offers'}/${id}`)
    }
  
    public updateOffer(offer: any){
      return this.httpClient.put<{message : any}>(`${this.SERVER_URL + '/offers'}/${offer._id}`, offer)
  }
}
