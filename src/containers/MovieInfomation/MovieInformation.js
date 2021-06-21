import React, { Component } from "react";

import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import Footer from "../../components/Footer/Footer";


import "./MovieInformation.css";

const Cast = (props) => {
	return ( 
		<div className="actors">
			{ props.cast.slice(0, 4).map(member => 
				<a className="actors__link" href={ "https://www.themoviedb.org/person/" + member.id } key={ member.profile_path }>
					<div className="actors__mask">
						<img className="actors__image" src={ "https://image.tmdb.org/t/p/w400/" + member.profile_path } alt={ member.name }></img>
					</div>
				</a>
			) }
		</div>
	);
}

class MovieInformation extends Component {

	constructor(props) {
		super(props);
		this.state = {
			movie: {
				genres: [],
				spoken_languages: [],
				credits: {
					cast: []
				},
			}
		}
		this.pathname = this.props.location.pathname;
	}

	fetchMovieInformation = async (id) => {
		const API_KEY = "e1694d150434683ad1f54837f371e876";

		try {
			let response = await fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + API_KEY + 
				"&language=en-UK&page=1&append_to_response=credits");
			let movieInfo = await response.json();
			return movieInfo;
		} catch (error) {	
			console.error(error);
		}
	}

	updateState = async () => {
		let id = this.pathname.substring(1);
		this.setState({ movie: await this.fetchMovieInformation(id) });
	}

	formatInformation(a) {
		return a.reduce((acc, current, index) => {
			acc += current.name;
			if (index !== a.length - 1) acc += ", ";
			return acc;
		}, "");
	}

	componentDidMount() {
		this.updateState();
	}

	componentDidUpdate() {
		if (this.pathname !== this.props.location.pathname) {
			this.pathname = this.props.location.pathname;
			this.updateState();
		}
	}

	render() {
		let genres = this.formatInformation(this.state.movie.genres),
			languages = this.formatInformation(this.state.movie.spoken_languages);
		return (
			<div>
				<Heading />
				<Search />
				<main>
					<div className="information">
						<img src={ "https://image.tmdb.org/t/p/w500/" + this.state.movie.poster_path } alt={ "Poster for " + this.state.movie.title } 
							className="information__image"></img>
						<div className="information__summary">
							<p className="information__title">{ this.state.movie.title }</p>
							<ul>
								<li>Release Date: { this.state.movie.release_date }</li>
								<li>Rating: { this.state.movie.vote_average }</li>
								<li>Genre(s): { genres } </li>
								<li>Spoken Language(s): { languages }</li>
							</ul>
							<p className="information__overview">{ this.state.movie.overview }</p>	
						</div>
					</div>
				</main>
				<Cast cast={ this.state.movie.credits.cast }/>
				<Footer />
			</div>
		);
	}
}

export default MovieInformation;