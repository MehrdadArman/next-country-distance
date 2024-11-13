'use client';

import * as React from 'react';
import '@/lib/env';
import CountryAutoComplete from './components/CountryAutoComplete';


export default function HomePage() {
  return (
    <main>
      <section className='bg-[url("/images/country-bg.svg")]  bg-no-repeat  bg-cover'>
        <div className='backdrop-blur-sm bg-black/5'>
          <div className='layout relative flex min-h-screen  items-center justify-center py-12 text-center'>
            <div className='mt-6 w-full grid grid-cols-12 md:grid-cols-12'>
              <div className='col-span-12 xs:col-span-12 sm:col-span-12 md:col-span-7'>
                <div className="mb-10">
                  <h1 className='text-4xl font-extrabold text-black sm:text-5xl md:text-6xl text-left'>
                    <span className='block'>Find closest  distance to your country</span>
                  </h1>
                  <p className='mt-2 text-lg text-black-200 max-w-2xl mx-auto text-left'>
                    Get the distance between two countries in miles
                  </p>
                </div> 
                <CountryAutoComplete/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
