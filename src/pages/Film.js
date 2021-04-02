import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faEye,
  faTrashAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as farFaStar,
  faPlayCircle,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loadFilms } from "../actions/filmAction";
import { deleteItem } from "../actions/filmDelete";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Film = ({ info, id }) => {
  const [star, setStar] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const deleteHandler = () => {
    dispatch(deleteItem(id));
    console.log(id);
  };
  return (
    <StyledFilm>
      <h1> {info.snippet.title}</h1>{" "}
      <Trash>
        {" "}
        <FontAwesomeIcon
          icon={faTrashAlt}
          size="2x"
          onClick={deleteHandler}
          color="#F55338"
        >
          {" "}
        </FontAwesomeIcon>{" "}
      </Trash>
      <Star>
        {" "}
        <FontAwesomeIcon
          icon={star ? faStar : farFaStar}
          size="2x"
          color="#F5E351"
          onClick={() => setStar(!star)}
        >
          {" "}
        </FontAwesomeIcon>{" "}
      </Star>
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
      {info && (
        <Thumbnail src={info.snippet.thumbnails.maxres.url} alt="thumbnail" />
      )}
      <Play>
        {" "}
        <FontAwesomeIcon
          icon={faPlayCircle}
          size="6x"
          color="#F55338"
          onClick={handleShow}
        ></FontAwesomeIcon>
      </Play>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
  position: relative;
  h1 {
    margin: 1rem 0rem 0.5rem 0rem !important;
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
const Image = styled.div`
  align-self: flex-end;
  justify-self: flex-end;
  margin-top: auto;
  width: 100%;
  min-height: 60%;
`;

const Stats = styled.div`
  display: flex;
  gap: 10px;
`;
const Trash = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
`;
const Star = styled.div`
  position: absolute;
  top: 5%;
  left: 5%;
`;
const Play = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 18%;
  opacity: 0.7;
  transition: 0.5s ease all;
  &:hover {
    opacity: 1;
  }
`;
export default Film;
