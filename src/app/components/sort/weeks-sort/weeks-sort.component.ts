import {Component, Input, OnInit} from '@angular/core';
import {Week} from "../../../models/weeks";
import {DateSelectionService} from "../../../service/date-selection-service.service";
import {ScheduleService} from "../../../service/service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-weeks-sort',
    templateUrl: './weeks-sort.component.html',
    styleUrls: ['./weeks-sort.component.scss']
})
export class WeeksSortComponent implements OnInit {
    selectedDate: Date | undefined;
    currentWeek: number | undefined;
    date: Date | undefined;
    private subscription: Subscription | undefined;

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

    constructor(
        private dateSelectionService: DateSelectionService,
        private scheduleService: ScheduleService
    ) {
    }

    updateAllComplete() {
        this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
        // @ts-ignore
        this.selectedWeek = this.task.subtasks.filter(t => t.completed).map(t => t.name);
        this.scheduleService.setWeeks(this.selectedWeek);
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

    getCurrentWeekNumber(date: Date): number {
        const today = date ? date : new Date();

        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const startDate = new Date(today.getFullYear(), 8, 1);
        const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
        let weekNumber = Math.ceil((startOfWeek.getTime() - startDate.getTime()) / millisecondsPerWeek) + 1;

        if (weekNumber > 4) {
            weekNumber = weekNumber % 4;
            if (weekNumber === 0) {
                weekNumber = 4;
            }
        }

        return weekNumber;
    } //const nextYearStart = new Date(today.getFullYear() + 1, 8, 1);

    ngOnInit() {

        this.subscription = this.dateSelectionService.date$.subscribe(
            (date: Date) => {
                this.date = date;
                this.getCurrentWeekNumber(this.date);
                this.currentWeek = this.getCurrentWeekNumber(this.date);
                this.updateAllComplete()
                this.task.subtasks?.filter(el => {
                    if (el.id == this.currentWeek) {
                        el.completed = true;
                        el.color = 'warn';
                    } else {
                        el.completed = false;
                        el.color = 'accent';
                    }
                });
                this.updateAllComplete();
            }
        );
        this.task.subtasks?.filter(el => {
            if (el.id == this.currentWeek) {
                el.completed = true;
                el.color = 'warn';
                this.updateAllComplete();
            }
        });


        this.selectedDate = this.dateSelectionService.selectedDate;

    }


}
