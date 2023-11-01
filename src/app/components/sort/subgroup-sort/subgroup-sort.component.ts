import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Task} from "../../../models/weeks";
import {ScheduleService} from "../../../service/service";


@Component({
  selector: 'app-subgroup-sort',
  templateUrl: './subgroup-sort.component.html',
  styleUrls: ['./subgroup-sort.component.scss']
})
export class SubgroupSortComponent {
  task: Task = {
    name: "Все",
    completed: false,
    color: 'primary',
    subtasks: [
      {name: '1', completed: false, color: 'accent'},
      {name: '2', completed: false, color: 'accent'}
    ],
  };
  selectedSubgroup: string[] = [];
  allComplete: boolean = false;

  constructor(private scheduleService: ScheduleService) {

  }
  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    // @ts-ignore
    this.selectedSubgroup = this.task.subtasks.filter(t => t.completed).map(t => t.name);
    // @ts-ignore
    this.scheduleService.setSubgroup(this.selectedSubgroup)


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


}
