import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../models/character';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { PagedResults } from '../models/paged-results';
import { CharacterFilter } from '../models/character-filter';

@Injectable({
  providedIn: 'root'
})
export class CharacterApiService {
  readonly baseUrl: string = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) { }

  private filterToQuery(filter: any) {
    if (!filter) {
      return '';
    }
    return Object.entries(filter).map(x => x.join('=')).join('&');
  }
  get(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}${id}`).pipe(share());
  }
  getList(page: number, filters: CharacterFilter = null): Observable<PagedResults<Character>> {
    const query: string = this.filterToQuery({ page, ...filters });
    return this.http.get<PagedResults<Character>>(`${this.baseUrl}?${query}`).pipe(share());
  }
}
