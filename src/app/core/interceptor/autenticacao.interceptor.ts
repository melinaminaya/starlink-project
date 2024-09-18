import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { request } from 'express';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

export const autenticacaoInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  if(tokenService.possuiToken()){
    const token = tokenService.retornarToken();
    // Clone the request and add the Authorization header with the token
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Pass the cloned request with the token to the next interceptor or handler
    return next(clonedReq);
  }
  return next(req);
};
