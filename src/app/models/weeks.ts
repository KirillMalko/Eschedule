import {ThemePalette} from "@angular/material/core";

export interface Task {

    name: string;
    completed: boolean;
    color: ThemePalette;
    subtasks?: Task[];
}

export interface Week {
    id: number;
    name: string;
    completed: boolean;
    color: ThemePalette;
    subtasks?: Week[];
}
