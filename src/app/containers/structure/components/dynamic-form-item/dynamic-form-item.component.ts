import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemType} from "../../../../enums/item-type";
import {FormService} from "../../../../services/form.service";

@Component({
  selector: 'app-dynamic-form-item',
  templateUrl: './dynamic-form-item.component.html',
  styleUrls: ['./dynamic-form-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormItemComponent implements OnInit {
  @Input() form!: any;
  @Output() save = new EventEmitter();
  folderItem: ItemType = ItemType.FolderItem;
  fileItem: ItemType = ItemType.FileItem;
  fileId!: string;

  constructor(public formService: FormService) {
  }

  ngOnInit() {
    if (this.form.get('controlType').value === this.fileItem) {
      this.fileId = this.form.get('data')?.value.id;
    }
  }

  setFormChange() {
    this.formService.formStatus$.next(true);
  }

  displayFilePreview() {
    if (this.fileId) {
      if (this.formService.displayFile$.getValue() === this.fileId) {
        this.formService.displayFile$.next('');
      } else {
        this.formService.displayFile$.next(this.fileId);
      }
    }
  }
}
