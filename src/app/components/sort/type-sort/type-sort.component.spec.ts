import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSortComponent } from './type-sort.component';

describe('TypeSortComponent', () => {
  let component: TypeSortComponent;
  let fixture: ComponentFixture<TypeSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeSortComponent]
    });
    fixture = TestBed.createComponent(TypeSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
