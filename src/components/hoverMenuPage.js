import { Context } from "../reducer/context"
import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { Link } from 'react-router-dom'


const HoverMenuPage = () => {
    const location = useLocation()
    const { id } = useContext(Context)
    const { category, subCategory } = location.state
    const [array, setArray] = useState([])
    console.log(category, subCategory)

 
    useEffect(() => {
        if (subCategory == 'Now Playing') {
            axios.get(`https://api.themoviedb.org/3/${category}/now_playing?api_key=${id}&language=en-US&page=1`)
                .then(res => {
                    console.log(res.data.results)
                    setArray(res.data.results)
                })
        } else if (subCategory == 'Top Rated') {           
            axios.get(`https://api.themoviedb.org/3/${category}/top_rated?api_key=${id}&language=en-US&page=1`)
                .then(res => {
                    console.log(res.data.results)
                    setArray(res.data.results)
                })
        } else {
            axios.get(`https://api.themoviedb.org/3/${category}/${subCategory.toLowerCase()}?api_key=${id}&language=en-US&page=1`)
                .then(res => {
                    console.log(res.data.results)
                    setArray(res.data.results)
                })
        }
    }, [category, subCategory])


    return (
        <div className="hoverMenuPage">
            <div className="container">
                <h1>'{subCategory}' {category+'s'} in Nigga.com</h1>
                <div className="category-results">
                {array &&
              array.map(trend => {
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
            }
            </div>
            </div>
        </div>
    );
}

export default HoverMenuPage;