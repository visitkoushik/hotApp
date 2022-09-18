import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { StoreName } from 'src/model/util';
import { AppStorageService } from '../app-storage/app-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public selectTheme = 'default';
  public renderer: Renderer2;
  public currentTheme;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    private store: AppStorageService
  ) {
    this.store
      .getStorage(StoreName.THEME)
      .then((thm) => {
        this.selectTheme = thm ? thm : this.selectTheme;
        this.activeTheme(this.selectTheme);
      })
      .catch((er) => {});
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  activeTheme(item) {
    this.renderer.removeClass(this.document.body, this.currentTheme);
    this.currentTheme = item;
    this.renderer.addClass(this.document.body, item);
  }
}
