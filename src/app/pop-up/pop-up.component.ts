import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  tableItem:any;
  StatusID = '1';
  Username = 'Someone';
  Description = 'Test';
  FLP = false;
  FEMA = false;
  DateTime = '5-5-5';
  TableItemUrl = 'https://fpvsdbdjs6.execute-api.us-east-2.amazonaws.com/dev/insertItem/'
  +this.StatusID+"?Username="+this.Username+"&Description="+this.Description+"&FLP="
  +this.FLP+"&FEMA="+this.FEMA+"&Date="+this.DateTime;

  onClickSuccess(): void {
    this.http.get(this.TableItemUrl).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    });
    this.dialogRef.closeAll();
  }
  onNoClick(): void {
    this.dialogRef.closeAll();
  }
  constructor(private dialogRef: MatDialog, private http:HttpClient){

  }

  ngOnInit() {

  }
  
}
