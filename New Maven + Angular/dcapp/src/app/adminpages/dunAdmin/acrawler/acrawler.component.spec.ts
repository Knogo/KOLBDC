import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcrawlerComponent } from './acrawler.component';

describe('AcrawlerComponent', () => {
  let component: AcrawlerComponent;
  let fixture: ComponentFixture<AcrawlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcrawlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcrawlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
