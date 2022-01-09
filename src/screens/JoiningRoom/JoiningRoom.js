import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { setIsRoomHost } from "../../app/actions";
import "./JoiningRoom.css";
import JoinRoomContent from "./JoinRoomContent";
import LoadingOverlay from "./LoadingOverlay";

const JoinRoomTitle = ({ isRoomHost }) => {
  const titleText = isRoomHost ? "Host Meeting" : "Join Meeting";

  return <p className="join_room_title">{titleText}</p>;
};

export function JoiningRoom(props) {
  const { setIsRoomHostAction, isRoomHost } = props;
  const search = useLocation().search;
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");
    
    if (isRoomHost) {
      setIsRoomHostAction(true);
    }
  }, []);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent setShowLoadingOverlay={setShowLoadingOverlay}/>
        {showLoadingOverlay && <LoadingOverlay />}
      </div>
    </div>
  );
}

const mapStoreStateProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(mapStoreStateProps, mapDispatchToProps)(JoiningRoom);
