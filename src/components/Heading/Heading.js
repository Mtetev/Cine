import React from "react";
import { Link } from "react-router-dom";

import LogoImage from "../../images/logo.png";

import "./Heading.css";

const Heading = () => {
	return (
		<header className="heading">>
			<div className="logo">
				<Link className="logo__link" to="/">
					<img className="logo__image" src={ LogoImage } alt="logo"></img>
					<h1 className="logo__title"> Cine </h1>
				</Link>
			</div>
			<a href="https://www.themoviedb.org/" className="logo__api">
					<h3 className="api">Powered by <p className="tmdb">TMDB</p></h3>
				</a>
		</header>
	)
}

export default Heading;
