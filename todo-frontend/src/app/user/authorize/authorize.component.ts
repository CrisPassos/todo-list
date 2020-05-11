import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserServices } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user.model';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['../user.component.scss']
})
export class AuthorizeComponent implements OnInit {
  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  constructor(private router: Router, public service: UserServices, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  createAccount() {
    this.router.navigate(['/register']);
  }

  onSubmit(form: NgForm) {
    console.log(form);

    if (form.invalid) {
      return;
    }

    const user: User = {
      email: this.email.value,
      password: form.value.password
    };

    this.service.login(user).subscribe(
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

}
