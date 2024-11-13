import { NextRequest, NextResponse } from 'next/server';
import { AxiosResponse } from 'axios';
import { distance, point } from '@turf/turf';
import countries from '@/constant/countries.json';
import { getCurrentPosition } from '@/lib/services/thirdPartyServices';
import { CurrentPositionT } from '@/typing/countries';


// ** Get country name from query params
const getCountryNameParam = (req: NextRequest): string | null => {
  return req.nextUrl.searchParams.get('countryName');
};

// ** Fetch current position using third party service
const fetchCurrentPosition = async (): Promise<CurrentPositionT> => {
  const response: AxiosResponse<CurrentPositionT> = await getCurrentPosition();
  if (response.status !== 200 || !response.data) {
    throw new Error('Failed to fetch current position');
  }
  return response.data;
};

// ** Calculate distances between current position and countries
const sortCountries = (
  currentPosition: CurrentPositionT,
  countryName: string
) => {
  const currentPoint = point([currentPosition.lon, currentPosition.lat]);

  return countries
    .filter((country) =>
      country.name.toLowerCase().includes(countryName.toLowerCase())
    )
    .map((country) => {
      // ** Convert country coordinates to point
      const countryPoint = point([country.latlng[1], country.latlng[0]]);

      //** */ Calculate distance between current position and country
      const dist = distance(currentPoint, countryPoint, { units: 'miles' });

      return { ...country, distance: dist };
    })
    .sort((a, b) => a.distance - b.distance);
};

// ** GET /api/countries
export async function GET(req: NextRequest) {
  try {
    const countryName = getCountryNameParam(req);

    if (!countryName) {
      return NextResponse.json(
        { message: 'Country name is required' },
        { status: 400 }
      );
    }

    const currentPosition = await fetchCurrentPosition();
    const sortedCountriesArray = sortCountries(currentPosition, countryName);

    return NextResponse.json(sortedCountriesArray);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
