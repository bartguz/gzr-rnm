import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CharacterFilter } from '../../../models/character-filter';
import { Subscription, combineLatest } from 'rxjs';
import { debounceTime, tap, startWith, skip, distinctUntilChanged, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrls: ['./character-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterFilterComponent implements OnInit, OnDestroy {
  @Output() filterChange: EventEmitter<CharacterFilter> = new EventEmitter<CharacterFilter>();
  private flexNameSub: Subscription;
  private nameSub: Subscription;
  private formSub: Subscription;

  // no real way to get full data for dropdowns (aside from getting all pages), so just a few examples in dropdowns
  // gender options come from api docs
  genders: string[] = ['Male', 'Female', 'Genderless', 'unknown'];
  species: string[] = ['Human', 'Alien', 'Humanoid', 'Robot'];
  names: string[] = ['Rick', 'Beth', 'Jerry', 'Morty', 'Summer'];

  filters: FormGroup = new FormGroup({
    flexName: new FormControl(''),
    name: new FormControl(''),
    species: new FormControl(''),
    gender: new FormControl(''),
  });

  constructor() { }
  private compareObjects(obj1: any, obj2: any) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
  private prepareFilter(values: any[]): CharacterFilter {
    const characterFilter: CharacterFilter = {};
    const name = values[1] || values[0];
    const species = values[2];
    const gender = values[3];
    if (name) {
      characterFilter.name = name;
    }
    if (species) {
      characterFilter.species = species;
    }
    if (gender) {
      characterFilter.gender = gender;
    }
    return characterFilter;
  }
  // requirements sounded a bit unclear - both search and filter by name.
  // decided to allow usage of both dropdown and input, but not at the same time - one replaces another.
  ngOnInit(): void {
    const flexNameChanges = this.filters.get('flexName').valueChanges.pipe(startWith(''), debounceTime(400), distinctUntilChanged());
    const nameChanges = this.filters.get('name').valueChanges.pipe(startWith(''));
    this.formSub = combineLatest([
      flexNameChanges,
      nameChanges,
      this.filters.get('species').valueChanges.pipe(startWith('')),
      this.filters.get('gender').valueChanges.pipe(startWith(''))])
      .pipe(skip(1), map(x => this.prepareFilter(x)), distinctUntilChanged(this.compareObjects)).subscribe(x => this.emitFilterChange(x));
    // preventing clearing loop
    this.flexNameSub = flexNameChanges.pipe(filter(x => x)).subscribe(x => this.filters.get('name').reset(''));
    this.nameSub = nameChanges.pipe(filter(x => x)).subscribe(x => this.filters.get('flexName').reset(''));
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
    this.flexNameSub.unsubscribe();
    this.nameSub.unsubscribe();
  }

  emitFilterChange(characterFilter: CharacterFilter) {
    this.filterChange.emit(characterFilter);
  }
  clearForm() {
    this.filters.reset();
  }
}
