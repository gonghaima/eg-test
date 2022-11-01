import { Injectable } from '@angular/core';
import { Festival } from './data';

const comparerLogic = (a: string, b: string) => {
  const [recordLabel1, brand1, festival1] = a.split(';');
  const [recordLabel2, brand2, festival2] = b.split(';');

  if (recordLabel1.toLowerCase() !== recordLabel2.toLowerCase())
    return recordLabel1.toLowerCase() < recordLabel2.toLowerCase() ? -1 : 1;

  if (brand1.toLowerCase() !== brand2.toLowerCase())
    return brand1.toLowerCase() < brand2.toLowerCase() ? -1 : 1;

  if (festival1.toLowerCase() !== festival2.toLowerCase())
    return festival1.toLowerCase() < festival2.toLowerCase() ? -1 : 1;
  return 0;
};

const buildData = (apiData: Festival[]) => {
  const recordLabels: string[] = [];
  const missingPropertyData: string[] = [];
  apiData.map((fes) => {
    let festivalName = fes?.name || '';
    fes.bands.map((band) => {
      let bandName = band?.name || '';
      if (band?.recordLabel) {
        recordLabels.push(`${band.recordLabel};${bandName};${festivalName}`);
      } else {
        missingPropertyData.push(
          `${band.recordLabel};${bandName || 'NA'};${festivalName || 'NA'}`
        );
      }
    });
  });
  return { recordLabels, missingPropertyData };
};

const mapResult = (recordLabels: string[]) => {
  let mappedResult: any = {};
  recordLabels.map((record) => {
    const [label, bandName, festivalName] = record.split(';');
    const rLable = label.toUpperCase();
    if (!mappedResult[rLable]) mappedResult[rLable] = [];
    if (!mappedResult[rLable][bandName]) mappedResult[rLable][bandName] = [];
    if (festivalName) mappedResult[rLable][bandName].push(festivalName);
  });
  return mappedResult;
};

@Injectable({
  providedIn: 'root',
})
export class FormatV1Service {
  constructor() {}
  formatData(apiData: Festival[]) {
    let { recordLabels, missingPropertyData } = buildData(apiData);

    let mappedResult = mapResult(recordLabels.sort(comparerLogic));

    return mappedResult;
  }
}
