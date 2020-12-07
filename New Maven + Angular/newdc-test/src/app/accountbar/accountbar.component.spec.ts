import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountbarComponent } from './accountbar.component';

describe('AccountbarComponent', () => {
  let component: AccountbarComponent;
  let fixture: ComponentFixture<AccountbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
