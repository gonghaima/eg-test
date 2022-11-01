import { TestBed } from '@angular/core/testing';
import { FormatV1Service } from './format.v1.service';
import { apiData, specialData } from './data';

describe('FormatV1Service', () => {
  let service: FormatV1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatV1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort and format data as expected', () => {
    const result = service.formatData(apiData);
    expect(Object.keys(result)[0]).toEqual('ACR');
    expect(Object.keys(result)[Object.keys(result).length - 1]).toEqual(
      'XS RECORDINGS'
    );
  });

  it('should be able to handle data with different format as expected', () => {
    const result = service.formatData(specialData);
    expect(Object.keys(result)[0]).toEqual('ACR');
    expect(Object.keys(result)[Object.keys(result).length - 1]).toEqual(
      'PACIFIC RECORDS'
    );
    expect(result[Object.keys(result)[0]]['Critter Girls']).toBeUndefined;
  });
});
