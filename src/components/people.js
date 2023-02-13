import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"
import { useContext } from 'react'
import { Context } from '../reducer/context'
import axios from 'axios'

const People = () => {
  const location = useLocation()
  const { personId } = location.state
  const { id } = useContext(Context)
  const [person, setPerson] = useState()
  const [movies, setMovies] = useState()
  const [credit, setCredit] = useState()
  const [read, setRead] = useState(false)

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=${id}&language=en-US`)
      .then(res => {
        console.log(res.data)
        setPerson(res.data)
      })

    axios.get(`https://api.themoviedb.org/3/person/${personId}/combined_credits?api_key=${id}&language=en-US`)
      .then(res => {
        console.log(res.data)
        setCredit(res.data)
      })
  }, [])


  return (
    <div className="people">
      <div className="container">
        {person &&
          <div>
            <div className="people-heading">
              <img src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`} alt="" />
              <div>
                <h2>{person.name}</h2>
                <h3>Biography</h3>
                <p>{read ? person.biography : person.biography.split('').slice(0, 650)}
                  <span className='read-more' onClick={() => setRead(true)}>{read ? '' : ' Read More'}
                  </span>
                </p>
              </div>
            </div>

            <div className="people-des">

              <div className="personal-info">
                <h3>Personal information</h3>
                <div>
                  <div>
                    <h4>Known for</h4>
                    <p>{person.known_for_department}</p>
                  </div>
                  <div>
                    <h4>Born</h4>
                    <p>{person.birthday}</p>
                  </div>
                  <div>
                    <h4>Birthplace</h4>
                    <p>{person.place_of_birth}</p>
                  </div>
                </div>
              </div>

              <div className="acting">
                <h1>Known For</h1>
                {credit &&
                  credit.cast.map(movie => {
                    return (

                      <Link to='/movie' state={{ movieId: movie.id }} key={movie.id}>
                        <p>{movie.release_date ? movie.release_date : movie.first_air_date}</p>
                        <p>{movie.title ? movie.title : movie.name}</p>
                        <p>{movie.character}</p>
                      </Link>

                    )
                  })
                }
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default People;