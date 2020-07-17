import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'angularAsync'
})
export class AngularAsyncPipe implements PipeTransform {

  transform(obj : Object) {
    let res = [];
    return (Object.values(obj).forEach(e => res.push(e.message)));
  }

}
