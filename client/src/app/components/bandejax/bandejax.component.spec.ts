import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaxComponent } from './bandejax.component';

describe('BandejaxComponent', () => {
  let component: BandejaxComponent;
  let fixture: ComponentFixture<BandejaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandejaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandejaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
