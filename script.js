const fileInput = document.getElementById('fileInput');
const audioPlayer = document.getElementById('audioPlayer');
const playlistEl = document.getElementById('playlist');

let trackList = [];

fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach((file) => {
        // Create a local blob URL for the audio file
        const fileURL = URL.createObjectURL(file);
        trackList.push({ name: file.name, url: fileURL });
        
        // Create a list item for the playlist
        const li = document.createElement('li');
        li.textContent = file.name;
        li.addEventListener('click', () => {
            playTrack(trackList.length - files.length + trackList.indexOf(trackList.find(t => t.url === fileURL)));
        });
        playlistEl.appendChild(li);
    });

    if (trackList.length > 0 && !audioPlayer.src) {
        loadTrack(0);
    }
});

function loadTrack(index) {
    audioPlayer.src = trackList[index].url;
    audioPlayer.play();
}

// Optional: Automatically play the next track when one ends
audioPlayer.addEventListener('ended', () => {
    let currentIndex = trackList.findIndex(t => t.url === audioPlayer.src);
    if (currentIndex < trackList.length - 1) {
        loadTrack(currentIndex + 1);
    }
});