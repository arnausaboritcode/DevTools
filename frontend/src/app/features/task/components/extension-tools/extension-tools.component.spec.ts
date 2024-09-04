import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionToolsComponent } from './extension-tools.component';

describe('ExtensionToolsComponent', () => {
  let component: ExtensionToolsComponent;
  let fixture: ComponentFixture<ExtensionToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExtensionToolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtensionToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
