# Movie List App

## Description
A React project that fetches a list of popular movies from the TMDB API and displays them in a scrollable view. Each movie card shows the movie title, release year, and a brief description. The app includes search functionality to filter movies by title and displays detailed information after selecting the movie.

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/sujan66root/movie-verse.git
    cd movie-verse
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add your TMDB API key
    ```env
    REACT_APP_API_KEY=your_tmdb_api_key
    ```

5. Start the development server
    ```bash
    npm start
    ```

6. Open `http://localhost:3000` in your browser to view the app

## Usage
- Use the search bar to filter movies by title
- Click on a movie card to view more details about the movie

## Technologies Used
- React
- Tailwind CSS
- Axios
- @tanstack/react-query

## License
This project is licensed under the MIT License - see the LICENSE file for details.
