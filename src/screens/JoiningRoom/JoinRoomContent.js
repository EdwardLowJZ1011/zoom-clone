import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setConnectionOnlyWithAudio,
  setIdentity,
  setRoomId,
} from "../../app/actions";
import JoinRoomButton from "./JoinRoomButton";
import JoinRoomInputs from "./JoinRoomInputs";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import { v4 as uuidv4 } from "uuid";
import { checkIfRoomExists } from "../../utils/twilioUtils";
import RoomNotFoundMsg from "./RoomNotFoundMsg";

export function JoinRoomContent(props) {
  const {
    isRoomHost,
    setConnectionOnlyWithAudioAction,
    connectionOnlyWithAudio,
    setIdentityAction,
    setRoomIdAction,
    setShowLoadingOverlay,
  } = props;
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [showRoomNotFoundMsg, setshowRoomNotFoundMsg] = useState(false);
  const navigate = useNavigate();

  const handleJoinToRoom = async () => {
    setIdentityAction(nameValue);
    if (!isRoomHost) {
      setShowLoadingOverlay(true);
      const roomExists = await checkIfRoomExists(roomIdValue);
      setShowLoadingOverlay(false);
      if (roomExists) {
        setRoomIdAction(roomIdValue);
        navigate("/room");
      } else {
        setshowRoomNotFoundMsg(true);
      }
    } else {
      setRoomIdAction(uuidv4());
      navigate("/room");
    }
  };

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox
        setConnectionOnlyWithAudioAction={setConnectionOnlyWithAudioAction}
        connectionOnlyWithAudio={connectionOnlyWithAudio}
      />
      <RoomNotFoundMsg showRoomNotFound={showRoomNotFoundMsg} />
      <JoinRoomButton
        isRoomHost={isRoomHost}
        handleJoinToRoom={handleJoinToRoom}
      />
    </>
  );
}

const mapStoreStateProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConnectionOnlyWithAudioAction: (onlyWithAudio) =>
      dispatch(setConnectionOnlyWithAudio(onlyWithAudio)),
    setIdentityAction: (identity) => dispatch(setIdentity(identity)),
    setRoomIdAction: (id) => dispatch(setRoomId(id)),
  };
};

export default connect(mapStoreStateProps, mapDispatchToProps)(JoinRoomContent);
