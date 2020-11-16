import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiverListComponent } from './diver-list.component';

describe('DiverListComponent', () => {
  let component: DiverListComponent;
  let fixture: ComponentFixture<DiverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiverListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
