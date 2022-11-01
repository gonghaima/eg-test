import { TestBed } from '@angular/core/testing';
import { FormatService } from './format.service';
import { apiData, specialData } from './data';

describe('FormatService', () => {
  let service: FormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatService);
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
