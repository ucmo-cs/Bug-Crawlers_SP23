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
  statusID: number;
  date: string;
  projects: string;
  reportStatus: string;
  description: string;
}

const REPORT_DATA: Report[] = [];

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
  exportColumns: string[] = ['date', 'projects', 'reportText'];

  tableData:any;
  tableDataUrl = 'https://fpvsdbdjs6.execute-api.us-east-2.amazonaws.com/dev/getTable';
  test:any;
  constructor(private dialogRef: MatDialog, private sharedService: MasterService, private http:HttpClient){
  }

  getData() {
    console.log("Getting Data")
    for (let i = 0; i < this.tableData.Count; i++) {
      let Projects = "N/A";
      let Status = "Missing";
      if (this.tableData.Items[i].Projects == 3)
        Projects = "FLP; FEMA";
      else if (this.tableData.Items[i].Projects == 1)
        Projects = "FLP";
      else if (this.tableData.Items[i].Projects == 2)
        Projects = "FEMA";
      if (this.tableData.Items[i].Submitted == true)
        Status = "Submitted";
      REPORT_DATA.push({statusID: this.tableData.Items[i].StatusID, date: this.tableData.Items[i].Date,
         projects: Projects, reportStatus: Status, description: this.tableData.Items[i].Description});
    }
    REPORT_DATA.sort((a, b) => {
      if (a.statusID > b.statusID) {
        return -1;
      }
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(){}

  ngOnInit(){
    this.http.get(this.tableDataUrl).subscribe({
      next: data => {
        console.log(data);
        this.tableData = data;
        this.getData();
      },
      error: err => {
        console.log(err);
        this.tableData = 'Error invoking API';
      }
    });

    this.dataSource.sort = this.sort;

      this.users = [
        {
          date:'4/20/2023',
          reportText:'test'
        },
        {
          date:'4/20/2023',
          reportText:'test'
        },
        {
          date:'4/19/2023',
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
    this.sharedService.csvDownload(this.exportColumns, REPORT_DATA);
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
