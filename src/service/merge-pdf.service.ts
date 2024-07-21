import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Injectable({
  providedIn: 'root',
})
export class MergePdfService {
  constructor(private http: HttpClient) {}

  async downloadPdf(url: string): Promise<Uint8Array> {
    return this.http
      .get(url, {
        responseType: 'arraybuffer',
        headers: { 'Access-Control-Allow-Origin': '*' },
      })
      .toPromise()
      .then((data) => new Uint8Array(data ? data : []));
  }

  async mergePdfs(pdfUrls: string[]): Promise<Uint8Array> {
    const mergedPdf = await PDFDocument.create();

    for (const url of pdfUrls) {
      const pdfBytes = await this.downloadPdf(url);
      const pdf = await PDFDocument.load(pdfBytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      for (const page of pages) {
        mergedPdf.addPage(page);
      }
    }
    return mergedPdf.save();
  }
}
