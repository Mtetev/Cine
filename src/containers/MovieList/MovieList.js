import React, { Component } from "react";
import moment from "moment";

import MovieCard from "../../components/MovieCard/MovieCard";

import LoadingImage from "../../images/Loading.gif";

import "./MovieList.css";

class MovieList extends Component {

	constructor(props) {
		super(props);
		this.state = { movies: [] };
	}

	async fetchMovies() {
		const API_KEY = "e1694d150434683ad1f54837f371e876";

		const dateFormat = "YYYY-MM-DD";
		const dateTo = moment().format(dateFormat);
		const dateFrom = moment().subtract(4, "month").format(dateFormat);

		let moviesResponse = [];
		let fetchURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY + 
		"&language=en-UK&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=" + dateFrom + 
		"&release_date.lte=" + dateTo;

		try {
			let response = await fetch(fetchURL);
			moviesResponse = await response.json();
			if (moviesResponse !== null) {
				this.setState({
					movies: moviesResponse.results
				});
			} else {
				this.setState({ movies: [] });
			}
		} catch(error) {
			console.error(error);
		}
	}

	moviesToJSX = (movies) => {
		return movies.map((movie, i) => (
			<MovieCard
				key = {i}
				source = { "https://image.tmdb.org/t/p/w400/" + movie.poster_path}
				movieName = { movie.title }
				releaseDate = { movie.release_date }
				id = { movie.id }
			/>
			)
		);
	}

	componentDidMount() {
		this.fetchMovies();
	}

	render() {
		let movies = this.state.movies;

		const moviesArray = this.moviesToJSX(movies);

		return moviesArray.length > 0 ? 
		(
			<div className="MovieContainer">
				{ moviesArray }
			</div>
		) : (
			<div className="LoadingList">
				<img src={LoadingImage} alt="Loading"/>
				<div>Loading....</div>
			</div>
		);
	}
}

export default MovieList;