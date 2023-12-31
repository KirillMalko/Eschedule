import {Component, EventEmitter, Output} from '@angular/core';
import {Task} from "../../../models/weeks";
import {ScheduleService} from "../../../service/service";

@Component({
  selector: 'app-type-sort',
  templateUrl: './type-sort.component.html',
  styleUrls: ['./type-sort.component.scss']
})
export class TypeSortComponent {
  task: Task = {
    name: "Все",
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'ЛК', completed: false, color: 'accent'},
      {name: 'ЛР', completed: false, color: 'accent'},
      {name: 'ПЗ', completed: false, color: 'accent'},
    ],
  };
  selectedType: string = '';
  allComplete: boolean = false;
  constructor(private scheduleService: ScheduleService) { }
  updateSelectedType(name: string) {
    // @ts-ignore
    this.task.subtasks.forEach(subtask => {
      if (subtask.name !== name) {
        subtask.completed = false;
      }
    });

    this.selectedType = name;
    this.scheduleService.setType(this.selectedType);
  }
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    // @ts-ignore
    this.selectedType = this.task.subtasks.filter(t => t.completed).map(t => t.name);
    // @ts-ignore
    this.scheduleService.setType(this.selectedType);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }

    return this.task.subtasks.filter(t => t.completed).length == 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }
}
