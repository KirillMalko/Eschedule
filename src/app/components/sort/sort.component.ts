import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit{
  @Output() sortedData: EventEmitter<any> = new EventEmitter<any>();
   sortData: object = {};
  weekday: number = 2;
  selectedSubgroup:number = 1;
  selectedArtefact: string = '';
  selectedType: string[] = [];
  selectedWeekDay: number[] = [];
  selectedWeek: number = 1; // Инициализируйте номер недели по умолчанию

  shareWeek(e: any){
    this.selectedWeekDay = e[0];
    this.sortData = {
      ...this.sortData,
      weeks: this.selectedWeekDay,
      weekdays: '1&weekdays%5B%5D=2&weekdays%5B%5D=3&weekdays%5B%5D=4&weekdays%5B%5D=5'
    };

    console.log(this.selectedWeekDay)
  }
  shareSubgroup(e: any){
    this.selectedSubgroup = e.length < 1 ? '' : e;
    this.sortData = {
      ...this.sortData,
      subgroup: this.selectedSubgroup
    };
    console.log(this.selectedSubgroup)
  }
  shareType(e: any){
    this.selectedType = e.length < 1 ? '' : e;
    this.sortData = {
      ...this.sortData,
      type: this.selectedType
    };
    console.log(this.selectedType)

  }
  //Выбор группы
  shareArtefact(e: any){
    this.selectedArtefact = e;
    this.sortData = {
      ...this.sortData,
      group: this.selectedArtefact
    };
    console.log(this.selectedArtefact)
  }
  //Для datepicker нужно чтобы она ещё и обновляла значение в shareWeek
  onWeekNumberChanged(weekNumber: number) {
    this.selectedWeek = weekNumber;
    this.sortData = {
      ...this.sortData,
      weeks: this.selectedWeek,
      weekdays: [1, 2, 3, 4, 5]
    };

  }
  transferData(sortData: object) {
   const arrSort = [this.selectedArtefact, this.selectedSubgroup, this.selectedType, this.selectedWeek, [1,2,3,4,5]]
    console.log(sortData);
    return this.sortedData.emit(arrSort);
  }
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // @ts-ignore
    this.transferData(this.sortData)
  }
  }

