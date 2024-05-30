// src/components/ErrorLoader.js
import React from 'react';

const ErrorLoader = ({ message }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100">
            <div className="bg-red-600 text-white font-bold rounded-full border shadow-lg p-10 flex flex-col items-center justify-center w-64 h-64 text-center">
                <h1 className="text-2xl mb-4">Error</h1>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default ErrorLoader;
