import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceToolsComponent } from './resource-tools.component';

describe('ResourceToolsComponent', () => {
  let component: ResourceToolsComponent;
  let fixture: ComponentFixture<ResourceToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceToolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
