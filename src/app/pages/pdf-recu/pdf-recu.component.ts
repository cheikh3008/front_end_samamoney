 import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import {Router} from '@angular/router';
@Component({
  selector: 'app-pdf-recu',
  templateUrl: './pdf-recu.component.html',
  styleUrls: ['./pdf-recu.component.css']
})
export class PdfRecuComponent implements OnInit {
  dataEnvoi: any = [];
  dataRetrait: any = [];
  result: any;
  constructor(private  route: Router) { }

  ngOnInit() {
    this.dataEnvoi = JSON.parse(localStorage.getItem('dataEnvoi'));
    this.dataRetrait = JSON.parse(localStorage.getItem('dataRetrait'));
    this.getPdf();
  }
  getPdf() {
    if (JSON.parse(localStorage.getItem('dataEnvoi'))) {
      this.result = document.getElementById('dataEnvoi');
    } else if (JSON.parse(localStorage.getItem('dataRetrait'))) {
      this.result = document.getElementById('dataRetrait');
    } else {
      return;
    }
    const element = this.result;
    const opt = {
      margin:      [0, 1, 1, 1],
      image: { type: 'png', quality: 1 },
      filename:     'reçcu.pdf',
      html2canvas:  {},
      jsPDF:        {unit: 'in', format: 'a4', orientation: 'landscape' }
    };

// New Promise-based usage:
    html2pdf().from(element).set(opt).save();
    localStorage.removeItem('dataEnvoi');
    localStorage.removeItem('dataRetrait');
      /*return this.route.navigate(['dashboard']);*/
  }

}
