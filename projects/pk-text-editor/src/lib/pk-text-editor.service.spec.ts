import { TestBed } from '@angular/core/testing';

import { PkTextEditorService } from './pk-text-editor.service';

describe('PkTextEditorService', () => {
  let service: PkTextEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PkTextEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
