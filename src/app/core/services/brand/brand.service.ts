import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private httpClient: HttpClient
  ) {}

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getAllbrands(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
    
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`, { headers });
  }

  getspecificbrands(id: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});

    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands/${id}`, { headers });
  }
}
