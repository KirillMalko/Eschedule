import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ScheduleService} from "./service";

@Injectable({
  providedIn: 'root'
})
export class DateSelectionService {
  private groupSubject = new BehaviorSubject<Date>(new Date());
  date$ = this.groupSubject.asObservable();
  selectedDate: Date | undefined;
    getGroup(): Date {
    return this.groupSubject.value;
  }
  setGroup(value: Date) {
    this.groupSubject.next(value);
    console.log(value)
  }


 }




