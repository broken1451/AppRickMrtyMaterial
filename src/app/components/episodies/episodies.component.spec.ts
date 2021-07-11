import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodiesComponent } from './episodies.component';

describe('EpisodiesComponent', () => {
  let component: EpisodiesComponent;
  let fixture: ComponentFixture<EpisodiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
