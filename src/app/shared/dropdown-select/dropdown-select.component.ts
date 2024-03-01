import {AfterViewInit, Component, OnInit} from '@angular/core';
import { arrowDown } from '../../../assets/icons/arrow-down';
import { arrowUp } from '../../../assets/icons/arrow-up';
import { FormControl } from '@angular/forms';
import { pairwise, startWith } from 'rxjs/operators';
import { IOptions } from '../interfaces/options';
import { optionChecked } from '../../../assets/icons/option-checked';

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss']
})
export class DropdownSelectComponent implements OnInit, AfterViewInit {
  public selectedControl = new FormControl('option1');

  public optionSuggestions : IOptions[] = [
    {value: 'option1', viewValue: 'Option1', disable : true, checked : true},
    {value: 'option2', viewValue: 'Option2', disable: true, checked : false},
    {value: 'option3', viewValue: 'Option3', disable: true, checked : false},
  ];
  public arrowDown = arrowDown;
  public arrowUp = arrowUp;
  public optionChecked = optionChecked;
  public isPanelOpen?: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.selectedControl.valueChanges
      .pipe(startWith(null), pairwise())
      .subscribe(([prev, next]: [string, string]) => {
        if ((prev !== null && next !== null) && next === 'confirm') {
          this.selectedControl.setValue(prev);
          this.optionSuggestions.forEach((option : IOptions) => {
            if (option.value === next) {
              option.checked = true
            }
          });
          this.deleteReset();
        }
      } );
  }

  ngAfterViewInit(): void {
    this.optionSuggestions.push({value: 'confirm', viewValue: 'Confirm', disable: false, checked: false});
    this.deleteReset();
  }

  public onOptionClick({value, viewValue, disable, checked}: IOptions): void {
    this.deleteReset();
    this.selectedControl.setValue(value);
    this.optionSuggestions.forEach((option : IOptions) => {
      if (option.value === value) {
        option.checked = !checked;
      }
    });
    if (value !== 'confirm') {
      this.clearAllChecked(value);
      this.addResetButton();
    }

    if (value === 'reset') {
      this.onResetClick();
    }
  }

  public onSelectPanelOpen() : void {
    this.isPanelOpen = !this.isPanelOpen;
  }

  onSelectPanelClose(): void {
    this.isPanelOpen = !this.isPanelOpen;
  }

  public isResetButtonPresent() : boolean {
    return !(this.optionSuggestions.some(({ value }) => value === 'reset'));
  }

  public addResetButton() : void {
    this.optionSuggestions.push({value: 'reset', viewValue: 'Reset', disable: true, checked: false});
  }


  public clearAllChecked(pickedOption : string) : void {
    this.optionSuggestions.forEach((option : IOptions) => {
      if(option.value !== pickedOption) {
        option.checked = false;
      }
    });
  }

  public onResetClick() : void {
    this.deleteReset();
    this.selectedControl.setValue('option1');
  }

  public deleteReset() : void {
    this.optionSuggestions = this.optionSuggestions.filter(({value, viewValue, disable } : IOptions) => value !== 'reset');
  }

}
