import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import {Link} from 'react-router-dom'

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  //DELETE MOVIE

  function deleteMovie(){
      axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then((res)=>{
        console.log('success!',res)
        push('/')
      })
      .catch((err)=>{
        console.log(err,'error')
      })  
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  console.log('Calling too many times')
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to ='/update-movie/:id'>
        <button> Update Movie </button>
      </Link>
      <button onClick={deleteMovie}> Delete Movie </button>
      <Link to='/add-movie'>
      <button> Add Movie </button>
      </Link>
    </div>
  );
}

export default Movie;
