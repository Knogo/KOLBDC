import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonlistComponent } from './dungeonlist.component';

describe('DungeonlistComponent', () => {
  let component: DungeonlistComponent;
  let fixture: ComponentFixture<DungeonlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DungeonlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DungeonlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
