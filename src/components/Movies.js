import React, {Component} from 'react';
import reactBootstrap from 'react-bootstrap';
import PopularMoviesList  from './PopularMoviesList';
import MovieSearch  from './Search';


export default class Movies extends Component {
    state = {
        movies: {},
        searchTerm: ""
    }


    handleMovies = (error, movies) => {
        this.setState({
            movies: movies
        })
    }

    onSearchTermChange = (searchTerm) =>{
        this.setState({
            searchTerm: searchTerm
        })
    }

    render = () =>{
        return (
            <div className="container">
					<h1 className="text-success">HackYou Challenge App By Michael Cai </h1>
					
					<PopularMoviesList searchTerm={this.state.searchTerm} onMovies={this.handleMovies} />
				</div>
        )
    }
}