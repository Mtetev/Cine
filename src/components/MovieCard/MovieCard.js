import React from "react";
import { Link } from "react-router-dom";

import "./MovieCard.css";

const MovieCard = (props) => {
	const { source, movieName, releaseDate, id } = props;

	return (
		<div className="movie">
			<Link to={ "/" + id } className="movie__link" href="#">
				<img className="movie__image" src={ source } alt={ "Poster for " + movieName }/>
				<div className="movie__info">
					<h3>{ movieName }</h3>
					<h3>{ releaseDate }</h3>
				</div>
			</Link>
		</div>
	);
}

export default MovieCard;