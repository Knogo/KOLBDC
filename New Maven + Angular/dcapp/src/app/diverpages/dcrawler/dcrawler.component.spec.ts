import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcrawlerComponent } from './dcrawler.component';

describe('DcrawlerComponent', () => {
  let component: DcrawlerComponent;
  let fixture: ComponentFixture<DcrawlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcrawlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcrawlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
