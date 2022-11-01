import { Injectable } from '@angular/core';
import { apiData } from './data';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FestivalService {
  private url =
    'https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals';

  constructor() {}

  getFestival() {
    // return this.httpClient.get(this.url);
    return of(apiData);
  }
}
