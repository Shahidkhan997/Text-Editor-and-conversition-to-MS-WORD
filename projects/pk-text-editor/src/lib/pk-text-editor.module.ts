import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PkTextEditorComponent } from './pk-text-editor.component';
import { ContenteditableDirectiveTsDirective } from './contenteditable.directive.ts.directive';

@NgModule({
  declarations: [PkTextEditorComponent, ContenteditableDirectiveTsDirective],
  imports: [CommonModule],
  exports: [PkTextEditorComponent],
})
export class RichTextEditorModule {}