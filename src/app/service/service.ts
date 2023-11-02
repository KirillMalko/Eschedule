// schedule.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from "rxjs";




@Injectable()
export class ScheduleService {
  getGroup(): string {
    return this._group;
  }
  getType(): string | undefined {
    return this._type;
  }
  getSubgroup(): string | undefined {
    return this._subgroup;
  }
  getWeeks(): string[] | undefined {
    return this._weeks;
  }
  getWeekdays(): number[] {
    return this._weekdays;
  }
  private apiUrl:string  = 'http://schedule.elementfx.com/api/v1/schedule/group';
  private dataUrl = new BehaviorSubject<string>('');
  fullUrl$ = this.dataUrl.asObservable();
  private _group!: string;
  private _subgroup: string| undefined;
  private _type: string | undefined;
  private _weeks: string[] | undefined;
  private _weekdays: number[] = [1,2,3,4,5];

  constructor(private http: HttpClient) {
  }

  setWeeks(value: string[]) {
    this._weeks = value;
    this.setSchedule(this.getGroup(),  this.getSubgroup(),  this.getType(), this.getWeeks(), this.getWeekdays())

  }
  setType(value: string | undefined) {
    this._type = value;
    this.setSchedule(this.getGroup(),  this.getSubgroup(),  this.getType(), this.getWeeks(), this.getWeekdays())
  }
  setSubgroup(value: string | undefined) {
    this._subgroup = value;
    this.setSchedule(this.getGroup(),  this.getSubgroup(),  this.getType(), this.getWeeks(), this.getWeekdays())
  }
  setGroup(value: string) {
    this._group = value;
    this.setSchedule(this.getGroup(),  this.getSubgroup(),  this.getType(), this.getWeeks(), this.getWeekdays())
  }

  setSchedule(group: string, subgroup: string | undefined, type: string | undefined, weeks: string[] | undefined, weekdays: number[]){
    const baseUrl = 'https://schedule.elementfx.com/api/v1/schedule/group';
    const encodedGroup = encodeURIComponent(group ? group : 'СП091');
    const encodedSubgroup = Array.isArray(subgroup) && subgroup.length > 1 ? '' : subgroup ? `subgroup=${encodeURIComponent(subgroup)}` : '';
    const encodedType = Array.isArray(type) && type.length > 1 ? '' : type ? `type=${encodeURIComponent(type)}` : '';
    const encodedWeeks = Array.isArray(weeks) && weeks.length > 0 ? weeks.map(w => `weeks[]=${encodeURIComponent(w.toString())}`).join('&') : '';
    const encodedWeekdays = Array.isArray(weekdays) && weekdays.length > 0 ? weekdays.map(d => `weekdays[]=${encodeURIComponent(d.toString())}`).join('&') : '';

    let url = `${baseUrl}?group=${encodedGroup}`;
    if (subgroup) {
      url += `&${encodedSubgroup}`;
    }
    if (encodedType) {
      url += `&${encodedType}`;
    }
    if (encodedWeeks) {
      url += `&${encodedWeeks}`;
    }
    if (encodedWeekdays) {
      url += `&${encodedWeekdays}`;
    }

    this.dataUrl.next(url);
  }
  getSchedule() {
    return this.http.get(this.dataUrl.value);
  }

}
