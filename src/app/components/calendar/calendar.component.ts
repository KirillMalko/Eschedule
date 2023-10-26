import { Component, Input, OnInit } from '@angular/core';
import { ScheduleService } from '../../service/service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() daysOfWeek: string[] | undefined;
  @Input() timeStart: string[] | undefined;
  @Input() timeEnd: string[] | undefined;
  @Input() receivedData: any;


  scheduleData: any[] | undefined;
  tableData: any[][] = [];
  private result: object | undefined;

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.fetchScheduleData();
    console.log(this.receivedData)
  }

  fetchScheduleData() {
    // // @ts-ignore
    // console.log( this.receivedData.group +  this.receivedData.subgroup  +   this.receivedData.type + this.receivedData.weeks +  this.receivedData.weekdays)

    this.scheduleService.getSchedule(
          this.receivedData[0], this.receivedData[1],
      this.receivedData[2], this.receivedData[3],
      this.receivedData[4]).subscribe((data: any) => {
      const schedule = data.data.schedule;
      this.scheduleData = schedule;
      console.log(this.scheduleData)
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
        item => item.weekday.name === day && item.time.start === timeSlot
      );
      if (schedule) {
        const { auditory, subject, teacher, type } = schedule;
        const subjectFull = subject ? subject.full : '';
        const subjectAbbr = subject ? subject.abbreviated : '';
        const teacherFullName = teacher ? teacher.fullName : '';
        const typeFull = type ? type.full : '';
        const typeAbbr = type ? type.abbreviated : '';

        const result = {
          subjectAbbr,
          auditory,
          subjectFull,
          teacherFullName,
          typeFull,
          typeAbbr
        };
        return result;
      }
    }
    return null;
  }
}
