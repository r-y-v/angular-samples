import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    NgxJsonViewerModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
