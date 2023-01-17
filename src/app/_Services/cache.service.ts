import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  // Definissons une requête
  private request : any = {};

  // Une fonction pour créer une cache de la requête dans url
  cacheRequest(requestUrl: string, response: HttpResponse<any>): void {
    this.request[requestUrl] = response;
  }


  // Une fonction pour avoir une cache de la requête url
  getCache(requestUrl: string): HttpResponse<any> | null {
    return this.request[requestUrl];
  }


  invalidateCache(requestUrl: string): void {
    this.request[requestUrl] = null;
  }


  // une méthode pour vider la cache
  clearCache(): void {
    this.request = {};
  }


}
