import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcralwerComponent } from './ccralwer.component';

describe('CcralwerComponent', () => {
  let component: CcralwerComponent;
  let fixture: ComponentFixture<CcralwerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcralwerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcralwerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
