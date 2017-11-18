import { Pipe, PipeTransform } from '@angular/core';

import { Twimp } from './twimp/twimp.model';

@Pipe({
  name: 'sortBy',
  pure: false
})
export class SortByPipe implements PipeTransform {

  transform(array: Array<Twimp>): any {
    if (array) {
      // .replace(/\//g, '-')
      var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;

      return array.sort((a: Twimp, b: Twimp) => {
        var dt1 = new Date(a.timestamp.replace(/-/g, '/').replace(pattern, '$3-$2-$1'));
        var dt2 = new Date(b.timestamp.replace(/-/g, '/').replace(pattern, '$3-$2-$1'));
        return +dt2 - +dt1;
      });
      //return array.sort((a: Twimp, b: Twimp) => +a.timestamp.replace(/-/g, '') - +b.timestamp.replace(/-/g, ''));
    }
    else {
      return array;
    }
  }

}
