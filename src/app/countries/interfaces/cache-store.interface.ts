import { Country } from './country';
import { Region } from './region.type';

export interface CacheStore {
  byCapital: TermCountry;
  byCountry: TermCountry;
  byRegion: RegionInterface;
}

export interface TermCountry {
  term: string;
  countries: Country[];
}

export interface RegionInterface {
  region: Region;
  countries: Country[];
}
