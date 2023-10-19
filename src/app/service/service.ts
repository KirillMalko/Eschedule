import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'https://schedule.elementfx.com/api/v1/schedule/group';

  constructor(private http: HttpClient) {}

  getScheduleForGroup(group: string, weekdays: number[]): Observable<any> {
    const url = `${this.apiUrl}?group=${group}&weekdays[]=${weekdays.join('&weekdays[]=')}`;

    return this.http.get(url);
  }
}
