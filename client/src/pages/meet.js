import React, { useEffect, useState, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import {
  BsFillCameraVideoOffFill,
  BsFillMicMuteFill,
  BsFillMicFill,
  BsFillCameraVideoFill,
} from "react-icons/bs";
import { MdExitToApp } from "react-icons/md";
import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";
import axios from "axios";
import QRCode from "qrcode";
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
  const [base64, setBase64] = useState(null);
  const handleQR = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/age/generate-proof?age=20"
      );
      const img = await QRCode.toDataURL(JSON.stringify(response.data));
      console.log(img);
      setBase64(img);
    } catch (err) {}
  };
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

  useEffect(() => {
    initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
  }, []);

  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });

  return (
    <div className="w-[100vw]">
      {leaveRoom.isCallable ? (
        <h1 className="my-5 text-center w-full mt-50 text-[40px] gradient ">
          Room
        </h1>
      ) : (
        <h1 className="my-5 text-center w-full mt-50 text-[40px] gradient ">
          Lobby
        </h1>
      )}
      <div className="">
        <br />
        {leaveRoom.isCallable && (
          <>
            {" "}
            <div className="flex w-[300px] mx-auto">
              <div className="flex gap-4 mx-auto w-[50px] flex-wrap">
                {produceAudio.isCallable ? (
                  <button
                    className="flex px-2 py-1 items-center"
                    // disabled={!produceAudio.isCallable}
                    onClick={() => produceAudio(micStream)}
                  >
                    <BsFillMicFill className="mx-2" /> Unmute
                  </button>
                ) : (
                  <button
                    className="flex px-2 py-1 items-center"
                    // disabled={!stopProducingAudio.isCallable}
                    onClick={() => stopProducingAudio()}
                  >
                    <BsFillMicMuteFill className="mx-2" /> Mute
                  </button>
                )}

                {/* <Button disabled={!leaveRoom.isCallable} onClick={leaveRoom}>
                LEAVE_ROOM
              </Button> */}
              </div>
              <div>
                {" "}
                {produceVideo.isCallable ? (
                  <button
                    className="flex px-2 py-1 items-center"
                    // disabled={!produceVideo.isCallable}
                    onClick={() => produceVideo(camStream)}
                  >
                    <BsFillCameraVideoFill className="mx-2" /> Turn On Cam
                  </button>
                ) : (
                  <button
                    className="flex px-2 py-1 items-center"
                    // disabled={!stopProducingVideo.isCallable}
                    onClick={() => stopProducingVideo()}
                  >
                    <BsFillCameraVideoOffFill className="mx-2" /> Turn Cam Off
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        {!produceVideo.isCallable ? (
          <video
            className=" h-[200px] mx-auto border-purple-600 rounded border-2 w-fit hidden  bg-slate-700"
            ref={videoRef}
            autoPlay
            muted
          />
        ) : null}
        {joinLobby.isCallable && (
          <button
            className="rounded-full flex  items-center  justify-center px-4 py-2 mt-2 bg-indigo-800  border-indigo-500 text-white  cursor-pointer disabled:hidden mx-auto"
            disabled={!joinLobby.isCallable}
            onClick={() => {
              joinLobby("rrz-zamc-ppe");
            }}
          >
            <AiOutlinePlus className="mr-2 font-bold" /> Join Lobby
          </button>
        )}
        <div className="flex  justify-center items-center gap-4 flex-wrap w-[600px] mx-auto">
          <button
            className="rounded-full flex  items-center  justify-center px-4 py-2 mt-2 bg-indigo-800  border-indigo-500 text-white  cursor-pointer disabled:hidden mx-auto"
            disabled={!fetchVideoStream.isCallable}
            onClick={fetchVideoStream}
          >
            <BsFillCameraVideoFill className="mx-2 " /> video access
          </button>

          <button
            className="rounded-full flex  items-center  justify-center px-4 py-2 mt-2 bg-indigo-800  border-indigo-500 text-white  cursor-pointer disabled:hidden mx-auto"
            disabled={!fetchAudioStream.isCallable}
            onClick={fetchAudioStream}
          >
            <BsFillMicFill className="mx-2 " /> audio access
          </button>

          <button
            className="rounded-full flex  items-center  justify-center px-4 py-2 mt-2 bg-indigo-800  border-indigo-500 text-white  cursor-pointer disabled:hidden mx-auto"
            disabled={!joinRoom.isCallable}
            onClick={joinRoom}
          >
            <span className="font-bold text-[20px] mx-2"> +</span> Join Room
          </button>

          <button
            className="rounded-full flex  items-center  justify-center px-4 py-2 mt-2 bg-indigo-800  border-indigo-500 text-white  cursor-pointer disabled:hidden mx-auto"
            disabled={!state.matches("Initialized.JoinedLobby")}
            onClick={() => send("LEAVE_LOBBY")}
          >
            Leave Lobby <MdExitToApp className="mx-2" />
          </button>
        </div>

        <div className="h-80 aspect-video mt-10 border border-indigo-600 mx-auto  bg-zinc-800/50 rounded-2xl relative overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="flex flex-wrap w-full justify-center mt-[10vh] my-10">
          <div className="h-80 text-hidde aspect-video mt-10  mx-auto  rounded-2xl relative overflow-hidden w-[300px]">
            {Object.values(peers)
              .filter((peer) => peer.cam)
              .map((peer) => (
                <>
                  {" "}
                  <Video
                    className="object-contain absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    key={peer.peerId}
                    peerId={peer.peerId}
                    track={peer.cam}
                    debug
                  />
                </>
              ))}

            {Object.values(peers)
              .filter((peer) => peer.mic)
              .map((peer) => (
                <Audio
                  key={peer.peerId}
                  peerId={peer.peerId}
                  track={peer.mic}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="rounded-md px-[300px]">
        {leaveRoom.isCallable && (
          <button
            onClick={handleQR}
            className={
              "px-4  mx-auto mb-2 py-2 text-white rounded-lg font-bold bg-indigo-800"
            }
          >
            Generate Proof of Attendance
          </button>
        )}

        {base64 && <img className=" mx-auto mt-10" src={base64} />}
      </div>
    </div>
  );
}
