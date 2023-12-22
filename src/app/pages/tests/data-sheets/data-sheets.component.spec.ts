import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSheetsComponent } from './data-sheets.component';

describe('DataSheetsComponent', () => {
  let component: DataSheetsComponent;
  let fixture: ComponentFixture<DataSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSheetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
