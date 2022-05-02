import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemType} from "../../../../enums/item-type";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {CustomFile} from "../../../../intefaces/custom-file";

@Component({
  selector: 'app-folder-controls',
  templateUrl: './folder-controls.component.html',
  styleUrls: ['./folder-controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FolderControlsComponent{
  @Input() formArray!: FormArray;
  @Output() save = new EventEmitter();
  folderItem = ItemType.FolderItem;
  fileData!: CustomFile;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      let customFile: CustomFile;
      reader.onloadend = (ev) => {
        const uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
        const result = reader.result?.toString() || '';
        customFile = {
          file: result,
          name: file.name,
          type: file.type.split('/')[1],
          id: uid
        }
        this.fileData = customFile;
        this.addElement(ItemType.FileItem)
      }
      reader.readAsDataURL(file);
    }
  }

  addElement(elementType: ItemType): void {
    const element: FormGroup = this.createElement(elementType);
    this.formArray.push(element);
  }

  private createElement(elementType: ItemType): FormGroup {
    return new FormGroup({
      name: elementType === ItemType.FolderItem ?
        new FormControl('') :
        new FormControl(this.fileData.name),
      data: elementType === ItemType.FolderItem ?
        new FormArray([]) :
        new FormControl(this.fileData),
      controlType: new FormControl(elementType),
      checked: new FormControl(false)
    });
  }
}
