import React from "react";
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMoviesDetail } from '../api/index';
import Loader from "../Loaders/Loader";
import { IMAGE_URL } from "../api/config";
import ErrorLoader from '../Loaders/ErrorLoader';

const MovieDetail = () => {
    const { id } = useParams();

    const { data, error, isLoading } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMoviesDetail(id),
    });

    if (isLoading) return <Loader />;
    if (error) return <ErrorLoader message="Unable to load movies. Please try again later." />;

    return (
        <div className="movie bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
            <div className="w-full md:w-4/5">
                <img className="w-full h-96 md:h-128 object-cover object-center rounded-lg shadow-md" src={`${IMAGE_URL}${data ? data.backdrop_path : ""}`} alt="Backdrop" />
            </div>
            <div className="w-full md:w-4/5 mt-6 md:mt-8 flex flex-col md:flex-row items-center">
                <div className="mr-0 md:mr-6 mb-6 md:mb-0">
                    <img className="w-64 md:w-96 rounded-lg shadow-md" src={`${IMAGE_URL}${data ? data.poster_path : ""}`} alt="Poster" />
                </div>
                <div className="text-white flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-4 font-serif">{data ? data.original_title : ""}</h1>
                    <p className="text-lg text-gray-300 mb-4">{data ? data.tagline : ""}</p>
                    <div className="text-lg text-yellow-300 mb-4 flex items-center">
                        {data ? data.vote_average : ""}
                        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <span className="ml-4">{data ? "(" + data.vote_count + ") votes" : ""}</span>
                    </div>
                    <div className="text-lg text-gray-300 mb-4">Runtime: {data ? data.runtime + " mins" : ""}</div>
                    <div className="text-lg text-gray-300 mb-4">Release date: {data ? data.release_date : ""}</div>
                    <div className="text-lg text-gray-300 mb-4 flex flex-wrap">
                        {data && data.genres ? data.genres.map(genre => <span key={genre.id} className="border border-white rounded-full px-3 py-1 mr-2 mb-2">{genre.name}</span>) : ""}
                    </div>
                    <div className="text-lg text-gray-300 font-mono">
                        {data ? data.overview : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;
