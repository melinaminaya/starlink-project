import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/types';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  cadastrar(pessoaUsuaria: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/auth/cadastro', pessoaUsuaria);
  }
  buscarCadastro(
    // token:string
  ): Observable<User> {
    //Already done the interceptor 
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json',
    //   'Authorization': 'Bearer ' + token
    // });
    return this.http.get<User>('http://localhost:8080/auth/perfil'
      // , {headers}
    );
  }
  editarCadastro(user:User
    // , token:string
  ): Observable<User> {
    // const headers = new HttpHeaders({ 
    //   'Authorization': 'Bearer ' + token
    // });
    return this.http.patch<User>('http://localhost:8080/auth/perfil', user,
      //  {headers}
      );
  }
}
