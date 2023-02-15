
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../reducer/context'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [trends, setTrends] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [searchResultShow, setSearchResultShow] = useState([])
  const [searching, setSearching] = useState(false)
  const { id } = useContext(Context)
  const req = 'https://api.themoviedb.org/3';


  useEffect(() => {
    axios.get(`${req}/trending/all/week?api_key=${id}`)
      .then(res => {
        setTrends(res.data.results)
      })
  }, [])



  useEffect(() => {
    if (search.split('').length > 0) {
      axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${id}&language=en-US&query=${search}&page=100&include_adult=false`)
        .then(res => {
          setSearchResult(res.data.results)
          setSearchResultShow(res.data.results.slice(0, 5))
        })
      setSearching(true)
    } else {
      setSearching(false)
    }
  }, [search])


  const closeSearch = (value) => {
    if (searching) {
      if (!value.classList.contains('hehe')) {
        setSearching(false)
      }
    }
  }

  const openSearch = () => {
    if (search !== '') {
      if (!searching) {
        setSearching(true)
      }
    }
  }

  return (
    <div className="home" onClick={(e) => closeSearch(e.target)}>
      <div className="hero">
        <img className='hero-img' src={require('../images/tv.jpg')} alt="" />
        <div className="home-text">
          <h1>Welcome Nigga</h1>
          <p>Explore your favourite moives, tv shows and people</p>
          <form>
            <input onClick={openSearch} className="search hehe" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
          </form>
          <div className={searching ? "searched show hehe" : "searched"}>{
            <div>{
              searchResultShow.map(item => {
                const { id, name, media_type, known_for_department, known_for, poster_path, title, vote_average } = item
                if (media_type == 'person') {
                  return (
                    <div className="search-div" key={id}>
                      <i className="fa-solid fa-user"></i>
                      <div>
                        <h4>{name}</h4>
                        <p>{known_for_department}</p>
                        <div>{known_for.map((item, i) => {
                          return (
                            <p key={item.id}> {item.title ? item.title : item.name}{i == known_for.length - 1 ? '' : ','}</p>
                          )
                        })}</div>
                      </div>
                    </div>
                  )
                }
                else if (media_type == 'movie' || media_type == 'tv') {
                  return (
                    <Link to={'/movie'} state={{ movieId: id }} key={id}>
                      <div className="search-div-movie" >
                        <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt="" />
                        <div>
                          <h4>{title ? title : name}</h4>
                          <p><i className="fa-solid fa-star"></i>{vote_average}</p>
                        </div>
                      </div>
                    </Link>
                  )
                }

              })
            }
              <Link className='see-all' to={'/searchResult'} state={{ array: searchResult, search: search }}>See all Result</Link>
            </div>
          }
          </div>
        </div>
      </div>

      <div className="container">
        <div className="trending">
          <h2>The fuck do u want to watch?</h2>
          <h3>This Week's trending</h3>
          <div className="trends">
            {/*
            trends !== [] &&
              trends.map(trend => {
                const { name, id, title, poster_path, vote_average, first_air_date, release_date } = trend

                return (
                  <div className="trend" key={id}>
                    <Link to={'/movie'} state={{ movieId: id }}>
                      <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt="" />
                      <div>
                        <p><i className="fa-solid fa-star"></i> {vote_average}</p>
                        <p>{title ? title : name}</p>
                        <p>{first_air_date ? first_air_date : release_date}</p>
                      </div>
                    </Link>
                  </div>
                )

              })
            */  }
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
