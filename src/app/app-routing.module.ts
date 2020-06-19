import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './views/overview/overview.component';
import { TimelineComponent } from './views/timeline/timeline.component';


const routes: Routes = [
  {path: '' , component: OverviewComponent},
  {path: 'overview' , component: OverviewComponent},
  {path: 'timeline' , component: TimelineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
