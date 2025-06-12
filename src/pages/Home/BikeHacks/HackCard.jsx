import YouTube from "react-youtube";

const videoOnReady = (event) => {
  event.target.pauseVideo();
};

const HackCard = ({ videoId, videoTitle }) => {
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="group h-full mx-5">
      <div className="group-hover:scale-90 lg:w-[300px] duration-100 rounded-lg p-2 h-full bg-base-100">
        <YouTube
          className="w-full duration-200"
          videoId={videoId}
          opts={opts}
          onReady={videoOnReady}
        />
        <div className="group-hover:scale-[0.95] group-hover:left-2 mt-3 duration-100 description text-white w-3/4">
          <p className="text-base-content text-sm">{videoTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default HackCard;
