import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts() {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient:HttpClient) { }
  getِAllproudcts():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products`)
  }
  getِspecificproudcts(id:string):Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}
