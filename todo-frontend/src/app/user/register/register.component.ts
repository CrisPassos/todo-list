
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../authorize/authorize.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServices } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../user.component.scss']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, public service: UserServices, private snackBar: MatSnackBar) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {

    console.log(form);

    if (form.invalid) {
      return;
    }

    const user: User = {
      name: form.value.username,
      email: this.email.value,
      password: form.value.password
    };

    this.service.createUser(user).subscribe(
      (data: any) => {
        console.log(data);
        this.service.setSession(data);
        this.router.navigate(['/home']);
      },
      (err) => {
        this.snackBar.open(err.error.error, 'Close');
      }
      ,
    );

    form.resetForm();
    this.email = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

  }

  login() {
    this.router.navigate(['/']);
  }

}
