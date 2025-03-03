import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], text: string): any {
    if (!text) return value;
    return value.filter((item) => item?.title?.toLowerCase().includes(text.toLowerCase()));
  }
  
}
