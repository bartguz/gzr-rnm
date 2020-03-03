import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterFilterComponent } from './character-filter.component';
import { CharacterFilter } from '../../../models/character-filter';

describe('CharacterFilterComponent', () => {
  let component: CharacterFilterComponent;
  let fixture: ComponentFixture<CharacterFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterFilterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('obj compare - equal objects', () => {
    const x = { a: 111, b: 'asd' };
    const y = { a: 111, b: 'asd' };
    expect(component['compareObjects'](x, y)).toBeTruthy();
  });

  it('obj compare - different objects', () => {
    const x = { a: 111, b: 'asd', c: 123 };
    const y = { a: 111, b: 'asd' };
    expect(component['compareObjects'](x, y)).toBeFalsy();
  });

  it('prepareFilter - ', () => {
    const values = ['name', 'dropdownName', 'speciesValue', 'genderValue'];
    const expected: CharacterFilter = { name: 'dropdownName', species: 'speciesValue', gender: 'genderValue' };
    const preparedFilter = component['prepareFilter'](values);
    expect(JSON.stringify(expected) === JSON.stringify(preparedFilter)).toBeTruthy();
  });

  it('clearForm - all falsey after clean', () => {
    Object.values(component.filters.controls).forEach(x => x.setValue('testVal'));
    component.filters.reset();
    expect(component.filters.get('flexName').value).toBeFalsy();
    expect(component.filters.get('name').value).toBeFalsy();
    expect(component.filters.get('gender').value).toBeFalsy();
    expect(component.filters.get('species').value).toBeFalsy();
  });
});
