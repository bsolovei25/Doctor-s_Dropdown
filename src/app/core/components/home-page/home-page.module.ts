import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { DropdownSelectComponent } from '../../../shared/dropdown-select/dropdown-select.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SvgIconsReader } from '../../../shared/directives/svgIconsReader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    HomePageComponent,
    DropdownSelectComponent,
    SvgIconsReader
  ],
  exports: [
    HomePageComponent,
    SvgIconsReader
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class HomePageModule {}
