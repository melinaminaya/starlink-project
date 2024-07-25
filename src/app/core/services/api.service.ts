import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { ApiResponse, AvailableProducts } from '../types/available-products';
import { tap } from 'rxjs/internal/operators/tap';
import { Account } from '../types/account';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private authUrl = 'https://api.starlink.com/auth/connect/token';
  private proxyAuthUrl = 'http://localhost:3000/api/auth/connect/token'; // Node.js server URL
  private accountsUrl = 'http://localhost:3000/api/enterprise/v1/accounts';
  private clientId = 'd4ddace7-b050-430e-92d1-5cfcbdb52a7d';
  private clientSecret = 'Starlink@2024';
  private grantType = 'client_credentials';
  private token: string | null = null;

  constructor(private httpClient: HttpClient) { }

  // Function to get the access token
  private getAccessToken(): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams({
      'client_id': this.clientId,
      'client_secret': this.clientSecret,
      'grant_type': this.grantType
    }).toString();

    return this.httpClient.post<any>(this.proxyAuthUrl, body, { headers }).pipe(
      map(response => response.access_token)
    );
  }


  private makeApiCallWithToken(url: string, token: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(url, { headers });
  }
  // Function to get accounts
  getAccounts(): Observable<Account[]> {
    if (this.token) {
      console.log("Token:", this.token)
      return this.makeApiCallWithToken(this.accountsUrl, this.token).pipe(
        map(response => {
          return response.content.results.map((item: Account) => ({
            accountName: item.accountName,
            accountNumber: item.accountNumber,
            defaultRouterConfigId: item.defaultRouterConfigId,
            regionCode: item.regionCode
          }));
        })
      );
    } else {
      return this.getAccessToken().pipe(
        switchMap(token => {
          this.token = token;
          console.log("Token:", this.token)
          return this.makeApiCallWithToken(this.accountsUrl, token).pipe(
            map(response => {
              return response.content.results.map((item: Account) => ({
                accountName: item.accountName,
                accountNumber: item.accountNumber,
                defaultRouterConfigId: item.defaultRouterConfigId,
                regionCode: item.regionCode
              }));
            })
          );
        })
      );
    }
  }
  // Function to get available products
  getAvailableProducts(accountNumber:string): Observable<AvailableProducts[]> {
    const available_products_url = `http://localhost:3000/api/enterprise/v1/account/${accountNumber}/service-lines/available-products`;
    if (this.token) {
      return this.makeApiCallWithToken(available_products_url, this.token).pipe(
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
    } else {
      return this.getAccessToken().pipe(
        switchMap(token => {
          this.token = token;
          return this.makeApiCallWithToken(available_products_url, token).pipe(
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
        })
      );
    }
  }
}
