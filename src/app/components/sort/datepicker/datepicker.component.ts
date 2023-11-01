import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { format, startOfWeek, endOfWeek, addDays, parse } from 'date-fns';
import { DateSelectionService } from "../../../service/date-selection-service.service";
import {ScheduleService} from "../../../service/service";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
  @ViewChild('calendar') calendar: MatDatepicker<Date> | undefined;
  @Output() weekNumberChanged = new EventEmitter<number>();
  currentWeek: number = this.getCurrentWeekNumber(); // Инициализируйте номер недели по умолчанию
  startDate: Date;
  endDate: Date;
  selectedDate: Date = new Date();

  openCalendar() {
    // @ts-ignore
    this.calendar.open();
  }

  formatStartDate(): string {
    return format(this.startDate, 'dd MMMM yyyy');
  }

  formatEndDate(): string {
    return format(this.endDate, 'dd MMMM yyyy');
  }

  constructor(private dateSelectionService: DateSelectionService, private scheduleService: ScheduleService) {
    const today = new Date();
    this.startDate = startOfWeek(today);
    this.endDate = endOfWeek(today);
  }

  onDateSelect(selectedDate: MatDatepickerInputEvent<Date>) {
    const parsedDate = selectedDate.value;
    // @ts-ignore
    this.dateSelectionService.setGroup(selectedDate.value)
    if (parsedDate) {
      this.selectedDate = parsedDate;
      this.startDate = startOfWeek(parsedDate);
      this.endDate = endOfWeek(parsedDate);
    }
  }
  getCurrentWeekNumber(): number {
    const today = new Date();
    const september1st = new Date(today.getFullYear(), 8, 1); // 8 - сентябрь (месяцы в JavaScript начинаются с 0)
    // @ts-ignore
    const daysPassed = Math.floor((today - september1st) / (24 * 60 * 60 * 1000)); // Разница в днях
    const currentWeek = Math.floor(daysPassed / 7) + 1; // +1 для нумерации недель с 1
    let currentWeekResult = Math.min(4, Math.max(1, currentWeek));
     // Ограничьте результат до 1-4, так как у вас всего 4 недели
    return currentWeekResult;

  }


  previousWeek(increased:any) {
    this.selectedDate = addDays(this.selectedDate, -7);
    this.updateDateRange();
    this.currentWeek--;
    this.emitWeekNumber();
  }

  nextWeek(increased:any) {
    this.selectedDate = addDays(this.selectedDate, 7);
    this.updateDateRange();
    this.currentWeek++;
    this.emitWeekNumber();
  }

  updateDateRange() {
    this.startDate = startOfWeek(this.selectedDate);
    this.endDate = endOfWeek(this.selectedDate);
  }
  private emitWeekNumber() {
    this.weekNumberChanged.emit(this.currentWeek);
  }


}
