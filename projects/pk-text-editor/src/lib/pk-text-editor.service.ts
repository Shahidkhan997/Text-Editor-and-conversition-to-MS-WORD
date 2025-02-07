import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PkTextEditorService {

  private history: string[] = [];

  saveState(content: string) {
    this.history.push(content);
  }

  getLastState(): string {
    return this.history.length ? this.history[this.history.length - 1] : '';
  }
}
