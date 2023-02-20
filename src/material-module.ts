import {NgModule} from "@angular/core";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";


@NgModule({
    exports:[
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ]
})

export class MaterialModule{

}