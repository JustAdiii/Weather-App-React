import React from "react";

// Props include city name, favorite status, and a function to update favorites
function FavoriteButton({ city, isFavorite, toggleFavorite }) {
  return (
    <button onClick={() => toggleFavorite(city)} className="p-2">
      {isFavorite ? (
        <svg
          className="h-6 w-6 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 2.172a4.2 4.2 0 0117.656 0 4.2 4.2 0 010 17.656 4.2 4.2 0 01-17.656 0 4.2 4.2 0 010-17.656zm2.12 2.12a1.2 1.2 0 000 1.697L10 12.5l4.708-4.708a1.2 1.2 0 10-1.697-1.697L10 9.106l-3.121-3.12a1.2 1.2 0 00-1.697 0z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="h-6 w-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636 10.682 6.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
}

export default FavoriteButton;
