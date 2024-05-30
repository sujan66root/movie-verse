import React, { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPopularMovies } from '../api/index';
import MovieCard from './MovieCard';
import { useInView } from 'react-intersection-observer';
import Loader from '../Loaders/Loader';
import ErrorLoader from '../Loaders/ErrorLoader';

const MovieList = () => {
    const [search, setSearch] = useState('');

    const {
        data,
        error,
        isLoading,
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['movies'],
        queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    });

    const { ref, inView } = useInView({
        threshold: 1,
        triggerOnce: false,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetching, fetchNextPage]);

    if (isLoading && !data) return <Loader />;

    if (error) {
        let errorMessage = "Unable to load movies. Please try again later.";
        if (error.message === "Invalid API key") {
            errorMessage = "Invalid API key. Please check your API key and try again.";
        }
        return <ErrorLoader message={errorMessage} />;
    }
    const filteredMovies = data.pages
        .flatMap(page => page.results)
        .filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="bg-gray-900 py-8">
            <div className="container mx-auto">
                <h1 className="text-white text-4xl font-bold text-center mb-2 font-serif">MOVIE VERSE</h1>
                <p className="text-lg text-center text-gray-100 mb-6 font-mono">Discover and watch popular movies</p>
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="p-2 border border-gray-300 rounded-lg bg-white w-full md:w-1/2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredMovies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
                <div ref={ref} className="h-1"></div>
                <div className="flex justify-center mt-8">
                    {isFetching ? (
                        <div className='text-white'>Loading more movies...</div>
                    ) : (
                        hasNextPage && (
                            <button
                                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                                onClick={() => fetchNextPage()}
                                disabled={isFetching || !hasNextPage}
                            >
                                Load More
                            </button>

                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieList;
