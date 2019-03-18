import { cacheUrl } from './http-interceptor';
import { HttpResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlManagement } from './api-url-management';

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

export abstract class RequestCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;
  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;
}

const maxAge = 30000; // maximum cache age (ms)

@Injectable()
export class RequestCacheWithMap implements RequestCache {
  cache = new Map<string, RequestCacheEntry>();

  constructor() {}

  // getCacheTime(url: string): number {
  //   const Time = cacheUrl.filter(d => d.cacheTime )[0].cacheTime;
  //   return !!url && !!Time?Time:maxAge;
  // }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);
    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < Date.now() - maxAge;
    const expired = isExpired ? 'expired ' : '';
    return isExpired ? undefined : cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;

    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    // remove expired cache entries
    const expired = Date.now() - maxAge;
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });
  }
}
