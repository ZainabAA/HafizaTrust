import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private readonly _http: HttpClient) {}

  get<ResponseType>(url: string, params?: any, headers?: any) {
    return this._http.get<ResponseType>(url, { params, headers });
  }

  post<ResponseType, RequestBodyType>(
    url: string,
    body: RequestBodyType,
    params?: any,
    headers?: any
  ) {
    return this._http.post<ResponseType>(url, body, { params, headers });
  }

  put<ResponseType, RequestBodyType>(
    url: string,
    body: RequestBodyType,
    params?: any,
    headers?: any
  ) {
    return this._http.put<ResponseType>(url, body, { params, headers });
  }

  delete<ResponseType>(url: string, params?: any, headers?: any) {
    return this._http.delete<ResponseType>(url, { params, headers });
  }
}
