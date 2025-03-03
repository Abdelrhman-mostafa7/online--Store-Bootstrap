import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  myheaders: any = {};

  constructor(
    private _HttpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.myheaders = { token: localStorage.getItem('userToken') };
    }
  }

  CheckOut(idCart: string | null, shipDetails: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=http://localhost:4200}`,
      {
        shippingAddress: shipDetails,
      }
    );
  }

  getUserOrders(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`);
  }
  

}
