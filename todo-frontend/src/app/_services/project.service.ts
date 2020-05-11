import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Constants } from '../constants/config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../_models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectServices {
  private projects: Project[] = [];
  private projectsUpdated = new Subject<Project[]>();
  private URL = `${Constants.baseURL}project`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getProject() {
    this.http.get<{ message: string, projects: any }>(`${this.URL}`)
      .pipe(map(projectData => {
        return projectData.projects.map(project => {
          return {
            projectName: project.projectName,
            id: project._id
          };
        });
      }))
      .subscribe(transformedProject => {
        this.projects = transformedProject;
        this.projectsUpdated.next([...this.projects]);
      },
        (err) => {
          this.snackBar.open(err.error.error, 'Close');
        });
  }

  getProjectById(id: string) {
    return this.http.get<{ message: string, projects: any }>(`${this.URL}/${id}`);
  }

  addProject(newProject: Project) {
    this.http.post<{ message: string, project: any }>(this.URL, newProject).
      pipe(map(projectData => {
        return {
          projectName: projectData.project.projectName,
          id: projectData.project._id
        };
      }))
      .subscribe(transformedProject => {
        this.projects.push(transformedProject);
        this.projectsUpdated.next([...this.projects]);
      },
        (err) => {
          this.snackBar.open(err.error.error, 'Close');
        });
  }

  deleteProject(id: string) {
    this.http.delete(`${this.URL}/${id}`)
      .subscribe(
        () => {
          const updatedPosts = this.projects.filter(post => post.id !== id);
          this.projects = updatedPosts;
          this.projectsUpdated.next([...this.projects]);
        },
        (err) => {
          this.snackBar.open(err.error.error, 'Close');
        }
      );
  }

  updateProject(id: string, data: Project) {
    this.http.patch(`${this.URL}/${id}`, data)
      .subscribe(
        () => {
          debugger


          const editElement = { id, projectName: data.projectName };
          const index = this.projects.map(x => x.id).indexOf(id, 0);
          this.projects.splice(index, 1, editElement);
          this.projectsUpdated.next([...this.projects]);
        },
        (err) => {
          this.snackBar.open(err.error.error, 'Close');
        });
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }

}
