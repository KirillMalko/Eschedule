import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {
  response: any;
  weekday: number = 2;
  selectedSubgroup: string[] | undefined;
  selectedArtefact: string = '';
  selectedType:  string[] | undefined;
  selectedWeekNumber: string[] | undefined;
  selectedWeek: number = 1; // Инициализируйте номер недели по умолчанию
  shareWeek(e: any){
    this.selectedWeekNumber = e[0];
    console.log(this.selectedWeekNumber)
  }
  shareSubgroup(e: any){
    this.selectedSubgroup = e[0];
    console.log("selectedSubgroup" + this.selectedSubgroup)
  }
  shareType(e: any){
    this.selectedType = e[0];
    console.log(this.selectedType)
  }
  shareArtefact(e: any){
    this.selectedArtefact = e;
    console.log(this.selectedArtefact)
  }
  onWeekNumberChanged(weekNumber: number) {
    this.selectedWeek = weekNumber;
    console.log(this.selectedWeek)
  }
  URL:string = 'ds';
  constructor(private http: HttpClient) {

  }
  searchSchedule() {
    this.http.get(`http://schedule.elementfx.com/api/v1/schedule/group?group=${this.selectedArtefact}&subgroup=${this.selectedSubgroup}&type=${this.selectedType}&weeks%5B%5D=${this.selectedWeek}&weekdays%5B%5D=${this.weekday}`)
        .subscribe((response) => {
          this.response = response;
          console.log(this.response);
        })
  }


}
