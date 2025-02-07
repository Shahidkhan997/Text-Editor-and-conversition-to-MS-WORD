import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PkTextEditorComponent } from 'pk-text-editor';
import { PkTextEditorService } from '../../projects/pk-text-editor/src/public-api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PkTextEditorComponent,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

@ViewChild('editor', { static: true }) editor!: ElementRef<HTMLDivElement>;

  constructor(private editorStateService: PkTextEditorService) {}
  fonts = ['Arial', 'Calibri', 'Times New Roman', 'Verdana', 'Courier New'];
  selectedFont: string = 'Arial';
  rows: number = 0;
  cols: number = 0;
  savedHtml: string = ''; 
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

  // saveContent() {
  //   this.editorStateService.saveState(this.editor.nativeElement.innerHTML);
  // }

  loadLastSavedContent() {
    this.editor.nativeElement.innerHTML = this.editorStateService.getLastState();
  }
  saveAsWord() {
    const content = this.editor.nativeElement.innerHTML;
    const wordDocument = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
        <head><meta charset='UTF-8'></head>
        <body>${content}</body>
      </html>`;

    // Convert to Blob for file download
    const blob = new Blob(['\ufeff', wordDocument], {
      type: 'application/msword'
    });

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'editor-content.doc';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  changeFont() {
    this.execCommand('fontName', this.selectedFont);
  }

  saveContent() {
    this.savedHtml = this.editor.nativeElement.innerHTML;
    localStorage.setItem('editorContent', this.savedHtml); // Save to localStorage
    alert('Content Saved Successfully!');
  }

  // ✅ Load saved HTML
  loadContent() {
    this.savedHtml = localStorage.getItem('editorContent') || '';
    this.editor.nativeElement.innerHTML = this.savedHtml;
    alert('Content Loaded Successfully!');
  }
}
