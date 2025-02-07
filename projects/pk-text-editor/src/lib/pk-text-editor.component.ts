import { Component, ElementRef, ViewChild } from '@angular/core';
import { PkTextEditorService } from './pk-text-editor.service';

@Component({
  selector: 'lib-pk-text-editor',
  standalone: true,
  imports: [],
  templateUrl: './pk-text-editor.component.html',
  styles: ['./pk-text-editor.component.scss'],
})
export class PkTextEditorComponent {
  @ViewChild('editor', { static: true }) editor!: ElementRef<HTMLDivElement>;

  constructor(private editorStateService: PkTextEditorService) {}
  rows: number = 2;
  cols: number = 3;

  insertTable(): void {
    if (!this.editor) return;
    let tableHtml = '<table border="1" style="border-collapse: collapse;">';
    for (let i = 0; i < this.rows; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < this.cols; j++) {
        tableHtml += '<td contenteditable="true" style="padding: 5px; min-width: 50px;">&nbsp;</td>';
      }
      tableHtml += '</tr>';
    }
    tableHtml += '</table><br/>';

    this.insertHtmlAtCursor(tableHtml);
  }

  private insertHtmlAtCursor(html: string) {
    const range = document.getSelection()?.getRangeAt(0);
    if (range) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const fragment = document.createDocumentFragment();
      let node;
      while ((node = tempDiv.firstChild)) {
        fragment.appendChild(node);
      }
      range.deleteContents();
      range.insertNode(fragment);
    }
  }

  execCommand(command: string, value?: string) {
    document.execCommand(command, false, value || '');
  }

  undo() {
    document.execCommand('undo');
  }

  redo() {
    document.execCommand('redo');
  }

  saveContent() {
    this.editorStateService.saveState(this.editor.nativeElement.innerHTML);
  }

  loadLastSavedContent() {
    this.editor.nativeElement.innerHTML = this.editorStateService.getLastState();
  }
}
