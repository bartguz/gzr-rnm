import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CharacterFilter } from '../../models/character-filter';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updatePage, from 9 to 11', () => {
    component.page = 9;
    component.updatePage(11);
    expect(component.page === 11).toBeTruthy();
  });

  it('updateFilter, expected page 1 and new filter values', () => {
    const oldFilter: CharacterFilter = { name: 'oldValue', species: 'oldValue', gender: 'oldVlue' };
    const newFilter: CharacterFilter = { name: 'newValue', species: 'newValue', gender: 'newValue' };
    component.page = 9;
    component['filter'] = oldFilter;
    component.updateFilter(newFilter);
    expect(component.page === 1).toBeTruthy();
    expect(JSON.stringify(component['filter']) === JSON.stringify(newFilter)).toBeTruthy();
  });

});
