import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Search.css";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { movies: [] };

        this.timeOutAPICall = null;
        this.timeOutOnBlur = null;

        this.searchResult = React.createRef();
    }

    fetchMovies = async (input) => {
        const API_KEY = "e1694d150434683ad1f54837f371e876";
       
        try {
            let response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + 
                "&query=" + encodeURIComponent(input) + "&page=1");
            let movies = await response.json();
            return movies.results;
        } catch(error) {
            console.error(error);
            return [];
        }
    }

    updateState = async (input) => {
        if (input === "") {
            this.setState({ movies: [] });
        } else {
            let movies = await this.fetchMovies(input);
            this.setState({ movies: movies.slice(0, 6) });
        }
    }

    hideSearchResult() {
        // Check if searchResult isn't being rerendered currently
        if (this.searchResult.current !== null) {
            this.searchResult.current.classList.add("search-result--hide");
        }
    }

    showSearchResult() {
        // Check if searchResult isn't being rerendered currently
        if (this.searchResult.current !== null) {
            this.searchResult.current.classList.remove("search-result--hide");
        }
    }

    onFocusSearch = () => {
        clearTimeout(this.timeOutOnBlur);
        this.showSearchResult();
    }

    onBlurSearch = () => {
        // Give time for onFocus on child element to trigger and prevent the result
        // disappearing before the onClick is registered
        clearTimeout(this.timeOutOnBlur);
        this.timeOutOnBlur = setTimeout(() => {
            this.hideSearchResult();
        }, 100);
    }

    onSearchResultClick = () => {
        this.hideSearchResult()
    }

    onSearchBarChange = (e) => {
        let input = e.target.value;
         // Limit number of api calls
        clearTimeout(this.timeOutAPICall);
        if (input !== "") {
            this.showSearchResult();
            this.timeOutAPICall = setTimeout(() => {
                this.updateState(input);
            }, 500);
        } else {
            this.hideSearchResult();
            this.updateState(input);
        }
    }

    moviesToJSX = (movies) => {
        return movies.map(movie => 
            <Link 
                key={ movie.id } className="search-result__item" to={ "/" + movie.id } 
                onFocus={ this.onFocusSearch } onBlur={ this.onBlurSearch } onClick={ this.onSearchResultClick }>
                <img 
                    className="search-result__poster" src={ "https://image.tmdb.org/t/p/w500/" + movie.poster_path } 
                    alt={ "Poster for " + movie.title }
                />
                 <p className="search-result__title">{ movie.title }</p>
            </Link>);
    }

    render() {
        let moviesJSX = this.moviesToJSX(this.state.movies);
        return (
            <div className="search" onBlur={ this.onBlurSearch } onFocus={ this.onFocusSearch }>
                <input type="text" placeholder="Search" name="SearchBar"
                    onChange={ this.onSearchBarChange } onFocus={ this.onFocusSearch }/>
                <div className="search-result search-result--hide" ref={ this.searchResult }>
                   { moviesJSX } 
                </div>
            </div>
        )
    }
}

export default Search;