import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'rickMorty',
    loadChildren: () => import('./components/components.module').then((m) => m.ComponentsModule),
  },
  {
    path: '**',
    redirectTo: 'rickMorty',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
