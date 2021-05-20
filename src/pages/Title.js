import React from "react";
import Home from "./Home";
import "../styles/title.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import image from "../images/Vector.png";
import Button from "react-bootstrap/Button";

const TitlePage = () => {
  return (
    <>
      <div class="Title"> Hi</div>
      <button>
        {" "}
        <Link to="/Library"> Go to Library </Link>
      </button>
      <div class="waveWrapper waveAnimation">
        <Page>
          <Info>
            {" "}
            <p> Your favourite videos all in one place!</p>
            <Link to="/Library">
              <Button id="BtnLibrary" variant="outline-light" size="lg">
                Go to library!
              </Button>
            </Link>
          </Info>
          <img src={image} width="800" height="580"></img>
        </Page>

        <div class="waveWrapperInner bgTop">
          <div
            class="wave waveTop"
            style={{
              backgroundImage: `url(http://front-end-noobs.com/jecko/img/wave-mid.png)`,
            }}
          ></div>
        </div>
        <div class="waveWrapperInner bgMiddle">
          <div
            class="wave waveMiddle"
            style={{
              backgroundImage: `url(http://front-end-noobs.com/jecko/img/wave-mid.png)`,
            }}
          ></div>
        </div>
        <div class="waveWrapperInner bgBottom">
          <div
            class="wave waveBottom"
            style={{
              backgroundImage: `url(http://front-end-noobs.com/jecko/img/wave-mid.png)`,
            }}
          ></div>
        </div>
      </div>
      <Switch>
        <Route path="/Library">
          <Home />
        </Route>
      </Switch>
    </>
  );
};

const Page = styled.div`
  position: relative;
  z-index: 20;
  opacity: 1 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  p {
    opacity: 1 !important;
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
  }
`;
const Info = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  Button {
    align-self: center;
  }
`;

export default TitlePage;
