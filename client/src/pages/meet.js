import React, { useEffect, useRef } from "react";

import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";


import {
  useAudio,
  useLobby,
  useMeetingMachine,
  usePeers,
  useRoom,
  useVideo,
} from "@huddle01/react/hooks";

import Button from "../components/Button";

export default function Meet() {
  const videoRef = useRef(null);

  const { state, send } = useMeetingMachine();
  // Event Listner
  useEventListener("lobby:cam-on", () => {
    if (state.context.camStream && videoRef.current)
      videoRef.current.srcObject = state.context.camStream;
  });

  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();
  const {
    fetchAudioStream,
    produceAudio,
    stopAudioStream,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();
  const {
    fetchVideoStream,
    produceVideo,
    stopVideoStream,
    stopProducingVideo,
    stream: camStream,
  } = useVideo();
  const { joinRoom, leaveRoom } = useRoom();
  const { peers } = usePeers();

  useEffect(()=>{
    initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR")
  },[])


  return (
    <div className="grid grid-cols-2">
      <div>
        

        <h2 className="text-2xl">Room State</h2>
        <h3>{JSON.stringify(state.value)}</h3>

        <h2 className="text-2xl">Me Id</h2>
        <div className="break-words">
          {JSON.stringify(state.context.peerId)}
        </div>
        <h2 className="text-2xl">Consumers</h2>
        <div className="break-words">
          {JSON.stringify(state.context.consumers)}
        </div>

        <h2 className="text-2xl">Error</h2>
        <div className="break-words text-red-500">
          {JSON.stringify(state.context.error)}
        </div>
        <h2 className="text-2xl">Peers</h2>
        <div className="break-words">{JSON.stringify(peers)}</div>
        <h2 className="text-2xl">Consumers</h2>
        <div className="break-words">
          {JSON.stringify(state.context.consumers)}
        </div>

        <h2 className="text-3xl text-blue-500 font-extrabold">Idle</h2>
      

        <br />
        <br />
        <h2 className="text-3xl text-red-500 font-extrabold">Initialized</h2>
        <Button
          disabled={!joinLobby.isCallable}
          onClick={() => {
            joinLobby("rrz-zamc-ppe");
          }}
        >
          JOIN_LOBBY
        </Button>
        <br />
        <br />
        <h2 className="text-3xl text-yellow-500 font-extrabold">Lobby</h2>
        <div className="flex gap-4 flex-wrap">
          <Button
            disabled={!fetchVideoStream.isCallable}
            onClick={fetchVideoStream}
          >
            FETCH_VIDEO_STREAM
          </Button>

          <Button
            disabled={!fetchAudioStream.isCallable}
            onClick={fetchAudioStream}
          >
            FETCH_AUDIO_STREAM
          </Button>

          <Button disabled={!joinRoom.isCallable} onClick={joinRoom}>
            JOIN_ROOM
          </Button>

          <Button
            disabled={!state.matches("Initialized.JoinedLobby")}
            onClick={() => send("LEAVE_LOBBY")}
          >
            LEAVE_LOBBY
          </Button>

          <Button
            disabled={!stopVideoStream.isCallable}
            onClick={stopVideoStream}
          >
            STOP_VIDEO_STREAM
          </Button>
          <Button
            disabled={!stopAudioStream.isCallable}
            onClick={stopAudioStream}
          >
            STOP_AUDIO_STREAM
          </Button>
        </div>
        <br />
        <h2 className="text-3xl text-green-600 font-extrabold">Room</h2>
        <div className="flex gap-4 flex-wrap">
          <Button
            disabled={!produceAudio.isCallable}
            onClick={() => produceAudio(micStream)}
          >
            PRODUCE_MIC
          </Button>

          <Button
            disabled={!produceVideo.isCallable}
            onClick={() => produceVideo(camStream)}
          >
            PRODUCE_CAM
          </Button>

          <Button
            disabled={!stopProducingAudio.isCallable}
            onClick={() => stopProducingAudio()}
          >
            STOP_PRODUCING_MIC
          </Button>

          <Button
            disabled={!stopProducingVideo.isCallable}
            onClick={() => stopProducingVideo()}
          >
            STOP_PRODUCING_CAM
          </Button>

          <Button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
            LEAVE_ROOM
          </Button>

          
        </div>

        {/* Uncomment to see the Xstate Inspector */}
        {/* <Inspect /> */}
      </div>
      <div>
        Me Video:
        <video ref={videoRef} autoPlay muted></video>
        <div className="grid grid-cols-4">
          {Object.values(peers)
            .filter((peer) => peer.cam)
            .map((peer) => (
              <Video
                key={peer.peerId}
                peerId={peer.peerId}
                track={peer.cam}
                debug
              />
            ))}
          {Object.values(peers)
            .filter((peer) => peer.mic)
            .map((peer) => (
              <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
            ))}
        </div>
      </div>
    </div>
  );
}