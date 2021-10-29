import React from "react";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";

const Container = styled.div`
  padding: 1rem;
  padding-top: 0;
  position: relative;

  h2 {
    font-size: 1.5rem;
    margin: 0;
  }
`;
const CloseButton = styled(FaWindowClose)`
  position: absolute;
  top: 0rem;
  right: 0.5rem;
  font-size: 1.5rem;
  padding: 0.4rem;
  color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #454c5a;
  }
`;
const MovieContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  transition: all 0.3s ease-in-out;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    background: #30343e;
    filter: brightness(0.7) grayscale(0.5);
    transform: scale(1.02);
  }
`;
const TextContainer = styled.div`
  text-align: left;

  h3,
  p {
    margin: 0;
  }

  h3 {
    font-size: 1.2rem;
  }

  p {
    font-size: 1.5rem;
  }
`;
const Image = styled.img`
  width: 5rem;
  height: 7rem;
  object-fit: cover;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const SearchList = ({ data, setShowSearch, getMovieRequest }) => {
  const search = (id) => {
    getMovieRequest(id);
  };
  const close = () => {
    setShowSearch(false);
  };
  return (
    <Container>
      <h2>SearchList</h2>
      <CloseButton onClick={close} />
      {data.slice(0, 4).map((movie) => (
        <MovieContainer
          key={movie.id}
          onClick={() => {
            search(movie.id);
          }}
        >
          <Image src={movie.image} alt="moviePicture" />
          <TextContainer>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </TextContainer>
        </MovieContainer>
      ))}
      <div>{data.searchType}</div>
    </Container>
  );
};

export default SearchList;
