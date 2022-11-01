import { Injectable } from '@angular/core';
import { PriorityQueue } from '@datastructures-js/priority-queue';
import { Festival } from './data';

interface PQUEUE {
  toArray: () => string[];
  enqueue: (arg0: string) => void;
}

const mapResult = (pQueue: PQUEUE) => {
  let mappedResult: any = {};
  pQueue.toArray().map((record) => {
    const [label, bandName, festivalName] = record.split(';');
    const rLable = label.toUpperCase();
    if (!mappedResult[rLable]) mappedResult[rLable] = {};
    if (!mappedResult[rLable][bandName]) mappedResult[rLable][bandName] = [];
    if (festivalName) mappedResult[rLable][bandName].push(festivalName);
  });
  return mappedResult;
};

const buildPQ = (
  apiData: Festival[],
  pQueue: PQUEUE,
  missingPropertyData: string[]
) => {
  apiData.map((festivalData: Festival) => {
    let festivalName = festivalData?.name;
    festivalData.bands.map((band) => {
      let bandName = band?.name;
      if (band?.recordLabel) {
        pQueue.enqueue(`${band.recordLabel};${bandName};${festivalName}`);
      } else {
        missingPropertyData.push(
          `${band.recordLabel};${bandName || 'NA'};${festivalName || 'NA'}`
        );
      }
    });
  });
  return { pQueue, missingPropertyData };
};

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

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  constructor() {}
  formatData(apiData: Festival[]) {
    const { pQueue, missingPropertyData } = buildPQ(
      apiData,
      new PriorityQueue(comparerLogic),
      []
    );

    let mappedResult = mapResult(pQueue);

    return mappedResult;
  }
}
