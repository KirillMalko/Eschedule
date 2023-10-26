import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'https://schedule.elementfx.com/api/v1/schedule/group';

  constructor(private http: HttpClient) {}
  getSchedule(group: string,subgroup: any, type: string[],weeks: number, weekdays: string): Observable<any> {
    const urlLink =`${this.apiUrl}?group=${group}
   &subgroup=${subgroup}
    &type=${type}
    &weeks%5B%5D=${weeks}
    &weekdays[]=${weekdays}`;
    return this.http.get<any[]>(urlLink);

  }


}
