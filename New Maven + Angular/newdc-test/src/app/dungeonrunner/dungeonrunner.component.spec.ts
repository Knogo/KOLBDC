import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonrunnerComponent } from './dungeonrunner.component';

describe('DungeonrunnerComponent', () => {
  let component: DungeonrunnerComponent;
  let fixture: ComponentFixture<DungeonrunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DungeonrunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DungeonrunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
