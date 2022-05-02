import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ItemType} from "../../../../enums/item-type";
import {debounce, interval, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-item-controls',
  templateUrl: './item-controls.component.html',
  styleUrls: ['./item-controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemControlsComponent implements OnInit, OnDestroy {
  @Input() form!: any;
  @Output() save = new EventEmitter();
  @Output() openFile = new EventEmitter();
  unsubscribe = new Subject<any>();
  folderItem: ItemType = ItemType.FolderItem;
  fileItem: ItemType = ItemType.FileItem;
  edit: boolean = false;

  ngOnInit() {
    this.form?.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      debounce(_ => interval(400))
    ).subscribe((_: any) => {
      this.save.emit()
    })
  }

  ngOnDestroy() {
    this.unsubscribe.next(null)
  }
}
