import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'https://schedule.elementfx.com/api/v1/schedule/group';

  constructor(private http: HttpClient) {}

  getSchedule(group: string, weekdays: number[]): Observable<any> {
    // http://schedule.elementfx.com/api/v1/schedule/group?
    // group=${this.selectedArtefact}
    // &subgroup=${this.selectedSubgroup}
    // &type=${this.selectedType}
    // &weeks%5B%5D=${this.selectedWeek}
    // &weekdays%5B%5D=${this.weekday}
    const url = `${this.apiUrl}?group=${group}&weekdays[]=${weekdays.join('&weekdays[]=')}`;
    console.log(group + " " + weekdays)
    return this.http.get<any[]>(url);

  }


}
