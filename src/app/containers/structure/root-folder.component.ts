import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormGroup} from "@angular/forms";
import {FormItemBase} from "../../directives/form-item-base";
import {DataService} from "../../services/data.service";
import {debounce, interval, Observable, Subject, takeUntil} from "rxjs";
import {FormService} from "../../services/form.service";

@Component({
  selector: 'app-root-folder',
  templateUrl: './root-folder.component.html',
  styleUrls: ['./root-folder.component.css'],
  providers: [DataService],
})
export class RootFolderComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  formData$: Observable<any>;
  unsubscribe = new Subject<any>();

  constructor(private dataService: DataService,
              private formService: FormService) {
    this.formData$ = dataService.getDataFromStorage();
  }

  ngOnInit() {
    this.formData$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(data => {
        let formData = data ? this.formService.toFormArray(data as FormItemBase[]) : new FormArray([]);
        this.formGroup = new FormGroup({
          root: formData
        })
      })

    this.formService.formStatus$.pipe(
      takeUntil(this.unsubscribe),
      debounce(_ => interval(400)),
    ).subscribe(isChanged => {
      if(isChanged) {
        this.saveChanges();
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe.next(null)
  }

  removeSelected() {
    const formArray = this.formGroup.get('root') as FormArray;
    this.removeGroup(formArray)
    this.formService.formStatus$.next(true);
  }

  identity = (index: number, item: any) => item;

  saveChanges() {
    const formArray = (this.formGroup.get('root') as FormArray).getRawValue();
    this.dataService.saveDataToStorage(JSON.stringify(formArray));
  }

  private removeGroup(formArray: FormArray) {
    const arrayWithCorrectIndexes = new FormArray([...formArray.controls])
    arrayWithCorrectIndexes.controls.forEach(e => {
      if (e.get('checked')?.value) {
        const index = formArray.controls.findIndex((control) => control.get('checked')?.value)
        formArray.removeAt(index);
      }
      if (e.get('data') instanceof FormArray) {
        this.removeGroup(e.get('data') as FormArray)
      }
    })
  }
}
