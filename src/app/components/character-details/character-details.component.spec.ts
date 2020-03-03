import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailsComponent } from './character-details.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDetailsComponent], imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
