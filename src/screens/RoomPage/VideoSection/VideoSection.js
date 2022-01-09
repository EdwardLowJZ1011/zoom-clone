import React, { useState } from "react";
import VideoButton from "./VideoButton";
import Videos from "./Videos";

const VideoSection = () => {
  const [room, setRoom] = useState();

  return (
    <div className="video_section_container">
      <Videos room={room} setRoom={setRoom} />
      <VideoButton room={room} />
    </div>
  );
};

export default VideoSection;
