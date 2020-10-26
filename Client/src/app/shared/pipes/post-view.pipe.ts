import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'postView'
})
export class PostViewPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value < 1000){
      return value.toString();
    }
    else if (value > 1000 && value < 1000000)
    {
      return Math.floor((value / 1000)) + 'k';
    }
    else if (value > 1000000 && value < 10000000)
    {
      return Math.floor((value / 1000000)) + 'm';
    }
    return '0';
  }

}
