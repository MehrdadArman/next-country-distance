import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCountries } from "@/lib/redux/countries/thunk";


export const useFetchCountries = () => {
  // ** dispatch
  const dispatch = useAppDispatch();

  // ** Selectors
  const countriesList = useAppSelector((state) => state.countries.countriesList);
  const getCountriesLoading = useAppSelector(
    (state) => state.countries.getCountriesLoading
  );

  const fetchCountries = async ({
    countryName
  }:{
    countryName: string;
  }) => {
    dispatch(getCountries({
      countryName
    }));
  };
  return {
    countriesList,
    getCountriesLoading,
    fetchCountries
  };
};