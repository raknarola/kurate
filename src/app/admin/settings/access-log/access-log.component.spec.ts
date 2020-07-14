/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccessLogComponent } from './access-log.component';

describe('AccessLogComponent', () => {
  let component: AccessLogComponent;
  let fixture: ComponentFixture<AccessLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
