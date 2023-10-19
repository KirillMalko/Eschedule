import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Week} from "../../../models/weeks";
import {DataSharingService} from "../../../service/data-sharing";
import {DateSelectionService} from "../../../service/date-selection-service.service";

@Component({
  selector: 'app-weeks-sort',
  templateUrl: './weeks-sort.component.html',
  styleUrls: ['./weeks-sort.component.scss']
})
export class WeeksSortComponent {
  @Input() weekNumber: number | undefined;

  selectedDate: Date | undefined;
  currentWeek: number | undefined
  constructor(private dateSelectionService: DateSelectionService) {}
  task: Week = {
    id: 0,
    name: "Все",
    completed: false,
    color: 'primary',
    subtasks: [
      {id: 1, name: '1', completed: false, color: 'accent'},
      {id: 2, name: '2', completed: false, color: 'accent'},
      {id: 3, name: '3', completed: false, color: 'accent'},
      {id: 4, name: '4', completed: false, color: 'accent'},
    ]
  };
  selectedWeek: string[] = [];

  allComplete: boolean = false;
@Output() onChanged = new EventEmitter<string>();

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    // @ts-ignore
    this.selectedWeek = this.task.subtasks.filter(t => t.completed).map(t => t.name);
    // @ts-ignore
    this.onChanged.emit(this.selectedWeek);

    // console.log(this.selectedWeek)
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
  getCurrentWeekNumber(): number {
    const today = new Date();
    const september1st = new Date(today.getFullYear(), 8, 1); // 8 - сентябрь (месяцы в JavaScript начинаются с 0)
    // @ts-ignore
    const daysPassed = Math.floor((today - september1st) / (24 * 60 * 60 * 1000)); // Разница в днях
    const currentWeek = Math.floor(daysPassed / 7) + 1; // +1 для нумерации недель с 1
    let currentWeekResult = Math.min(4, Math.max(1, currentWeek));
    this.task.subtasks?.filter((el) => {
      if(el.id == currentWeekResult){
        el.completed = true;
        el.color ='warn';
        this.updateAllComplete();
      }
    })
    // Ограничьте результат до 1-4, так как у вас всего 4 недели
    return currentWeekResult;

  }


  ngOnInit() {
    // Вызываем метод для определения текущей недели при инициализации компонента
  this.getCurrentWeekNumber();
    console.log(this.weekNumber)
    this.selectedDate = this.dateSelectionService.selectedDate;
    this.currentWeek = this.dateSelectionService.currentWeek;

    // this.task.subtasks?.filter((el) => {
    //   if(el.id == this.weekNumber){
    //     el.completed = true;
    //     el.color ='warn';
    //     this.updateAllComplete();
    //   }
    // })
  }

}
