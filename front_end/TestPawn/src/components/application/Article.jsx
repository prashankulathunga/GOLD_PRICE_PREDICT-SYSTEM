const Article = ({ amount, description }) => {
    return (
      <article className="flex items-center gap-4 p-6 mt-6 transition-all duration-500 ease-in-out border-l-4 border-gray-500 rounded-lg shadow-xl py-7 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-700 hover:shadow-lg hover:scale-105 drop-shadow-xl">
        <span className="p-3 text-gray-400 bg-gray-600 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-label="Sales Icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
  
        <div>
          <p className="text-3xl font-[900] text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-gray-900 drop-shadow-lg font-sans">{amount} <span className="text-gray-400 ">USD</span></p>
          <p className="text-sm font-extrabold text-transparent uppercase bg-clip-text bg-gradient-to-r from-yellow-400 via-white/40 to-indigo-500">{description}</p>
        </div>
      </article>
    );
  };
  
  export default Article;
  