const VideoSection = ({ videoUrl }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

      <video
        src={videoUrl}
        controls
        className="w-full h-full object-cover"
      />

    </div>
  );
};

export default VideoSection;