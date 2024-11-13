
export type CountryT = {
  name: string;
  coordinates: [number, number];
  distance: number;
  population: number;
  flag: string;
  region: string;
};

export type CurrentPositionT = {
  lat: number,
  lon: number,
};


export type GetCountriesParamsT = {
  countryName: string;
};