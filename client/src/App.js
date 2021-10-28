import "./App.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const mockData = {
  imDbId: "tt1375666",
  title: "Inception",
  fullTitle: "Inception (2010)",
  type: "Movie",
  year: "2010",
  videoId: "vi2959588889",
  videoTitle: "10th Anniversary Dream Trailer",
  videoDescription:
    "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  thumbnailUrl:
    "https://m.media-amazon.com/images/M/MV5BMTQ1ZmIzOTAtNDcwZi00NDVkLWE4NWItYWNhZGY1MmVlZGU0XkEyXkFqcGdeQWRvb2xpbmhk._V1_.jpg",
  uploadDate: "08/02/2020 21:45:05",
  link: "https://www.imdb.com/video/vi2959588889",
  linkEmbed: "https://www.imdb.com/video/imdb/vi2959588889/imdb/embed",
  errorMessage: "",
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  const getMovieRequest = async () => {
    const response = await fetch(
      `https://imdb-api.com/en/API/Trailer/${process.env.REACT_APP_API_KEY}/tt1375666`
    );
    const data = await response.json();
    setMovie(data);
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
    setMovie(mockData);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {movie === null ? (
          <p>Loading...</p>
        ) : (
          <Container>
            <Image
              onClick={() => goToUrl(movie.linkEmbed)}
              src={movie.thumbnailUrl}
              alt="moviePicture"
            />
            <Title>{movie.fullTitle}</Title>
            <Description>{movie.videoDescription}</Description>
            <ButtonContainer>
              <Button onClick={() => goToUrl(movie.linkEmbed)}>
                Watch Trailer
              </Button>
              <Button onClick={() => goToUrl(movie.link)}>Learn more</Button>
            </ButtonContainer>
          </Container>
        )}
      </header>
    </div>
  );
};

export default App;
