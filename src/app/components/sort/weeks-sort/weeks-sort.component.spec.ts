import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeksSortComponent } from './weeks-sort.component';

describe('WeeksSortComponent', () => {
  let component: WeeksSortComponent;
  let fixture: ComponentFixture<WeeksSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeksSortComponent]
    });
    fixture = TestBed.createComponent(WeeksSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
