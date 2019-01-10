import { Pipe, PipeTransform } from '@angular/core';

// se establece el esta pure para que este
// revise segun el ciclo de cambios  si hay valores invalidos o nulos y los elimine del arreglo
@Pipe({
  name: 'keys',
  pure: false
})
export class KeysPipe implements PipeTransform {

  transform(value: any): any {
    const keys = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
      return keys;
  }

}
