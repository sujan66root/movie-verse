import axios from "axios";
import { BASE_URL } from "./config";

const API_KEY = process.env.REACT_APP_API_KEY;

// Getting popular movies with pagination support
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

// Getting details of a specific movie by ID
export const getMovieDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
