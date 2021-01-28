import { isArray, isObject } from 'util';
import { FormControl } from '@angular/forms';
//import { Language } from '../components/dashboard/interfaces/language.module';

export function textFilter(object: any, textValue: string): boolean {
  if (!textValue)
    return true;

  return object.indexOf(textValue) != -1;
}

export function statusFilter(active: boolean, status: boolean): boolean {
  if (status == null)
    return true;
  if (active == status)
    return true;

  return false;
}

export function multiFilter(object: any, arrayValue: any): boolean {
  if (!arrayValue)
    return true;

  for (const value of arrayValue) {
    if (value == object)
      return true;
  }
  return false;
}

export function updateArrayRecord(Array: any, newItem): any {
  return Array.map((item) => {
    if (item['id'] == newItem['id']) {
      return newItem;
    }
    return item;
  });
}

export function getLocalizationArray(languages/*: Language[]*/, fildNames: any, form: any, basePropertyName: string): any {
  let localization: any[] = [];
  for (const language of languages) {
    let translationGroup = {};
    for (let fildName of fildNames) {
      let inputText = form.get('language_' + language.id).value[fildName];

      if (isArray(inputText))
        inputText = inputText[0];

      if (isObject(inputText)) {
        if (inputText.hasOwnProperty('changingThisBreaksApplicationSecurity')) {
          inputText = inputText['changingThisBreaksApplicationSecurity'];
        }
      }

      translationGroup[fildName] = inputText;
    }
    translationGroup['languageId'] = language.id;

    if (translationGroup[basePropertyName]) {
      localization.push(translationGroup);
    }
  }
  return localization;
}

export function validationTrigger(control: FormControl): { [s: string]: boolean } {
  if (control.parent) {
    control.parent.controls['title'].updateValueAndValidity();
  }
  return null;
}

export function titleValidation(control: FormControl): { [s: string]: boolean } {
  if (control.parent) {
    let note = null;
    let description = null;
    if (control.parent.controls['note'])
      note = control.parent.controls['note'].value;
    if (control.parent.controls['description'])
      description = control.parent.controls['description'].value;
    const isNotEmpty = note || description;

    if (isNotEmpty && !control.value) {
      return { 'titleIsEmpty': true };
    }
  }
  return null;
}