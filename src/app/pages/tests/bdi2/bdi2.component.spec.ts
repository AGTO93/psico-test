import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bdi2Component } from './bdi2.component';

describe('Bdi2Component', () => {
  let component: Bdi2Component;
  let fixture: ComponentFixture<Bdi2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bdi2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bdi2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
