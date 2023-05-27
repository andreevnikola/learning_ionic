import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailsPageRoutingModule } from './movie-details-routing.module';

import { MovieDetailsPage } from './movie-details.page';
import { SafePipeModule } from 'safe-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailsPageRoutingModule,
    SafePipeModule,
  ],
  declarations: [MovieDetailsPage],
})
export class MovieDetailsPageModule {}
