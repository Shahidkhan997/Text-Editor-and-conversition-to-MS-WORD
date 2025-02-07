import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PkTextEditorComponent } from './pk-text-editor.component';

describe('PkTextEditorComponent', () => {
  let component: PkTextEditorComponent;
  let fixture: ComponentFixture<PkTextEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PkTextEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PkTextEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
