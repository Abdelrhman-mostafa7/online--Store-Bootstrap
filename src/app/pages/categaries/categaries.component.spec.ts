import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategariesComponent } from './categaries.component';

describe('CategariesComponent', () => {
  let component: CategariesComponent;
  let fixture: ComponentFixture<CategariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
