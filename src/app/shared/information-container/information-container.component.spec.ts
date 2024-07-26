import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationContainerComponent } from './information-container.component';

describe('InformationContainerComponent', () => {
  let component: InformationContainerComponent;
  let fixture: ComponentFixture<InformationContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
