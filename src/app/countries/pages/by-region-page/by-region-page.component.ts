import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { FormControl, FormGroup } from '@angular/forms';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``,
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regiones: Region[] = [
    'africa',
    'americas',
    'asia',
    'europe',
    'oceania',
  ];
  public isLoading: boolean = false;
  public regionSelected?: Region;

  constructor(private countriesService: CountryService) {}

  // searchByRegion(term: Region): void {
  //   this.isLoading = true;
  //   this.regionSelected = term;
  //   this.countriesService.searchRegion(term).subscribe((countries) => {
  //     this.countries = countries;
  //     this.isLoading = false;
  //   });
  // }

  setActiveRegion(region: Region): void {
    this.regionSelected = region;
    this.isLoading = true;
    this.countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
  form = new FormGroup({
    region: new FormControl(this.regiones[0]),
  });

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStorage.byRegion.countries;
    this.regionSelected = this.countriesService.cacheStorage.byRegion.region;
  }
}
