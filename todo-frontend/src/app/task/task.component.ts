

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskServices } from '../_services/task.service';
import { ProjectServices } from '../_services/project.service';
import { Task } from '../_models/task.model';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() project: any;
  @Input() task: any;
  @Output() projectEdit = new EventEmitter();
  private taskSub: Subscription;

  taskList: any[] = [];
  taskEdit: any = '';

  constructor(public service: TaskServices, public serviceProject: ProjectServices) { }

  ngOnInit(): void {
    this.taskList = this.task;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const task: Task = {
      id: this.taskEdit ? this.taskEdit._id : null,
      task: form.value.task ? form.value.task : this.taskEdit,
      done: false,
      project: this.project.id,
    };

    if (!this.taskEdit) {
      this.service.addTask(task);
      this.taskList.push(task);

    } else {
      this.service.updateTask(this.taskEdit._id, task);
      const index = this.taskList.map(x => x.id).indexOf(this.taskEdit.id, 1);
      this.taskList.splice(index, 1);
      this.taskList.push(task);
      this.taskEdit = null;
    }

    form.resetForm();
  }

  updateStatus(id: string) {
    const data = {
      done: true,
      finishDate: Date.now()
    };

    this.service.updateTask(id, data);
    const updateIndex = this.taskList.map((item) => item.id).indexOf(id);
    this.taskList[updateIndex].done = true;
    this.taskList[updateIndex].finishDate = Date.now();
  }

  onDelete(id: string) {
    this.service.deleteTask(id);
    const removeIndex = this.taskList.map((item) => item.id).indexOf(id);
    this.taskList.splice(removeIndex);
  }

  onDeleteProject(id: string) {
    this.serviceProject.deleteProject(id);
  }

  onEditProject(project: any) {
    this.projectEdit.emit({ id: project.id });
  }

  onEdit(id: string) {
    this.service.getTaskById(id).subscribe(data => {
      this.taskEdit = data.tasks;
    });
  }
}
