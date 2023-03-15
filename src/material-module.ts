import {NgModule} from "@angular/core";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import {MatDatepickerModule } from "@angular/material/datepicker";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    exports:[
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule
    ]
})

export class MaterialModule{

}