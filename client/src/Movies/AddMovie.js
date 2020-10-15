import React, { useState } from 'react';
import axios from 'axios';

export function AddMovie() {
    const [movie, setMovie] = useState(
        {
            movie: {
                id: 5,
                title: '',
                director: '',
                metascore: 89,
                stars: [''],
            }
        });

    const handleChange = (e) => {
        setMovie({
            movie:{
            ...movie.movie,
            [e.target.name]: e.target.value
            }
        })
        console.log(movie)
    }

    function movieAdder(e) {
        e.preventDefault()
        axios
            .post(`http://localhost:5000/api/movies/`,movie.movie)
            .then((res)=>{
                console.log(res.data)
                console.log('success! movie added!')
            })
            .catch((err)=>{
                console.log(err)
                console.log('oh no! there was a mistake')
            })
    }

    return (
        <>
            <h1>Add Movie!</h1>
            <form>
                <input onChange={handleChange} name='title' type='text' placeholder='Title' />
                <input onChange={handleChange} name='director' type='text' placeholder='Director' />
                <input onChange={handleChange} name='metascore' type='text' placeholder='Metascore' />
                <input onChange={handleChange} name='id' type='number' placeholder='ID' />
                <input onChange={handleChange} name='stars' type='text' placeholder='Stars' />
                <button onClick={movieAdder}>Add Movie</button>
            </form>
        </>
    )
}