import React, { useEffect, useState } from "react";

import classes from './App.css'
import Movie from './Component/Movie'
import MovieInfo from "./Component/movieinfo/MovieInformation";
import {  BiSearchAlt2 } from "react-icons/bi";
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3e460ce267a850056ef9b570eb30d1eb&page=1`;
const SEARCH_API =  `https://api.themoviedb.org/3/search/movie?&api_key=3e460ce267a850056ef9b570eb30d1eb&query=`;
//영화 순위에 따른 정렬?const [searchTerm, setSearchTerm] = useStateState

//영화정보 API


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    //modal 관리
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const openModalHandler = (props) => setIsModalOpen(true);
    // const closeModalHandler = (props) => setIsModalOpen(false);

    useEffect(() => {
      getMovies(FEATURED_API);
    }, []);

    const getMovies = (API) => {
      fetch(API)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
      });
    }

    //엔터쳤을 때
  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    // 검색 API호출
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      
      setSearchTerm("");
    }
  }

 const handleOnChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // 검색버튼 클릭 시
  const onClick = (e) =>{
    e.preventDefault();
    
    // 검색 API호출
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      
      setSearchTerm("");
    }
  }
  return (
    <>
    {/* {isModalOpen &&  <MovieInfo onClose={closeModalHandler}/>} */}
        {/* {isModalOpen && movies.length > 0 &&
         movies.map((movie) => <MovieInfo key={movie.id} {...movie} onClose={closeModalHandler}/>)} */}
        <header> 
          <div>
          <a href="http://localhost:3000/?"><img class="Logo" src= "https://blog.kakaocdn.net/dn/c4jzIT/btrghQIPMkh/sByblE0p50HHtMiEDdn8k1/img.png"/></a>
          </div>
         
          <form onSubmit={handleOnSubmit}>
          <div className="msearch">
            <button type="button" id="search_btn" onClick={onClick}>
              <BiSearchAlt2 className="search_icon"></BiSearchAlt2>
            </button>
              <input className="search" type='text' placeholder="영화 이름 입력" value={searchTerm} onChange={handleOnChange}></input> 
            </div>
          </form>

        </header>

    {/* 포스터 나열 */} 
    <div className="movie-container">
            {movies.length > 0 &&
              movies.map((movie) => <Movie key={movie.id} {...movie}/>)} 
            {/* {isModalOpen && movies.length > 0 &&
         movies.map((movie) => <MovieInfo key={movie.id} {...movie} onClose={closeModalHandler}/>)} */}
    </div>
    </>
 
     )
}

export default App