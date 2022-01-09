import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { store } from "../app/store";
import {
  connect,
  LocalAudioTrack,
  LocalDataTrack,
  LocalVideoTrack,
} from "twilio-video";
import { setMessages, setShowOverlay } from "../app/actions";

const audioConstraints = {
  video: false,
  audio: true,
};

const videoConstraints = {
  video: { width: 640, height: 480 },
  audio: true,
};

let dataChannel = null;

export const getTokenFromTwilio = async (setAccessToken, identity) => {
  const randomId = uuidv4();
  const response = await axios.get(
    `https://zoom-clone-service-7360-dev.twil.io/token-service?identity=${randomId}${identity}`
  );

  const data = response.data;
  if (data.accessToken) setAccessToken(data.accessToken);
};

export const connectToRoom = async (
  accessToken,
  roomId = "test-room",
  setRoom
) => {
  const onlyWithAudio = store.getState().connectionOnlyWithAudio;

  const constraints = onlyWithAudio ? audioConstraints : videoConstraints;

  await navigator.mediaDevices
    .getUserMedia(constraints)
    .then(async (stream) => {
      let tracks;
      const audioTrack = new LocalAudioTrack(stream.getAudioTracks()[0]);
      const dataTrack = new LocalDataTrack();
      dataChannel = dataTrack;
      let videoTrack;
      if (!onlyWithAudio) {
        videoTrack = new LocalVideoTrack(stream.getVideoTracks()[0]);
        tracks = [audioTrack, videoTrack, dataTrack];
      } else {
        tracks = [audioTrack, dataTrack];
      }

      const room = await connect(accessToken, {
        name: roomId,
        tracks,
      });

      setRoom(room);
      store.dispatch(setShowOverlay(false));
    })
    .catch((err) => {
      console.log(
        "Error occured when trying to get an access to local devices"
      );
      console.log(err);
    });
};

export const checkIfRoomExists = async (roomId) => {
  const response = await axios.get(
    `https://zoom-clone-service-7360-dev.twil.io/room-exists?roomId=${roomId}`
  );

  return response.data.roomExists;
};

export const sendMessageUsingDataChannel = (
  content,
  messageCreatedByMe = false
) => {
  const identity = store.getState().identity;
  const ownMessage = {
    identity,
    content,
    messageCreatedByMe,
  };
 
  addMessageToMessager(ownMessage);

  const messageToSent = {
    identity, 
    content
  }
  
  const stringifiedMessage = JSON.stringify(messageToSent);
  
  dataChannel.send(stringifiedMessage);


};

export const addMessageToMessager = (message) => {
  const messages = [...store.getState().messages];

  messages.push(message);
  store.dispatch(setMessages(messages));
};
