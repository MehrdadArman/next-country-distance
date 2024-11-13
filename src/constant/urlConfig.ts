import { isProd } from "./env";


// **  base url of our api
export const baseUrl: string =
  isProd ? "https://api.com" : "http://localhost:3000/api";


// ***  get current postion ***  // 
export const getCurrentPositionUrl = `http://ip-api.com/json`;
  
// **  Countries
export const getCountriesUrl = `${baseUrl}/countries`;