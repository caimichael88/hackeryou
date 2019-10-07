import React, {Component} from 'react';
import reactBootstrap, {ListGroup, ListGroupItem} from 'react-bootstrap';
import MovieModal from './MovieModal';
import themoviedb from '../lib/themoviedb/themoviedb';

themoviedb.common.api_key = "5af34cf4268a449db1983113bd387835";

export default class PopularMoviesList extends Component {
	state = {
		movies: [],
		movie: {},
		show: false
	}

	getMovies = () => {
		var self = this

		/*themoviedb.movies.getPopular({},
	 	function (movies) {
	 		movies = JSON.parse(movies)
	 		if (movies.results && movies.results.length > 0) {
	 			self.setState({
	 				movies: movies.results
	 			})

	 			self.props.onMovies(null, movies)
	 		}
		}, 
		function (error) {
			// do something with errorCallback
			console.error(error)
			self.props.onMovies(error)
        })*/
		
		var total_movie_pages= 0;

        themoviedb.discover.getMovies({year:"2019", sort_by:"release_date.asc"},
            function (movies) {
                movies = JSON.parse(movies)
                if (movies.results && movies.results.length > 0) {
					//console.log("total pages are " + movies.total_pages);
					total_movie_pages= movies.total_pages;
                    self.setState({
                        movies: movies.results
                    })
   
                    self.props.onMovies(null, movies)
                }
           }, 
           function (error) {
               // do something with errorCallback
               console.error(error)
               self.props.onMovies(error)
		   })
		   
		/*if(total_movie_pages>1){
			for(var i=2; i<(total_movie_pages+1); i++){
				themoviedb.discover.getMovies({year:"2019", page:i, sort_by:"release_date.asc"},
					function (movies_second) {
						movies_second = JSON.parse(movies_second)
						if (movies_second.results && movies_second.results.length > 0) {
							self.setState({
								movies_second: movies_second.results
							})
		   
							self.props.onMovies(null, this.state.movies.concat(movies_second));
						}
				}, 
				function (error) {
					// do something with errorCallback
					console.error(error)
					self.props.onMovies(error)
				})
			}
		}*/

	}

	componentDidMount = () => {
		this.getMovies()
	}

	onClick = (movie) => {
		console.log(movie)
		console.log('clicked')
		this.setState({
			movie: movie,
			show: true
		})
	}

	onHide = () => {
		this.setState({
			show: false
		})
	}


	render = () => {
		var term = this.props.searchTerm
		var filteredMovies = []

		if (this.state.movies.length > 0) {
			if (typeof term == "string" && term && term.trim()) {
				filteredMovies = this.state.movies.filter((value) => {
					return value.title.toLowerCase().match(term) != null
				})
			}
			else {
				filteredMovies = this.state.movies
			}
            //console.log('Total ' + filteredMovies.length);
			var movies = filteredMovies.map((value, index, array) => {
               // if(value.popularity>10)
				    return (
                   
                        <ListGroupItem onClick={this.onClick.bind(this, value)} key={value.id} href={"#/movies/" + value.id}>{value.title} {value.popularity}</ListGroupItem>	
					    )
			})


			return (
					<div className="PopularMovies">
						<MovieModal onHide={this.onHide} show={this.state.show} movie={this.state.movie}>
						</MovieModal>
						<ListGroup>
							{movies}
						</ListGroup>
						
					</div>
				)

		}
		else {
			return false
		}
	}
}