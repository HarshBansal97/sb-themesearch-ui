import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagRemarkComponent } from './tag-remark.component';

describe('TagRemarkComponent', () => {
  let component: TagRemarkComponent;
  let fixture: ComponentFixture<TagRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
