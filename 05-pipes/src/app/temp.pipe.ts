import { input, output, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temp',
})
export class TemperaturePipe implements PipeTransform {
  transform(
    value: number | string,
    inputType: 'fah' | 'cel',
    outputType?: 'fah' | 'cel'
  ) {
    let val: number;

    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }

    let outputTemp;
    if (inputType === 'cel' && outputType === 'fah') {
      outputTemp = val * (9 / 5) + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemp = (val - 32) * (5 / 9);
    } else {
      outputTemp = val;
    }

    let symbol: '°F' | '°C';
    if (!outputType) {
      symbol = inputType === 'cel' ? '°C' : '°F';
    } else {
      symbol = outputType === 'cel' ? '°C' : '°F';
    }

    return `${outputTemp.toFixed(2)} ${symbol}`;
  }
}
