import React, { useEffect } from "react";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import VideoSection from "./VideoSection/VideoSection";
import ChatSection from "./ChatSection/ChatSection";
import { connect } from "react-redux";
import "./RoomPage.css";
import { setTwilioAccessToken } from "../../app/actions";
import { getTokenFromTwilio } from "../../utils/twilioUtils";
import Overlay from "../Overlay";
import { useNavigate } from "react-router-dom";

const RoomPage = (props) => {
  const { identity, roomId, setTwilioAccessTokenAction, showOverlay } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (!identity || !roomId)
      navigate('/');
    else
      getTokenFromTwilio(setTwilioAccessTokenAction, identity);
  }, []);
  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      {showOverlay && <Overlay />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setTwilioAccessTokenAction: (token) =>
      dispatch(setTwilioAccessToken(token)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomPage);
