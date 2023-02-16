import axios from "axios"
import { useState } from "react"
import { Context } from "../reducer/context"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

const HeaderPeople = () => {
    const [array, setArray] = useState([])
    const { id } = useContext(Context)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${id}&language=en-US&page=1`)
            .then(res => {
                console.log(res.data.results)
                setArray(res.data.results)
            })

    }, [])

    return (
        <div className="header-people">
            <h1>Popular people in Nigga.com</h1>
            <div className="container">
                {array && array.map(person => {
                    const { id, name, profile_path, known_for_department, known_for } = person

                    return (
                        <Link to='/people' state={{personId: id}} key={id}>
                        <div className="search-div-movie">
                            <img src={`https://image.tmdb.org/t/p/w300${profile_path}`} alt="" />
                            <div>
                                <div>
                                    <h4>{name}</h4>
                                    <p>{known_for_department}</p>
                                </div>
                               
                                    <div>{known_for.map((item, i) => {
                                        return (
                                            <p key={item.id}> {item.name ? item.name : item.title}{i == known_for.length - 1 ? '' : ','}</p>
                                        )
                                    })}</div>
                                
                            </div>
                        </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}

export default HeaderPeople;