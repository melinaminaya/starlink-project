import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnidadeFederativa } from '../types/unidadefederativa';
import { catchError, Observable, shareReplay, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UnidadeFederativaService {
  private apiUrl: string = 'http://localhost:8080/estados'
  private cache$?: Observable<UnidadeFederativa[]>;

  constructor(private http: HttpClient) { }

  Listar(): Observable<UnidadeFederativa[]> {
    if (!this.cache$) {
      this.cache$ = this.requestEstados().pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Error fetching estados:', error);
          throw error;
        })
      );
    }

    return this.cache$;
  }

  private requestEstados(): Observable<UnidadeFederativa[]> {
    return this.http.get<UnidadeFederativa[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error in requestEstados:', error);
        throw error;
      })
    );
  }
}
