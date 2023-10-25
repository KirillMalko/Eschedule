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
  @Input() timeSlots: string[] | undefined;
  scheduleData: any[] | undefined;
  tableData: any[][] = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.fetchScheduleData();
  }

  fetchScheduleData() {
    this.scheduleService.getSchedule("ИП291", [1]).subscribe((data: any) => {
      const schedule = data.data.schedule;
      this.scheduleData = schedule;
      console.log(this.scheduleData)
      this.generateTableData();
    });
  }

  generateTableData() {
    // @ts-ignore
    for (let i = 0; i < this.timeSlots.length; i++) {
      const rowData = [];
      // @ts-ignore
      for (let j = 0; j < this.daysOfWeek.length; j++) {
        // @ts-ignore
        const day = this.daysOfWeek[j];
        // @ts-ignore
        const timeSlot = this.timeSlots[i];
        const schedule = this.getScheduleForTimeAndDay(day, timeSlot);
        rowData.push(schedule);
      }
      this.tableData.push(rowData);
    }
  }

  getScheduleForTimeAndDay(day: string, timeSlot: string): string {
    if (this.scheduleData) {
      const schedule = this.scheduleData.find(
        item => item.weekday.name === day && item.time.start === timeSlot
      );
      if (schedule) {
        const { auditory, subject, teacher, type } = schedule;
        const subjectFull = subject ? subject.full : '';
        const teacherFullName = teacher ? teacher.fullName : '';
        const typeFull = type ? type.full : '';
        return `${auditory}, ${subjectFull}, ${teacherFullName}, ${typeFull}`;
      }
    }
    return 'Нет занятий';
  }
}
