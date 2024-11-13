
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store/store";
import {  getCountries } from "./thunk";
import {  CountryT } from "@/typing/countries";

export interface CountriesStateT {
  countriesList: CountryT[];
  getCountriesLoading: boolean;
  error: string | null;

}

const initialState: CountriesStateT = {
  countriesList: [],
  getCountriesLoading: false,
  error: null,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.getCountriesLoading = true;
    });
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countriesList = action.payload;
      state.getCountriesLoading = false;
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.error = action.error.message || "Failed to load countries";
      state.getCountriesLoading = false;
    });
  },
  reducers:{

  },
});

export const countriesSelector = (state: RootState) => state.countries;
export const countriesActions = countriesSlice.actions;

export default countriesSlice.reducer;