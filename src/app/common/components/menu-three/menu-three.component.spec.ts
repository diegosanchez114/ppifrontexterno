import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuThreeComponent } from './menu-three.component';

describe('MenuThreeComponent', () => {
  let component: MenuThreeComponent;
  let fixture: ComponentFixture<MenuThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
