import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocao } from '../types/types';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService {

  private apiUrl: string = 'http://locahost:8080/promocoes'
  constructor(
    private httpClient: HttpClient
  ) { }

  listar () : Observable<Promocao[]>{
    return this.httpClient.get<Promocao[]>('http://localhost:8080/promocoes');
  }
}
