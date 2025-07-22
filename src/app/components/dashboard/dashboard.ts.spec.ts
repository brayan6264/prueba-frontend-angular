import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTs } from './dashboard.ts';

describe('DashboardTs', () => {
  let component: DashboardTs;
  let fixture: ComponentFixture<DashboardTs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
