import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const Card = (props) => {
  const { title, subtitle, desc } = props;

  return (
    <div className="flex flex-col p-4 transition-all duration-500 ease-in-out shadow-lg bg-gradient-to-r from-gray-800 via-gray-600 to-gray-700 duration-600 rounded-xl md:p-5 drop-shadow-2xl hover:shadow-xl hover:scale-105">
      {/* Icon and Title in One Row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 p-2 bg-gray-700 rounded-full">
          <CurrencyDollarIcon className="w-6 h-6 text-yellow-400" />
        </div>
        <h3 className="font-sans text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-gray-400 to-gray-900 drop-shadow-lg">
          {title} <span className="text-gray-400">USD</span>
        </h3>
      </div>
      {/* Subtitle */}
      <p className="mt-1 text-xs font-[900] text-transparent uppercase bg-clip-text bg-gradient-to-r from-yellow-400 via-black/40 to-indigo-800 drop-shadow-lg">
        {subtitle}
      </p>
      {/* Description */}
      <p className="mt-2 text-gray-300 drop-shadow-lg">{desc}</p>
    </div>
  );
};

export default Card;
