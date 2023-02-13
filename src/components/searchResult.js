
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom"


const SearchResult = () => {
  const location = useLocation()
  const { array, search } = location.state
  const [result, setResult] = useState('all')

  let ligma = []

  array.filter(item => {
    if (!ligma.includes(item.media_type)) {
      ligma.push(item.media_type)
    }
  })

  console.log(array)
  console.log(ligma)

  return (
    <div className="search-result">
       <h1>All Results for '{search.toUpperCase()}'</h1>
      <div className="container">
        <div className="filter">
          Search-Results
          {ligma && ligma.map((item, i) => {
            return (
              <p key={i}>{item.toUpperCase()}:{
                array.map(category => {
                  if(item == category.media_type){
                    let sugma = 0
                    sugma = sugma + 1
                    return sugma
                  }
                })
              }</p>
            )
          })}
        </div>
        <div className="filter-result">{array &&
          array.map(item => {
            const { id, name, media_type, known_for_department, known_for, overview, poster_path, title, vote_average } = item
            if (result == 'all') {
              if (media_type == 'person') {
                return (
                  <Link to={'/people'} state={{ people: id }} key={id}>
                    <div className="search-div">
                      <h4>{name}</h4>
                      <p>{known_for_department}</p>
                      <div>{known_for.map((item, i) => {
                        return (
                          <p key={item.id}> {item.title ? item.title : item.name}{i == known_for.length - 1 ? '' : ','}</p>
                        )
                      })}</div>
                    </div>
                  </Link>
                )
              }
              else if (media_type == 'movie' || media_type == 'tv') {
                return (
                  <Link to={'/movie'} state={{ movieId: id }} key={id}>
                    <div className="search-div-movie" >
                      <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt="" />
                      <div>
                        <h4>{title ? title : name}</h4>
                        <p>{media_type.toUpperCase()}</p>
                        <p><i className="fa-solid fa-star"></i>{vote_average}</p>
                        <p>{overview}</p>
                      </div>
                    </div>
                  </Link>
                )
              }
            }

          })
        }</div>
      </div>
    </div>
  );
}

export default SearchResult;