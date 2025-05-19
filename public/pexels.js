const API_KEY = "j9j04cv861PfKGJDiRCoUsyfk6GPA6xiYeRhHsYh7WWoOHqfn0EsSGWc";
const HERO_VIDEO_CONTAINER = document.getElementById("hero-video");

let currentIndex = 0;
let videoElements = [];

function loadVideos() {
  fetch("https://api.pexels.com/videos/search?query=football&per_page=15", {
    headers: { Authorization: API_KEY },
  })
    .then((res) => res.json())
    .then((data) => {
      const longVideos = data.videos.filter((v) => v.duration >= 20);
      if (!longVideos.length) throw new Error("No long videos found.");

      videoElements = longVideos.map((v) => {
        const file =
          v.video_files.find((f) => f.height >= 720 && f.height <= 1080) ||
          v.video_files[0];

        return file.link;
      });

      playNextVideo();
      setInterval(playNextVideo, 10000);
    })
    .catch((err) => {
      console.error("Video fetch failed:", err);
      HERO_VIDEO_CONTAINER.style.background = "#2c3e50";
    });
}

function playNextVideo() {
  if (!videoElements.length) return;

  const randomIndex = Math.floor(Math.random() * videoElements.length);
  const videoUrl = videoElements[randomIndex];

  HERO_VIDEO_CONTAINER.innerHTML = "";

  const video = document.createElement("video");
  video.src = videoUrl;
  video.autoplay = true;
  video.muted = true;
  video.loop = false;
  video.playsInline = true;
  video.classList.add("hero-background-video");

  video.addEventListener("canplay", () => {
    video.classList.add("loaded");
  });

  HERO_VIDEO_CONTAINER.appendChild(video);
}

loadVideos();
