import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {ScrollingModule} from '@angular/cdk/scrolling';

import { DownloadOneMangaComponent } from './download-one-manga/download-one-manga.component';
import { ChaptersComponent } from './download-one-manga/chapters/chapters.component';
import { ChapterHeaderComponent } from './download-one-manga/chapters/chapter-header/chapter-header.component';
import { ChapterContentsComponent } from './download-one-manga/chapters/chapter-contents/chapter-contents.component';
import { LoadingBarComponent } from './download-one-manga/loading-bar/loading-bar.component';
import { UrlBarComponent } from './download-one-manga/url-bar/url-bar.component';
import { SupportedSiteComponent } from './download-one-manga/supported-site/supported-site.component';
import { ParametersComponent } from './download-one-manga/parameters/parameters.component';
import { URLValidatorDirective } from './_helper/urlvalidator.directive';
import { InfoMangaComponent } from './download-one-manga/info-manga/info-manga.component';

@NgModule({
  declarations: [
    AppComponent,
    DownloadOneMangaComponent,
    ChaptersComponent,
    ChapterHeaderComponent,
    ChapterContentsComponent,
    LoadingBarComponent,
    UrlBarComponent,
    SupportedSiteComponent,
    ParametersComponent,
    URLValidatorDirective,
    InfoMangaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatBadgeModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
