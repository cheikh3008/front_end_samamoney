import { Component, OnInit } from '@angular/core';
import {CountService} from '../../services/count.service';
import {Chart} from 'node_modules/chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private countService: CountService, ) { }
  dataCount: any;
  barSysteme: any;
  barPartenaire: any;
  lineSysteme: any;
  linePartenaire: any;
  roles: string;
  ngOnInit() {
    this.roles = JSON.parse(localStorage.getItem('roles'));
    this.getCount();
  }
  getCount() {
    this.countService.getCount().subscribe(data => {
      this.dataCount = data;
      this.dataCount.forEach(function(value) {
        console.log(value);
        if (document.getElementById('chartLineSysteme') || document.getElementById('chartBarSysteme')) {
          const chartLineSysteme = document.getElementById('chartLineSysteme');
          this.lineSysteme = new Chart(chartLineSysteme, {
            // The type of chart 'we' want to create
            type: 'line',

            // The data for our dataset
            data: {
              labels: ['Utilisateurs', 'Partenaires', 'Comptes', 'Dépots'],
              datasets: [{
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: ['#f99102', '#469c49', '#d63933', '#009fe3'],
                data: [value.user, value.partenaire, value.compte, value.depot],
                pointRadius: 10,
                pointStyle: 'star',
              }]
            },
            // Configuration options go here
            options: {
              title: {
                display: true,
                text: 'Courbe d\'évolution',
              },
              legend: false,
            }
          });
          const chartBarSysteme = document.getElementById('chartBarSysteme');
          this.barSysteme = new Chart(chartBarSysteme, {
            // The type of chart 'we' want to create
            type: 'bar',

            // The data for our dataset
            data: {
              labels: ['Utilisateurs', 'Partenaires', 'Comptes', 'Dépots'],
              datasets: [{
                backgroundColor: ['#f99102', '#469c49', '#d63933', '#009fe3'],
                borderColor: 'rgb(255, 255, 255)',
                data: [value.user, value.partenaire, value.compte, value.depot],
              }]
            },
            // Configuration options go here
            options: {
              title: {
                display: true,
                text: 'Diagramme en bâton',
              },
              legend: false,
            }
          });
        } else if (document.getElementById('chartLinePartenaire') || document.getElementById('chartBarPartenaire')) {
          const chartLinePartenaire = document.getElementById('chartLinePartenaire');
          this.linePartenaire = new Chart(chartLinePartenaire, {
            // The type of chart 'we' want to create
            type: 'line',

            // The data for our dataset
            data: {
              labels: ['Utilisateurs', 'Comptes', 'Envois', 'Retraits'],
              datasets: [{
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: ['#f99102', '#469c49', '#d63933', '#009fe3'],
                data: [value.user, value.compte, value.envoi, value.retrait],
                pointRadius: 10,
                pointStyle: 'star',
              }]
            },
            // Configuration options go here
            options: {
              responsive: true,
              scales: {
                yAxes: [{
                  display: true,
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              title: {
                display: true,
                text: 'Courbe d\'évolution',
              },
              legend: false,
            },
            animation: {
              animateScale: true,
              animateRotate: true
            }
          });
          const chartBarPartenaire = document.getElementById('chartBarPartenaire');
          this.barPartenaire = new Chart(chartBarPartenaire, {
            // The type of chart 'we' want to create
            type: 'bar',

            // The data for our dataset
            data: {
              labels: ['Utilisateurs', 'Comptes', 'Envois', 'Retraits'],
              datasets: [{
                backgroundColor: ['#f99102', '#469c49', '#d63933', '#009fe3'],
                borderColor: 'rgb(255, 255, 255)',
                data: [value.user, value.compte, value.envoi, value.retrait],
              }]
            },
            // Configuration options go here
            options: {
              responsive: true,
              scales: {
                yAxes: [{
                  display: true,
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              title: {
                display: true,
                text: 'Diagramme en bâton',
              },
              legend: false,
            }
          });
        } else  {
          return;
        }
      }, error => {
        console.log(error);
      });
    });
  }
  isAdmin() {
    if ( this.roles[0] === 'ROLE_SUPER_ADMIN' || this.roles[0] === 'ROLE_ADMIN') {
      return true;
    }
  }
  isPartenaire() {
    if ( this.roles[0] === 'ROLE_PARTENAIRE' || this.roles[0] === 'ROLE_ADMIN_PARTENAIRE') {
      return true;
    }
  }
}
