import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
})
export class FolderComponent {
  @Input() form!: any;
  @Output() save = new EventEmitter();
  identity = (index: number, item: any) => item;
}
