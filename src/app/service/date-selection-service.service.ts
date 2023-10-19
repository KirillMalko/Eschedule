import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateSelectionService {
  selectedDate: Date = new Date(); // Пример инициализации значением по умолчанию
  currentWeek!: number;
}
