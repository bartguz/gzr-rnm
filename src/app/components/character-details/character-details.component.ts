import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CharacterApiService } from '../../services/character-api.service';
import { Character } from 'src/app/models/character';
import { flatMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDetailsComponent implements OnInit {

  private readonly dummy: Character = { id: null, name: 'character not found', species: null, gender: null, image: null };
  characterId$: Observable<number>;
  character$: Observable<Character>;
  constructor(private route: ActivatedRoute, private api: CharacterApiService) { }

  ngOnInit(): void {
    this.character$ = this.route.paramMap.pipe(
      flatMap((params: ParamMap) => this.api.get(+params.get('cid')).pipe(catchError(
        err => of(this.dummy)
      )))
    );
  }

}
