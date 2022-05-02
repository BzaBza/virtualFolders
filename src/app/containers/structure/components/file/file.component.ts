import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {
  @Input() form!: any;
  data!: any;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.data = this.form.get('data').value
  }

  transform(file: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(file);
  }
}
