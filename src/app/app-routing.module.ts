import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './movie/dashboard/dashboard.component';
import { DetailsComponent } from './movie/details/details.component';

const routes: Routes = [{ path: '', component: DashboardComponent },
{ path: 'dashboard/:year', component: DashboardComponent }
, { path: 'movie-details', component: DetailsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
