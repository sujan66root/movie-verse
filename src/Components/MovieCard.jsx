import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_URL } from '../api/config';

const MovieCard = ({ movie }) => {
    const imageUrl = movie ? `${IMAGE_URL}${movie.poster_path}` : '';

    return (
        <Link to={`/movie/${movie.id}`} className="block bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 w-full max-w-xs mx-auto mb-4">
            <div>
                <img src={imageUrl} alt={movie.title} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="p-4 text-justify">
                <h2 className="text-lg font-semibold mb-1">{movie ? movie.title : ""}</h2>
                <p className="text-gray-500 mb-2 font-serif">{new Date(movie ? movie.release_date : "").getFullYear()}</p>
                <p className="text-gray-700 font-mono">{movie ? movie.overview.slice(0, 150) + '...' : movie.overview}</p>
            </div>
        </Link>
    );
};

export default MovieCard;
