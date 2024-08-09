import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs'
import { response } from 'express';
import { UserService } from './user.service';

interface AuthResponse {
  access_token: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
    private userService: UserService
  ) { }
  private apiUrl = 'http://localhost:8080/auth/login'; 
  autenticar(email: string, senha: string): Observable<HttpResponse<AuthResponse>> {
    const payload = JSON.stringify({ email, senha });
      
  console.log('Sending payload:', payload);
    return this.http.post<AuthResponse>(this.apiUrl,
      payload,
      { 
        headers:{'Content-Type': 'application/json', 'accept': 'application/json' },
        observe: 'response' 
      })
        .pipe(
        tap((response) => {
          const authtoken = response.body?.access_token || ''
          if (authtoken) {
            this.userService.salvarToken(authtoken);
            console.log('Token saved:', authtoken);  // Logging the token to ensure it is being received
          } else {
            console.error('No token received in the response');
          }
        }),
        catchError(error => {
          console.error('Error in auth/login:', error);
          return throwError(() => new Error('Failed to authenticate'));
        })
      )
  }
}
