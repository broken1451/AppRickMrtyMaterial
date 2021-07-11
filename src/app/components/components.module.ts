import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { MaterialModule } from '../material/material.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchComponent } from './search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EpisodiesComponent } from './episodies/episodies.component';

@NgModule({
  declarations: [HomeComponent, DetailsComponent, HomePageComponent, SearchComponent, EpisodiesComponent],
  imports: [CommonModule, ComponentsRoutingModule,FormsModule, MaterialModule, ReactiveFormsModule],
})
export class ComponentsModule {}
