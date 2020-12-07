import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDungeonComponent } from './edit-dungeon.component';

describe('EditDungeonComponent', () => {
  let component: EditDungeonComponent;
  let fixture: ComponentFixture<EditDungeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDungeonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDungeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
