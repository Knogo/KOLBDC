import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupgradesComponent } from './cupgrades.component';

describe('CupgradesComponent', () => {
  let component: CupgradesComponent;
  let fixture: ComponentFixture<CupgradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupgradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
