import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgroupSortComponent } from './subgroup-sort.component';

describe('SubgroupSortComponent', () => {
  let component: SubgroupSortComponent;
  let fixture: ComponentFixture<SubgroupSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubgroupSortComponent]
    });
    fixture = TestBed.createComponent(SubgroupSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
