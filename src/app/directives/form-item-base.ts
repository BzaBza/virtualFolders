import {Directive} from "@angular/core";
import {CustomFile} from "../intefaces/custom-file";

@Directive()
export class FormItemBase {
  name: string;
  controlType: string;
  checked: boolean;
  data?: Array<FormItemBase> | CustomFile;

  constructor(options: {
    name?: string;
    controlType?: string;
    data?: Array<FormItemBase> | CustomFile;
    checked?: boolean;
  } = {}) {
    this.name = options.name || '';
    this.controlType = options.controlType || '';
    this.data = options.data || undefined;
    this.checked = options.checked || false;
  }
}
