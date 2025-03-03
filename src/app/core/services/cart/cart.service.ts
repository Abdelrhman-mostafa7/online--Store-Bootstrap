import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private httpClient: HttpClient) {}

  private getToken(): string {
    return typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
  }
  
  addcart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`, 
      { "productId": id }, 
      { headers: { token: this.getToken() || '' } }
    );
  }

  datacart(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return new Observable(observer => {
        observer.next({ data: [] });
        observer.complete();
      });
    }

    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`, {
      headers: { token }
    });
  }

  removecart(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
      headers: { token: this.getToken() || '' }
    });
  }

  updatacart(id: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, 
      { "count": count }, 
      { headers: { token: this.getToken() || '' } }
    );
  }

  clearcart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
      headers: { token: this.getToken() || '' }
    });
  }
}
