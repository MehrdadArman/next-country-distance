import * as urls from "@/constant/urlConfig";

import axiosApiInstance from "./axiosInterceptor";
import { GetCountriesParamsT } from "@/typing/countries";


export const getCountriesAsync = async (params:GetCountriesParamsT) => {
  const {countryName} =params
  return await axiosApiInstance.get(urls.getCountriesUrl,{
    params:{
      countryName,
    }
  });
};