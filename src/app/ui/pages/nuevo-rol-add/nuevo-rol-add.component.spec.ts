import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRolAddComponent } from './nuevo-rol-add.component';

describe('NuevoRolAddComponent', () => {
  let component: NuevoRolAddComponent;
  let fixture: ComponentFixture<NuevoRolAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoRolAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoRolAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
