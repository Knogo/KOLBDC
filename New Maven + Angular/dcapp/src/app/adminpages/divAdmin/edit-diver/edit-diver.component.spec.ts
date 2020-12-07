import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiverComponent } from './edit-diver.component';

describe('EditDiverComponent', () => {
  let component: EditDiverComponent;
  let fixture: ComponentFixture<EditDiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDiverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
