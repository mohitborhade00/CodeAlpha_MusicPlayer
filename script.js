const songs = [
    {
        title: "lofi Beat",
        artist: "Mohit Borhade",
        src: "songs/lofi beat.mp3"
    },
    {
        title: "mountain",
        artist: "Arijit singh",
        src: "songs/mountain.mp3"
    }
    
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");

let currentSong = 0;

// Load Song
function loadSong(index) {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
}

loadSong(currentSong);

// Play / Pause
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});

// Next
nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audio.play();
});

// Previous
prevBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audio.play();
});

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Format Time
function formatTime(time) {
    if (!time) return "0:00";
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Autoplay next song
audio.addEventListener("ended", () => {
    nextBtn.click();
});

// Create Playlist
songs.forEach((song, index) => {
    let li = document.createElement("li");
    li.textContent = song.title + " - " + song.artist;
    li.addEventListener("click", () => {
        currentSong = index;
        loadSong(currentSong);
        audio.play();
    });
    playlist.appendChild(li);
});
