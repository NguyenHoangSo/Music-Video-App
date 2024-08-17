const image = document.getElementById("cover");
const title = document.getElementById("title-music");
const artist = document.getElementById("artist-music"),
    playerProgress = document.getElementById("player-progress"),
    progress = document.getElementById("progress"),
    musicDuration = document.getElementsByClassName("music-duration"),
    currentTimeEl = document.getElementById("current-time"),
    durationEl = document.getElementById("duration");
(playerControll = document.getElementById("player-controll")),
    (prevBtn = document.getElementById("prev")),
    (playBtn = document.getElementById("play")),
    (nextBtn = document.getElementById("next")),
    (background = document.getElementById("next"));
    console.log(progress);
    console.log(playerProgress);
const music = new Audio();
const songs = [
    {
        path: "assests/giacmocothat.mp3",
        nameSong: "Giấc mơ có thật",
        cover: "assests/lequyen.jpg",
        artist: "Lệ Quyên",
    },
    {
        path: "assests/mua.mp3",
        nameSong: "Mưa",
        cover: "assests/thuychi.jpg",
        artist: "Thùy Chi",
    },
    {
        path: "assests/thangtulaloinoidoicuaem.mp3",
        nameSong: "Tháng tư là lời nói dối của em",
        cover: "assests/haanhtuan.jpg",
        artist: "Hà Anh Tuấn",
    },
    {
        path: "assests/xindunglangim.mp3",
        nameSong: "Xin đừng lặng im",
        cover: "assests/soobin.jpg",
        artist: "Soobin Hoàng Sơn",
    },
    {
        path: "assests/noinaycoanh.mp3",
        nameSong: "Nơi này có anh",
        artist: "Sơn Tùng MTP",
        cover: "assests/mtp.jpg",
    }
];
let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    //doi sang giu
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}
function pauseMusic() {
    isPlaying = false;
    //doi sang choi nhac
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}
function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.nameSong;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}
function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}
function updateProgressBar(params) {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}
function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}
playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);

loadMusic(songs[musicIndex]);
