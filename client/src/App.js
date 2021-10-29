import "./App.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchList from "./components/SearchList";
import { FiSearch } from "react-icons/fi";

import mockMovieData from "./mock/movieData.json";
import mockSearchData from "./mock/searchData.json";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Search = styled.input`
  border: none;
  padding: 0.5rem 0.8rem;
  background: #454c5a;
  color: white;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  font-size: 1.2rem;
  background: #a40505;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 1rem;
  border: none;
  color: white;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #7e0404;
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 20rem;
  height: 20rem;
  object-fit: cover;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: brightness(0.5) grayscale(0.5);
    transform: scale(1.02);
  }
`;

const Title = styled.h1``;

const Description = styled.p`
  max-width: 40rem;
  font-size: 1.5rem;
  font-weight: 300;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  border: none;
  color: white;
  background: black;
  border-radius: 0.5rem;
  margin: 0 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: white;
    color: black;
    transform: scale(1.1);
  }
`;

const App = () => {
  // const [data, setData] = useState(null);
  const [movie, setMovie] = useState(null);
  const [searchResults, setSearchResults] = useState(mockSearchData);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState(null);

  const getMovieRequest = async (id = "tt1375666") => {
    setShowSearch(false);
    const response = await fetch(
      `https://imdb-api.com/en/API/Trailer/${process.env.REACT_APP_API_KEY}/${id}`
    );
    const data = await response.json();
    setMovie(data);
  };

  const handleChange = (event) => setSearchText(event.target.value);

  const search = async () => {
    const response = await fetch(
      `https://imdb-api.com/en/API/SearchTitle/${process.env.REACT_APP_API_KEY}/${searchText}`
    );
    const data = await response.json();
    setSearchResults(data);
    console.log(data);
    setShowSearch(true);
  };

  const goToUrl = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await fetch("/api");
    //   const body = await response.json();
    //   console.log(body);
    //   setData(body.message);
    // };
    // getMovieRequest();
    setMovie(mockMovieData);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {movie === null ? (
          <p>Loading...</p>
        ) : (
          <Container>
            <SearchContainer>
              <Search
                onChange={handleChange}
                placeholder="Search for a movie"
              />
              <SearchButton onClick={search}>
                <FiSearch />
              </SearchButton>
            </SearchContainer>
            {showSearch && (
              <>
                <SearchList
                  setShowSearch={setShowSearch}
                  data={searchResults.results}
                  getMovieRequest={getMovieRequest}
                />
              </>
            )}
            {!showSearch && (
              <>
                <Image
                  onClick={() => goToUrl(movie.linkEmbed)}
                  src={movie.thumbnailUrl}
                />
                <Title>{movie.fullTitle}</Title>
                <Description>{movie.videoDescription}</Description>
                <ButtonContainer>
                  <Button onClick={() => goToUrl(movie.linkEmbed)}>
                    Watch Trailer
                  </Button>
                  <Button onClick={() => goToUrl(movie.link)}>
                    Learn more
                  </Button>
                </ButtonContainer>
              </>
            )}
          </Container>
        )}
      </header>
    </div>
  );
};

export default App;
