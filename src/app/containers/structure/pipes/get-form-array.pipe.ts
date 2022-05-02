import { Pipe, PipeTransform } from '@angular/core';
import {AbstractControl, FormArray} from "@angular/forms";

@Pipe({
  name: 'getFormArray'
})
export class GetFormArrayPipe implements PipeTransform {
  transform(form: AbstractControl | null, name: string): FormArray {
    return form?.get(name) as FormArray;
  }
}
