import { Component, OnInit } from '@angular/core';
import { FestivalService } from './services/festival.service';
import { FormatService } from './services/format.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'energy-au';
  mappedFestivals: any;
  constructor(
    private festivalService: FestivalService,
    private formatService: FormatService
  ) {}

  ngOnInit() {
    this.festivalService.getFestival().subscribe((response: any) => {
      const formattedData = this.formatService.formatData(response);
      this.mappedFestivals = formattedData;
    });
  }
}
