import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { EpubReaderComponent } from './epub-reader/epub-reader.component';

const routes: Routes = [
  {
    path: '',
    component: EpubReaderComponent,
  },
  {
    path: 'reader',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
