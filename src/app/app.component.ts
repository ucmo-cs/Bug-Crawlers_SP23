import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from './pop-up/pop-up.component';
import { MasterService } from './service/master.service';
import { User } from './interfaces/user.interface';
import { ExcelJson } from './interfaces/excel-json.interface';
import { HttpClient } from '@angular/common/http';

export interface Report {
  date: string;
  projects: string;
  reportStatus: string;
}

const REPORT_DATA: Report[] = [
  {date: '4/26/23', projects: 'FLP; FEMA', reportStatus: 'Missing'},
  {date: '4/25/23', projects: 'FLP; FEMA', reportStatus: 'Submitted' },
  {date: '4/24/23', projects: 'FLP; FEMA', reportStatus: 'Submitted' },
  {date: '4/23/23', projects: 'FLP; FEMA', reportStatus: 'Submitted' },
  {date: '4/22/23', projects: 'FLP; FEMA', reportStatus: 'Submitted' },
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
  filterText:string = '';
  users: User[];
  @ViewChild('userTable') userTable: ElementRef;

  tableData:any;
  tableDataUrl = 'https://fpvsdbdjs6.execute-api.us-east-2.amazonaws.com/dev/getTable';

  constructor(private dialogRef: MatDialog, private sharedService: MasterService, private http:HttpClient){

  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(){
    this.http.get(this.tableDataUrl).subscribe({
      next: data => {
        console.log(data);
        this.tableData = data;
      },
      error: err => {
        console.log(err);
        this.tableData = 'Error invoking API';
      }
    });
    this.dataSource.sort = this.sort;

      this.users = [
        {
          date:'4/26/2023',
          reportText:'test'
        },
        {
          date:'4/25/2023',
          reportText:'test'
        },
        {
          date:'4/24/2023',
          reportText:'test'
        }
      ];
  }

  openDialog(){
    this.dialogRef.open(PopUpComponent);
  }
  closeDialog(){
    this.dialogRef.closeAll();
  }

  Filterchange(event:Event){
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  downloadCSV(){
    this.sharedService.csvDownload(this.displayedColumns, REPORT_DATA);
  }

  exportElmToExcel(): void {
    this.sharedService.exportTableElmToExcel(this.userTable, 'user_data');
  }

  exportToExcel(): void {

    const edata: Array<ExcelJson> = [];
    const udt: ExcelJson = {
      data: [
        { A: 'User Data' }, // title
        { A: 'date', B: 'Report Text' }, // table header
      ],
      skipHeader: true
    };
    this.users.forEach(user => {
      udt.data.push({
        A: user.date,
        B: user.reportText
      });
    });
    edata.push(udt);

    this.sharedService.exportJsonToExcel(edata, 'user_data');
  }
}
