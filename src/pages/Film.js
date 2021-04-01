import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faEye } from "@fortawesome/free-solid-svg-icons";

const Film = ({ info }) => {
  return (
    <StyledFilm>
      <h1> {info.snippet.title}</h1>
      <Stats>
        <p>
          {" "}
          <FontAwesomeIcon icon={faEye}> </FontAwesomeIcon>{" "}
          {info.statistics.viewCount}{" "}
        </p>
        <p>
          {" "}
          <FontAwesomeIcon icon={faThumbsUp}> </FontAwesomeIcon>{" "}
          {info.statistics.likeCount}
        </p>
      </Stats>
      <Thumbnail src={info.snippet.thumbnails.maxres.url} alt="thumbnail" />
    </StyledFilm>
  );
};

const StyledFilm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
  height: 60vh;
  width: 60vw;
  border-radius: 3%;
  cursor: pointer;
  overflow: hidden;
  h1 {
    margin: 1rem 0rem 0.5rem 0rem;
    width: 75%;
  }
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 60%;
  align-self: flex-end;
  justify-self: flex-end;
  object-fit: cover;
  margin-top: auto;
`;
const Stats = styled.div`
  display: flex;
  gap: 10px;
`;

export default Film;
