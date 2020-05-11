import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectServices } from '../_services/project.service';
import { Project } from '../_models/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input() project: any;
  name: string;

  constructor(public service: ProjectServices) { }
  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    if (!this.project) {
      if (form.invalid) {
        return;
      }
    }

    const project: Project = {
      projectName: form.value.projectName ? form.value.projectName : this.project.projectName,
    };

    if (this.project) {
      this.service.updateProject(this.project._id, project);
      this.project = null;
    } else {
      this.service.addProject(project);
    }


    form.resetForm();
  }

}
