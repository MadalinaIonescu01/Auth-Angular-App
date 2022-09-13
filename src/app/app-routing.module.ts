import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { InputDataComponent } from './input-data/input-data.component';

const routes: Routes = [
  { path: 'input-data' , component: InputDataComponent },
  { path: '' , component: AuthComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
