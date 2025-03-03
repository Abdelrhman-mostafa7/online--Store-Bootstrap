import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  token: any;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }
  }

  Addwishlist(id: string): Observable<any> {
    const headers: any = {};
    if (this.token) headers.token = this.token;
  
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, { "productId": id }, { headers });
  }
  
  getwishlist(): Observable<any> {
    const headers: any = {};
    if (this.token) headers.token = this.token;
  
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`, { headers });
  }
  
  deletwishlist(id: string): Observable<any> {
    const headers: any = {};
    if (this.token) headers.token = this.token;
  
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`, { headers });
  }
}