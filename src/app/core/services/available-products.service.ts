import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AvailableProducts, ApiResponse } from '../types/available-products';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AvailableProductsService {
  constructor(
    private httpClient: HttpClient
  ) { }

  listar(): Observable<AvailableProducts[]> {
    const token = 'your-authentication-token'; // Replace with your actual token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<ApiResponse>('https://web-api.starlink.com/enterprise/v1/account/ACC-3456480-85383-22/subscriptions/available-products').pipe(
      map(response => {
        console.log("ApiResponse:", response)
        return response.content.results.map((item: AvailableProducts) => ({
          productReferenceId: item.productReferenceId,
          name: item.name,
          price: item.price,
          isoCurrencyCode: item.isoCurrencyCode
        }));
      })
    );
  }
}
