import { CountryT } from "@/typing/countries"
import Image from "next/image";

type CountryCardProps = {
  country: CountryT;
}

const CountryCard = ({country}:CountryCardProps) => {
  const { name, population, region, flag, distance } = country;
  return (
    <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Image and overlay */}
      <div className="relative">
         <Image
          className="w-full h-48 object-cover"
          src={flag}
          alt={name}
          width={100}
          height={100}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="text-white text-2xl font-bold tracking-wide px-4 py-2 bg-white bg-opacity-20 rounded-lg">
            {name}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-6">
        <div className="flex justify-between text-center">
          <div>
            <h3 className="text-gray-400 text-sm">Region</h3>
            <p className="text-lg font-semibold">{region}</p>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm">Distance</h3>
            <p className="text-lg font-semibold">{Math.floor(distance)} Miles</p>
          </div>
          <div>
            <h3 className="text-gray-400 text-sm">Population</h3>
            <p className="text-lg font-semibold">{population.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryCard