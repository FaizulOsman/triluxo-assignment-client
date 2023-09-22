import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div>
      <ReactPlayer
        url={videoUrl}
        controls={true}
        width="100%"
        style={{
          border: "3px solid black",
          borderRadius: "5px",
          margin: "0px auto",
        }}
      />
    </div>
  );
};

export default VideoPlayer;
