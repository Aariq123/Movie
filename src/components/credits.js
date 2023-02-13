import { useLocation } from "react-router-dom"
import { Link } from 'react-router-dom'

const Credits = () => {
    const location = useLocation()
    const { credits, poster, title, release } = location.state
    console.log(poster)

    console.log(credits)
    return (
        <div className="credits">
            <div className="credits-header">
                <img src={`https://image.tmdb.org/t/p/w200${poster}`} alt="" />
                <h2>{`${title}(${release})`}</h2>
            </div>
            <div className="container">
                <div className="credits-cast">
                    <h2>Cast</h2>
                    {credits.cast.map(person => {
                        const { id, character, name, profile_path } = person
                        return (
                            <div className="credits-person" key={id}>
                                <Link to='/people' state={{ personId: id }}>
                                <img src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt="Couldn't find the image" />
                                <div>
                                    <h3>{name}</h3>
                                    <p>{character}</p>
                                </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div className="credits-crew">
                    <h2>Crew</h2>
                    {credits.crew.map(person => {
                        const { id, job, name, profile_path } = person
                        return (
                            <div className="credits-person" key={id}>
                                <Link to='/people' state={{ personId: id }}>
                                    <img src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt="Couldn't find the image" />
                                    <div>
                                        <h3>{name}</h3>
                                        <p>{job}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Credits;