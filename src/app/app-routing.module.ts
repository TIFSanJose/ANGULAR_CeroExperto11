import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponent } from './pages/reactive/reactive.component';

const routes: Routes = [
  {
    path: 'reactivo', component: ReactiveComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo:'reactivo'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
