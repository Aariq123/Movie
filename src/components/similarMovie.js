import { Context } from "../reducer/context"
import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { Link } from 'react-router-dom'

const SimilarMovie = () => {
  const { id } = useContext(Context)
  const [ details, setDetails ] = useState('')
  const [ similar, setSimilar] = useState([])
  const location = useLocation()
  const { movieId } = location.state
  const [credits, setCredits] = useState([])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${id}&language=en-US`)
      .then(res => {
        setDetails(res.data)
      })

    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${id}&language=en-US`)
      .then(res => {
        setSimilar(res.data.results)
      })
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${id}&language=en-US`)
      .then(res => {
        console.log(res.data)
        setCredits(res.data)
      })
  }, [])

  return (
    <div className="movie">
    {details &&
      <div>
        <div className="movie-heading">
          <img className="backdrop" src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`} alt="" />
          <div className="poster">
            <img src={`https://image.tmdb.org/t/p/w300${details.poster_path}`} alt="" />
          </div>
          <div className="overview">
            <h1>{details.title}</h1>
            <h4>{details.release_date}</h4>
            <div className="genres">
              {details.genres.map((genre, i) => {
                return (
                  <p key={genre.id}> {genre.name}{i == details.genres.length - 1 ? '' : ','}</p>
                )
              })}
            </div>
            <div className="rating">
              <div>
              </div>
            </div>
            <p><i className="fa-regular fa-clock"></i> {details.runtime + ' minutes'}</p>
            <p className="tagline">{details.tagline}</p>
            <h3>Overview</h3>
            <p className="details">{details.overview}</p>
          </div>
        </div>

        <div className="container">
          <div className="money">
            <div>
              <div>
                <h3>Budget</h3>
                <p>${details.budget}</p>
              </div>
              <div>
                <h3>Revenue</h3>
                <p>${details.revenue}</p>
              </div>
              <div>
                <h3>Spoken Language</h3>
                <ul>{details.spoken_languages.map((ligma, i) => {
                  return (
                    <li key={i}>{ligma.english_name}</li>
                  )
                })}</ul>
              </div>
            </div>
            <div className="cast">
              <div>
                <h1>Cast</h1>
                <h4><Link to={'/credits'} state={{credits:credits, poster:details.poster_path, title:details.title, release:details.release_date}}> View full cast and crew</Link></h4>
              </div> 
              <div>
                {credits &&
                  credits.cast.map(movie => {
                    const { id, name, profile_path, character } = movie
                    return (
                      <div className="person" key={id}>
                        <Link to={'/people'} state={{ personId: id }}>
                          <img src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt="Couldn't find the image" />
                          <div>
                            <h4>{name}</h4>
                            <p>{character}</p>
                          </div>
                        </Link>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className="similar">
            <h1>You Might Also Like:</h1>
            <div>
              {similar &&
                similar.map(movie => {
                  const { id, title, poster_path } = movie
                  return (
                    <div className="similar-movie" key={id}>
                      <Link to={'/movie'} state={{ movieId: id }}>
                        <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt="" />
                        <div>
                          <p>{title}</p>
                        </div>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>}
  </div>
);
}

export default SimilarMovie;