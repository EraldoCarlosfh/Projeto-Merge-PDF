import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MergePdfService } from '../service/merge-pdf.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [MergePdfService, HttpClient],
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web-app-devops';

  constructor(private mergePDF: MergePdfService) {}

  async mergeAndDownload() {
    const pdfUrls = ['../assets/PDF01.pdf', '../assets/PDF02.pdf'];

    const mergedPdf = await this.mergePDF.mergePdfs(pdfUrls);

    // Disparar o download
    const blob = new Blob([mergedPdf], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'merged.pdf';
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
