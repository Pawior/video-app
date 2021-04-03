import React from "react";
import "../styles/_modal.scss";
const YoutubeEmbed = ({ embedId }) => {
  return (
    <div className="video-responsive">
      <iframe
        className="videoA"
        // width="853"
        // height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;
