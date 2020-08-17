import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-contrat-recu',
  templateUrl: './contrat-recu.component.html',
  styleUrls: ['./contrat-recu.component.css']
})
export class ContratRecuComponent implements OnInit {
  dataContrat: any = [];
  result: any;
  constructor() { }

  ngOnInit() {
    this.dataContrat = JSON.parse(localStorage.getItem('dataContrat'));
    this.getPdf();
  }
  getPdf() {
    if (JSON.parse(localStorage.getItem('dataContrat'))) {
      this.result = document.getElementById('dataContrat');
    } else {
      return;
    }
    const element = this.result;
    const opt = {
      margin:      [0.8, 1, 1, 1.1],
      image: { type: 'png', quality: 1 },
      filename:     'reçcu.pdf',
      html2canvas:  {},
      jsPDF:        {unit: 'in', format: 'a4', orientation: 'landscape' }
    };

// New Promise-based usage:
    html2pdf().from(element).set(opt).save();
    localStorage.removeItem('dataContrat');
    /*return this.route.navigate(['dashboard']);*/
  }

}
