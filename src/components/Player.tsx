import React from "react";
import videojs from "video.js";
// @ts-ignore
import eme from "videojs-contrib-eme";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";

const registerPlugin = videojs.registerPlugin;

registerPlugin("eme1", eme);

interface EME extends Player {
  eme1: Function;
}

export function VideoJS(props: any) {
  const videoRef = React.useRef<any>(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);
      // let options1;
      // videojs.Vhs.xhr.beforeRequest = function (options, callback) {
      //   /*
      //    * Modifications to requests that will affect every player.
      //    */
      //   options1 = options;
      //   return options;
      // };
      const player = videojs(
        videoElement,
        { autoplay: true, controls: true, responsive: true, fluid: true },
        () => {
          videojs.log("player is ready");
          onReady && onReady(player);
        }
      ) as EME;
  
      playerRef.current = player;
      player.eme1();

      player.src(options);
    } else {
      const player = playerRef.current;
      player.eme1();
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default VideoJS;
