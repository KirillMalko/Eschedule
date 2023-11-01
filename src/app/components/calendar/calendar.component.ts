import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { ScheduleService } from '../../service/service';
import { MatTableDataSource } from '@angular/material/table';
import {Subscription} from "rxjs";
import {group} from "@angular/animations";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  fullUrl!: string;
  private subscription!: Subscription;

  @Input() daysOfWeek: string[] | undefined;
  @Input() timeStart: string[] | undefined;
  @Input() timeEnd: string[] | undefined;
  @Input() receivedData!: any[];

  scheduleData: any[] | undefined;
  tableData: any[][] = [];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    setTimeout( () =>{
      this.subscription = this.scheduleService.fullUrl$.subscribe(
        (group: string) => {
          this.fullUrl = group;
          // Вызов функции или выполнение нужных действий при изменении значения `_group`
          this.fetchScheduleData();
        })
    }, 0);





  }

  fetchScheduleData() {
    this.scheduleService.getSchedule()
      .subscribe((data: any) => {
        const schedule = data.data.schedule;
        this.scheduleData = schedule;
        this.generateTableData();
      });
  }

  generateTableData() {
    // @ts-ignore
    for (let i = 0; i < this.timeStart.length; i++) {
      const rowData = [];
      // @ts-ignore
      for (let j = 0; j < this.daysOfWeek.length; j++) {
        // @ts-ignore
        const day = this.daysOfWeek[j];
        // @ts-ignore
        const timeSlot = this.timeStart[i];
        const schedule = this.getScheduleForTimeAndDay(day, timeSlot);
        rowData.push(schedule);
      }
      this.tableData.push(rowData);
    }
  }

  getScheduleForTimeAndDay(day: string, timeSlot: string): any {
    if (this.scheduleData) {
      const schedule = this.scheduleData.find(
        (item: any) =>
          item.weekday.name === day && item.time.start === timeSlot
      );
      if (schedule) {
        const { auditory, subject, teacher, type } = schedule;
        const subjectFull = subject ? subject.full : "";
        const subjectAbbr = subject ? subject.abbreviated : "";
        const teacherFullName = teacher ? teacher.fullName : "";
        const typeFull = type ? type.full : "";
        const typeAbbr = type ? type.abbreviated : "";

        const result = {
          subjectAbbr,
          auditory,
          subjectFull,
          teacherFullName,
          typeFull,
          typeAbbr,
        };
        return result;
      }
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

