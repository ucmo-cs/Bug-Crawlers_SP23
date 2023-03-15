import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from './pop-up/pop-up.component';
import {MatDatepicker } from "@angular/material/datepicker";


export interface Report {
  date: string;
  projects: string;
  reportStatus: string;
  
}

const REPORT_DATA: Report[] = [
  {date: '2/20/23', projects: 'FLP, FEMA', reportStatus: 'Missing'},
  {date: '2/19/23', projects: 'FLP, FEMA', reportStatus: 'Submitted' },
  {date: '2/18/23', projects: 'FLP, FEMA', reportStatus: 'Submitted'},
  {date: '2/17/23', projects: 'FLP, FEMA', reportStatus: 'Submitted'},
  {date: '2/16/23', projects: 'FLP', reportStatus: 'Submitted'},
  {date: '2/15/23', projects: 'FLP', reportStatus: 'Submitted'},
  {date: '2/14/23', projects: 'FLP', reportStatus: 'Submitted' },
  {date: '2/13/23', projects: 'FLP', reportStatus: 'Submitted'},
  {date: '2/12/23', projects: 'FLP', reportStatus: 'Submitted' },
  {date: '2/11/23', projects: 'FLP', reportStatus: 'Submitted' },
  {date: '2/10/23', projects: 'FLP', reportStatus: 'Submitted' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RisenOne';
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  displayedColumns: string[] = ['date', 'projects', 'reportStatus'];
  dataSource = new MatTableDataSource(REPORT_DATA);

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit()   {
      this.dataSource.sort = this.sort;
  }

  constructor(private dialogRef: MatDialog){

  }

  openDialog(){
    this.dialogRef.open(PopUpComponent);
  }
  closeDialog(){
    this.dialogRef.closeAll();
  }
}
