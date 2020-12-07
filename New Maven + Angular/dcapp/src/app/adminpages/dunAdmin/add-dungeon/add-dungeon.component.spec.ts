import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDungeonComponent } from './add-dungeon.component';

describe('AddDungeonComponent', () => {
  let component: AddDungeonComponent;
  let fixture: ComponentFixture<AddDungeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDungeonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDungeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
