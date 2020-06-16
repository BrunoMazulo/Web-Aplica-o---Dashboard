import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LunicaComponent } from './lunica.component';

describe('LunicaComponent', () => {
  let component: LunicaComponent;
  let fixture: ComponentFixture<LunicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LunicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LunicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
