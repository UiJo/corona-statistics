import {NgModule} from '@angular/core';
import {InfoCardComponent} from "./info-card/info-card.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {InfoChartComponent} from "./info-chart/info-chart.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {InfoCardSimpleComponent} from "./info-card-simple/info-card-simple.component";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    DashboardComponent,
    InfoCardComponent,
    InfoChartComponent,
    InfoCardSimpleComponent,
  ],
  imports: [
    CommonModule,

    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    MatButtonModule,

    NgApexchartsModule,

    DashboardRoutingModule,
  ]
})
export class DashboardModule {
}
