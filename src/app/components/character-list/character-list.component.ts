import { Component, OnInit } from '@angular/core';
import { CharacterApiService } from '../../services/character-api.service';
import { Character } from 'src/app/models/character';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Router } from '@angular/router';
import { CharacterFilter } from '../../models/character-filter';
import { Info } from 'src/app/models/Info';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characterList$: Observable<Character[]>;
  pageInfo$: Observable<Info>;
  private filter: CharacterFilter;
  page = 1;
  constructor(private api: CharacterApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadListPage(this.page, this.filter);
  }
  goToDetails(id: number) {
    this.router.navigateByUrl(`details/${id}`);
  }
  updateFilter(filter: CharacterFilter) {
    this.filter = filter;
    this.page = 1;
    this.loadListPage(this.page, this.filter);
  }
  updatePage(page: number) {
    this.page = page;
    this.loadListPage(this.page, this.filter);
  }
  loadListPage(page: number, filter: CharacterFilter) {
    const apiCall = this.api.getList(page, filter);
    this.characterList$ = apiCall.pipe(map(x => x.results));
    this.pageInfo$ = apiCall.pipe(map(x => x.info));
  }
}
