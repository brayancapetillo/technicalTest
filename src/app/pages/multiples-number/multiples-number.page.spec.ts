import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiplesNumberPage } from './multiples-number.page';

describe('MultiplesNumberPage', () => {
  let component: MultiplesNumberPage;
  let fixture: ComponentFixture<MultiplesNumberPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplesNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
