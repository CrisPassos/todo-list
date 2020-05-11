import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Constants } from '../constants/config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../_models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskServices {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();
  private URL = `${Constants.baseURL}task`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getTask() {
    return this.http.get<{ message: string, tasks: any }>(this.URL)
      .pipe(map(data => {
        return data.tasks.map(result => {

          return {
            done: result.done,
            project: result.project,
            task: result.task,
            finishDate: result.finishDate,
            id: result._id
          };
        });
      }))
      .subscribe(transformedTask => {
        this.tasks = transformedTask;
        this.tasksUpdated.next([...this.tasks]);
      },
        (err) => {
          this.snackBar.open(err.error.error, 'Close');
        });
  }

  getTaskById(id: string) {
    return this.http.get<{ message: string, tasks: any }>(`${this.URL}/${id}`);
  }

  addTask(task: Task) {
    this.http.post<{ message: string, task: any }>(this.URL, task)
      .subscribe(
        (data) => {
          const id = data.task._id;
          task.id = id;
          this.tasks.push(task);
          this.tasksUpdated.next([...this.tasks]);
        },
        (err) => {
          this.snackBar.open(err.error.error, 'Close');
        }
      );
  }

  updateTask(id: string, data: any) {
    this.http.patch(`${this.URL}/${id}`, data)
      .subscribe(
        () => {
          const updated = this.tasks.filter(task => task.id !== id);
          this.tasks = updated;
          this.tasksUpdated.next([...this.tasks]);
        },
        (err) => {
          this.snackBar.open(err.error.error, 'Close');
        });
  }

  deleteTask(id: string) {
    this.http.delete(`${this.URL}/${id}`)
      .subscribe(
        () => {
          const updated = this.tasks.filter(task => task.id !== id);
          this.tasks = updated;
          this.tasksUpdated.next([...this.tasks]);
        },
        (err) => {
          this.snackBar.open(err.error.error, 'Close');
        }
      );
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

}
