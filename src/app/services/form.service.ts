import {Injectable} from '@angular/core';
import {FormItemBase} from "../directives/form-item-base";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {ItemType} from "../enums/item-type";
import {BehaviorSubject} from "rxjs";
import {CustomFile} from "../intefaces/custom-file";

@Injectable({
  providedIn: 'root',
})
export class FormService {
  formStatus$ = new BehaviorSubject<boolean>(false);
  displayFile$ = new BehaviorSubject<string>('');

  toFormArray(structure: FormItemBase[]) {
    const array: any = [];

    structure.forEach(element => {
      array.push(
        new FormGroup({
          checked: new FormControl(element.checked),
          name: new FormControl({
            value: element.name || '',
            disabled: true
          }),
          controlType: new FormControl(element.controlType || ''),
          data: element.controlType === ItemType.FolderItem ?
            this.toFormArray(element.data as FormItemBase[]) :
            new FormControl(element.data as CustomFile)
        })
      )
    });
    return new FormArray(array);
  }
}
