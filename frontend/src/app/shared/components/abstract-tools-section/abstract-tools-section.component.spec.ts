import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractToolsSectionComponent } from './abstract-tools-section.component';

describe('AbstractToolsSectionComponent', () => {
  let component: AbstractToolsSectionComponent;
  let fixture: ComponentFixture<AbstractToolsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractToolsSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbstractToolsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
