'use client';

import Autocomplete from "@/components/autocomplete/AutoComplete";
import { useFetchCountries } from "@/hooks/useFetchCountries";
import { CountryT } from "@/typing/countries";
import { useCallback, useState } from "react";
import CountryCard from "./CountryCard";


const CountryAutoComplete = () => {
  const  { countriesList, getCountriesLoading,fetchCountries} =useFetchCountries();
  const  [selectedCountry, setSelectedCountry] = useState<CountryT | null>(null);
  

  const handleFetchSuggestions = useCallback(
    (value: string) => {
      if(value) {
        fetchCountries({ countryName: value });
      }
    },
    [fetchCountries]
  );

  const renderCountryItem = (item: CountryT) => (
    <div className="flex flex-row justify-between py-2">
      <span className=" block text-left">{item.name}</span>
      <span className=" block text-right">{Math.floor(item.distance)} Miles</span>
    </div>
  );

  const handleSelectCountry = (country: CountryT) => {    
    setSelectedCountry(country);
  }


  return (
    <div className=" flex flex-col justify-center">  
        <Autocomplete 
          fetchSuggestions={handleFetchSuggestions} 
          loading={getCountriesLoading}  
          suggestions={countriesList} 
          renderSuggestion={renderCountryItem}
          onSelect={handleSelectCountry}
          placeholder="Type a country name..."
          debounceTime={500}
        />
      
       {selectedCountry && (
        <div className="mt-10">
          <CountryCard country={selectedCountry} />
        </div>
      )}
    </div>
  )
}

export default CountryAutoComplete