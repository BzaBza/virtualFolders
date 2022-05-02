import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FolderComponent} from "./components/folder/folder.component";
import {FileComponent} from "./components/file/file.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DynamicFormItemComponent} from './components/dynamic-form-item/dynamic-form-item.component';
import {RootFolderComponent} from "./root-folder.component";
import {GetFormArrayPipe} from './pipes/get-form-array.pipe';
import {ItemControlsComponent} from './components/item-controls/item-controls.component';
import {FocusDirective} from "../../directives/focus.directive";
import {FolderControlsComponent} from "./components/folder-controls/folder-controls.component";
import {FormService} from "../../services/form.service";

@NgModule({
  declarations: [
    RootFolderComponent,
    FolderComponent,
    FileComponent,
    DynamicFormItemComponent,
    GetFormArrayPipe,
    FolderControlsComponent,
    ItemControlsComponent,
    FocusDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    RootFolderComponent
  ],
  providers: [
    FormService
  ]
})
export class RootFolderModule {
}
