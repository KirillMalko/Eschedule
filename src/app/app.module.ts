import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './UI/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { SearchComponent } from './components/sort/search/search.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {AsyncPipe, DatePipe, NgFor} from "@angular/common";
import {MatTableModule} from '@angular/material/table';
import { CalendarComponent } from './components/calendar/calendar.component';
import {HttpClientModule} from "@angular/common/http";
import {ScheduleService} from "./service/service";
import {DataSharingService} from './service/data-sharing';
import { SortComponent } from './components/sort/sort.component'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { WeeksSortComponent } from './components/sort/weeks-sort/weeks-sort.component';
import { SubgroupSortComponent } from './components/sort/subgroup-sort/subgroup-sort.component';
import { TypeSortComponent } from './components/sort/type-sort/type-sort.component';
import { DatepickerComponent } from './components/sort/datepicker/datepicker.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    CalendarComponent,
    SortComponent,
    WeeksSortComponent,
    SubgroupSortComponent,
    TypeSortComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    MatTableModule,
    HttpClientModule,
    MatCheckboxModule,
    NgFor,
    MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule
  ],
  providers: [ScheduleService, DataSharingService,WeeksSortComponent, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
