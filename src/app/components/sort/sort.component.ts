import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {ScheduleService} from "../../service/service";

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  @Output() sortedData: EventEmitter<any> = new EventEmitter<any>();
  arrSort: any[] = [];
  weekday: number = 2;
  selectedSubgroup: number = 1;
  selectedArtefact: string = '';
  selectedType: string[] = [];
  selectedWeekDay: number[] = [];
  selectedWeek!: number;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.shareWeek(this.selectedWeekDay);
    this.shareSubgroup(this.selectedSubgroup);
    this.shareType(this.selectedType);
    this.shareArtefact(this.selectedArtefact);
    this.onWeekNumberChanged(this.selectedWeek);
    setTimeout(() => {
      this.transferData(this.arrSort);
      console.log(this.arrSort[0]);
    }, 50);
  }

  shareWeek(e: any) {
    this.selectedWeekDay = e;
    this.arrSort.splice(3, 0, this.selectedWeek);
  }

  shareSubgroup(e: any) {
    this.selectedSubgroup = e.length < 1 ? null : e;
    this.arrSort.splice(1, 0, this.selectedSubgroup);
  }

  shareType(e: any) {
    this.selectedType = e.length >= 1 ? e : [];
    this.arrSort.splice(2, 0, this.selectedType);
  }

  shareArtefact(e: any) {
    this.selectedArtefact = e;
    this.arrSort.splice(0, 0, this.selectedArtefact);
  }

  onWeekNumberChanged(weekNumber: number) {
    this.selectedWeek = weekNumber;
  }

  transferData(arrSort: any) {
    this.arrSort.splice(4, 0, [1, 2, 3, 4, 5]);
    this.sortedData.emit(this.arrSort);
  }
}
