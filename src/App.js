import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Home from "./components/home.js";
import People from "./components/people.js";

import { HashRouter, Route, Routes } from "react-router-dom";
import Movie from "./components/movie.js";
import SimilarMovie from "./components/similarMovie.js";
import { Context } from "./reducer/context";
import { useContext } from "react";
import SearchResult from "./components/searchResult.js";
import HoverMenuPage from "./components/hoverMenuPage.js";
import Credits from "./components/credits.js";
import HeaderPeople from "./components/headerPeople.js";

function App() {

  const { hoverMenuClose, hoverMenu, closeSidebar } = useContext(Context)

 

  return (
    <div className="app" onMouseOver={hoverMenuClose} onClick={closeSidebar}>
    
      <HashRouter>
        <Header></Header>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/movie" element={<Movie></Movie>}></Route>
            <Route path="/similarMovie" element={<SimilarMovie></SimilarMovie>}></Route>
            <Route path="/searchResult" element={<SearchResult></SearchResult>}></Route>
            <Route path="/people" element={<People></People>}></Route>
            <Route path="/hoverMenuPage" element={<HoverMenuPage></HoverMenuPage>}></Route>
            <Route path="/credits" element={<Credits></Credits>}></Route>
            <Route path="/headerPeople" element={<HeaderPeople></HeaderPeople>}></Route>
          </Routes>
        <Footer></Footer>
        </HashRouter>

    </div>
  );

}

export default App;
