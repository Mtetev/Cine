import React, { Component } from 'react';

import MovieList from "../MovieList/MovieList";
import Heading from"../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import Footer from "../../components/Footer/Footer";

class FrontPage extends Component {
  render() {
    return (
      <div>
        <Heading />
        <Search />
        <MovieList />
        <Footer />
      </div>
    );
  }
}

export default FrontPage;
