// schedule.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from "rxjs";




@Injectable()
export class ScheduleService {
  getGroup(): string {
    return this._group;
  }
  getType(): string[] | undefined {
    return this._type;
  }
  getSubgroup(): number | undefined {
    return this._subgroup;
  }
  getWeeks(): number[] | undefined {
    return this._weeks;
  }
  getWeekdays(): number[] {
    return this._weekdays;
  }
  private apiUrl:string  = 'http://schedule.elementfx.com/api/v1/schedule/group';
  private dataUrl = new BehaviorSubject<string>('');
  fullUrl$ = this.dataUrl.asObservable();
  private _group!: string;
  private _subgroup: number| undefined;
  private _type: string[]| undefined;
  private _weeks: number[] | undefined;
  private _weekdays: number[] = [1,2,3,4,5];

  constructor(private http: HttpClient) {
  }
  setWeeks(value: number[] | undefined) {
    this.setSchedule(this.getGroup(),  this.getSubgroup(),  this.getType(), this.getWeeks(), this.getWeekdays())
    this._weeks = value;
  }
  setType(value: string[] | undefined) {
    this._type = value;
    this.setSchedule(this.getGroup(),  this.getSubgroup(),  this.getType(), this.getWeeks(), this.getWeekdays())
  }
  setSubgroup(value: number | undefined) {
    this._subgroup = value;
    this.setSchedule(this.getGroup(),  this.getSubgroup(),  this.getType(), this.getWeeks(), this.getWeekdays())
  }
  setGroup(value: string) {
    this._group = value;
    this.setSchedule(this.getGroup(),  this.getSubgroup(),  this.getType(), this.getWeeks(), this.getWeekdays())
  }

  setSchedule(group: string, subgroup: number | undefined, type: string[] | undefined, weeks: number[] | undefined, weekdays: number[]){
  console.log('group: ' + this._group + 'subgroup: ' + this._subgroup, 'type: '  + this._type + 'Weeks: ' + this._weeks, 'Weekdays: ' + this._weekdays)
  const baseUrl = 'https://schedule.elementfx.com/api/v1/schedule/group';
  const encodedGroup = encodeURIComponent(group ? group : '');
  const encodedType = Array.isArray(type) && type.length > 0 ? type.map(t => `type=${encodeURIComponent(t)}`).join('&') : 'type=%D0%9B%D0%9A';
  const encodedWeeks = Array.isArray(weeks) && weeks.length > 0 ? weeks.map(w => `weeks[]=${encodeURIComponent(w.toString())}`).join('&') : 'weeks[]=1';
  const encodedWeekdays = Array.isArray(weekdays) && weekdays.length > 0 ? weekdays.map(d => `weekdays[]=${encodeURIComponent(d.toString())}`).join('&') : '';

    this.dataUrl.next(`${baseUrl}?group=${encodedGroup}&${encodedType}&${encodedWeeks}&${encodedWeekdays}`);



}
  getSchedule() {
    return this.http.get(this.dataUrl.value);
  }

}
