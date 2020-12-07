import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupgradesComponent } from './dupgrades.component';

describe('DupgradesComponent', () => {
  let component: DupgradesComponent;
  let fixture: ComponentFixture<DupgradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DupgradesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DupgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
