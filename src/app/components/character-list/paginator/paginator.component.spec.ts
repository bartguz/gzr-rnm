import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasPreviousPage - true', () => {
    component.page = 3;
    expect(component.hasPreviousPage).toBeTruthy();
  });

  it('hasPreviousPage - false', () => {
    component.page = 1;
    expect(component.hasPreviousPage).toBeFalsy();
  });

  it('hasNextPage - true', () => {
    component.pageInfo = { next: 'url', count: 1, pages: 1, prev: 'url' };
    expect(component.hasNextPage).toBeTruthy();
  });

  it('hasNextPage - false', () => {
    component.pageInfo = { next: '', count: 1, pages: 1, prev: 'url' };
    expect(component.hasNextPage).toBeFalsy();
  });
});
