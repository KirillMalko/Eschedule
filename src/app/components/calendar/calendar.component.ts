import {Component, Input, OnInit} from '@angular/core';
import { ScheduleService } from '../../service/service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @Input() daysOfWeek: string[] | undefined; // Массив дней недели (["Пн", "Вт", ...])
  @Input() timeSlots: string[] | undefined; // Массив временных слотов (["09:00 - 10:30", "10:45 - 12:15", ...])
  @Input() scheduleData: any[] | undefined; // Данные расписания, возможно, двумерный массив

  getScheduleForTimeAndDay(day: string, timeSlot: string): string {
    // Здесь вам нужно извлечь данные из scheduleData в зависимости от дня и времени.
    // Например, можно пройти по двумерному массиву или использовать другую структуру данных.

    // Возвращайте данные для конкретного времени и дня.
    return 'Ваше расписание';
  }

}
