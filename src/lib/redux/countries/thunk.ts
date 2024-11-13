
import { createAsyncThunk } from "@reduxjs/toolkit";

import * as countriesServices from "@/lib/services/countriesServices";

import { AxiosResponse } from "axios";

// **types
import { CountryT, GetCountriesParamsT } from "@/typing/countries";

export const getCountries = createAsyncThunk<CountryT[],GetCountriesParamsT>("countries/getCountries", async (params) => {
  const { data }: AxiosResponse = await countriesServices.getCountriesAsync(params);

  return data;
});



