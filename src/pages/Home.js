import react, { useState } from "react";

const Home = () => {
  const [filmList, setFilmList] = useState([]);
  return (
    <div>
      <h1> Hi bro whats up !? da</h1>
      <form>
        <label>
          Link:
          <input type="text" />{" "}
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default Home;
