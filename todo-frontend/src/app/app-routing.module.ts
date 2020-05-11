import { AuthGuardService } from './guards/auth-guard.service';
import { MainComponent } from './main/main.component';
import { AuthorizeComponent } from './user/authorize/authorize.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';


const routes: Routes = [
  { path: '', component: AuthorizeComponent },
  { path: 'login', component: AuthorizeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: MainComponent, canActivate: [AuthGuardService] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
