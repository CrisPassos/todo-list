
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Project } from '../_models/project.model';
import { TaskServices } from '../_services/task.service';
import { ProjectServices } from '../_services/project.service';
import { UserServices } from '../_services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  title = 'todo-frontend';
  projects: Project[] = [];
  projectEdit = null;
  tasks: any;
  private taskSub: Subscription;
  private projectSub: Subscription;

  constructor(private router: Router, public serviceTask: TaskServices, public service: ProjectServices, public user: UserServices) { }

  async ngOnInit(): Promise<void> {
    await this.getTasks();
    await this.getProjects();
  }

  edit(event) {
    this.service.getProjectById(event.id).subscribe(data => {
      this.projectEdit = data.projects;
    });
  }

  getProjects = async () => {
    this.service.getProject();
    this.projectSub = this.service.getProjectUpdateListener()
      .subscribe((data: Project[]) => {
        this.projects = data;
        this.projects.map(project => {
          const newArray = [];
          for (const task of this.tasks) {
            if (project.id === task.project) {
              newArray.push(task);
            }
          }
          project.tasks = newArray;
        });
        console.log(this.projects);
      });
  }

  getTasks = async () => {
    this.serviceTask.getTask();
    this.taskSub = this.serviceTask.getTaskUpdateListener()
      .subscribe(data => {
        this.tasks = data;
      });
  }

  logout() {
    this.user.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.taskSub.unsubscribe();
    this.projectSub.unsubscribe();
  }




}
