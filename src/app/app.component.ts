import { Component } from '@angular/core';

export interface Report {
  date: string;
  projects: string;
  reportStatus: string;
  
}

const ELEMENT_DATA: Report[] = [
  {date: '13-Feb-2023', projects: 'FLP, FEMA', reportStatus: 'Missing'},
  {date: '12-Feb-2023', projects: 'FLP, FEMA', reportStatus: 'Submitted' },
  {date: '11-Feb-2023', projects: 'FLP, FEMA', reportStatus: 'Submitted'},
  {date: '10-Feb-2023', projects: 'FLP, FEMA', reportStatus: 'Submitted'},
  {date: '9-Feb-2023', projects: 'FLP', reportStatus: 'Submitted'},
  {date: '8-Feb-2023', projects: 'FLP', reportStatus: 'Submitted'},
  {date: '7-Feb-2023', projects: 'FLP', reportStatus: 'Submitted' },
  {date: '6-Feb-2023', projects: 'FLP', reportStatus: 'Submitted'},
  {date: '5-Feb-2023', projects: 'FLP', reportStatus: 'Submitted' },
  {date: '4-Feb-2023', projects: 'FLP', reportStatus: 'Submitted' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RisenOne';
  displayedColumns: string[] = ['date', 'projects', 'reportStatus'];
  dataSource = ELEMENT_DATA;
}
