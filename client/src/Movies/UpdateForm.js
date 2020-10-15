import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

export default function UpdateMovie() {
    const {id} = useParams()
    const history = useHistory()
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

    
    console.log(id)
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res)=>{
            setMovie(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])

    function movieUpdater(e) {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`,movie)
            .then((res)=>{
                console.log(res.data)
                console.log('success! movie updated!')
            })
            .catch((err)=>{
                console.log(err)
                console.log('oh no! there was a mistake')
            })
    }

    return (
        <>
            <h1>Update Movie!</h1>
            <form>
                <input onChange={handleChange} name='title' type='text' placeholder='Title' />
                <input onChange={handleChange} name='director' type='text' placeholder='Director' />
                <input onChange={handleChange} name='metascore' type='text' placeholder='Metascore' />
                <input onChange={handleChange} name='id' type='number' placeholder='ID' />
                <input onChange={handleChange} name='stars' type='text' placeholder='Stars' />
                <button onClick={movieUpdater}>Update Movie</button>
            </form>
        </>
    )
}