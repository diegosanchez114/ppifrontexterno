import { Component, Inject, inject, OnInit } from '@angular/core';
import { IntegrationModule } from '../../modules/integration.module';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'bottom-sheet-component',
  standalone: true,
  imports: [IntegrationModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  readonly data = inject<string>(MAT_BOTTOM_SHEET_DATA);

  #sanitizer = inject(DomSanitizer);

  sanitizedHtml!: SafeHtml;
  
  ngOnInit(): void {
    this.sanitizeHtml(this.data); 
  }

  sanitizeHtml(html: string) {
    this.sanitizedHtml = this.#sanitizer.bypassSecurityTrustHtml(html);
  }

}
