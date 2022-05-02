import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RootFolderModule} from "./containers/structure/root-folder.module";
import { FocusDirective } from './directives/focus.directive';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RootFolderModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
