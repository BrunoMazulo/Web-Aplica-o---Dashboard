import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamentoComponent } from './tratamento.component';

describe('TratamentoComponent', () => {
  let component: TratamentoComponent;
  let fixture: ComponentFixture<TratamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
