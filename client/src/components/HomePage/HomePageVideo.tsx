"use client";

const HomePageVideo = () => {
  return (
    <main className="relative w-[85%]">
      {/* Video */}
      <video
        src="/intro-video.mp4"
        autoPlay
        muted
        playsInline
        loop
        className="w-full h-auto rounded-md filter brightness-75"
      />
    </main>
  );
};

export default HomePageVideo;
