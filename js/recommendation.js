// =========================
// DATA LAGU DUMMY
// =========================

const songs = [
    {
        id: 1,
        title: "Good Days",
        artist: "SZA",
        mood: "happy",
        genre: "Pop",
        cover: "🌅",
        description:
            "A smooth song for a positive and relaxing mood.",
        youtubeUrl:
            "https://www.youtube.com/watch?v=cWrSjCZ5AeE"
    },

    {
        id: 2,
        title: "Sunflower",
        artist: "Post Malone",
        mood: "happy",
        genre: "Pop",
        cover: "🌻",
        description:
            "A bright and uplifting song for your day.",
        youtubeUrl:
            "https://www.youtube.com/watch?v=ApXoWvfEYVU"
    },

    {
        id: 3,
        title: "Lovely",
        artist: "Billie Eilish",
        mood: "sad",
        genre: "Pop",
        cover: "🌙",
        description:
            "A calm song for a more emotional mood.",
        youtubeUrl:
            "https://www.youtube.com/watch?v=V1Pl8CzNzCw"
    },

    {
        id: 4,
        title: "Evaluasi",
        artist: "Hindia",
        mood: "sad",
        genre: "Indie",
        cover: "🌄",
        description:
            "A reflective song from Hindia.",
        youtubeUrl:
            "https://www.youtube.com/watch?v=..."
    },

    {
        id: 5,
        title: "Better Together",
        artist: "Jack Johnson",
        mood: "relaxed",
        genre: "Acoustic",
        cover: "☀️",
        description:
            "A warm acoustic song for a relaxed mood.",
        youtubeUrl:
            "https://www.youtube.com/watch?v=u57d4_b_YgI"
    }
];


// =========================
// AMBIL MOOD USER
// =========================

let selectedMood =
    localStorage.getItem("selectedMood");

if (!selectedMood) {
    selectedMood = "happy";
}

selectedMood = selectedMood.toLowerCase();

// =========================
// ELEMENT HTML
// =========================

const moodName =
    document.getElementById("moodName");

const songContainer =
    document.getElementById("songContainer");

const songDetail =
    document.getElementById("songDetail");

const closeDetail =
    document.getElementById("closeDetail");

const detailCover =
    document.getElementById("detailCover");

const detailTitle =
    document.getElementById("detailTitle");

const detailArtist =
    document.getElementById("detailArtist");

const detailMood =
    document.getElementById("detailMood");

const detailGenre =
    document.getElementById("detailGenre");

const detailDescription =
    document.getElementById("detailDescription");

const playButton =
    document.getElementById("playButton");


// =========================
// LAGU YANG DIPILIH
// =========================

let selectedSong = null;


// =========================
// TAMPILKAN NAMA MOOD
// =========================

moodName.textContent =
    capitalize(selectedMood);


// =========================
// FILTER LAGU
// =========================

const recommendedSongs =
    songs.filter(function(song) {

        return song.mood === selectedMood;

    });


// =========================
// TAMPILKAN SONG CARD
// =========================

recommendedSongs.forEach(function(song) {

    const card =
        document.createElement("div");

    card.classList.add("song-card");


    card.innerHTML = `

        <div class="song-cover">
            ${song.cover}
        </div>

        <div class="song-info">

            <h3>
                ${song.title}
            </h3>

            <p>
                ${song.artist}
            </p>

            <div class="song-actions">

                <button
                    class="card-play"
                    data-id="${song.id}"
                >
                    ▶
                </button>

                <button
                    class="card-detail"
                    data-id="${song.id}"
                >
                    View details →
                </button>

            </div>

        </div>

    `;


    songContainer.appendChild(card);

});


// =========================
// EVENT PLAY DARI CARD
// =========================

const playButtons =
    document.querySelectorAll(".card-play");


playButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const songId =
                Number(button.dataset.id);

            const song =
                songs.find(function(song) {

                    return song.id === songId;

                });

            openYouTube(song);

        }
    );

});


// =========================
// EVENT DETAIL
// =========================

const detailButtons =
    document.querySelectorAll(".card-detail");


detailButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const songId =
                Number(button.dataset.id);

            selectedSong =
                songs.find(function(song) {

                    return song.id === songId;

                });


            showSongDetail(selectedSong);

        }
    );

});


// =========================
// TAMPILKAN DETAIL LAGU
// =========================

function showSongDetail(song) {

    detailCover.textContent =
        song.cover;

    detailTitle.textContent =
        song.title;

    detailArtist.textContent =
        song.artist;

    detailMood.textContent =
        song.mood;

    detailGenre.textContent =
        song.genre;

    detailDescription.textContent =
        song.description;


    songDetail.classList.remove("hidden");


    songDetail.scrollIntoView({
        behavior: "smooth"
    });

}


// =========================
// BUTTON PLAY SONG
// =========================

playButton.addEventListener(
    "click",
    function() {

        if (!selectedSong) {
            return;
        }

        openYouTube(selectedSong);

    }
);


// =========================
// CLOSE DETAIL
// =========================

closeDetail.addEventListener(
    "click",
    function() {

        songDetail.classList.add("hidden");

    }
);


// =========================
// YOUTUBE MODAL
// =========================

const youtubeModal =
    document.getElementById("youtubeModal");

const youtubeFrame =
    document.getElementById("youtubeFrame");

const closeModal =
    document.getElementById("closeModal");


// =========================
// OPEN YOUTUBE
// =========================

function openYouTube(song) {

    const videoId =
        getYouTubeId(song.youtubeUrl);


    if (!videoId) {

        alert(
            "YouTube URL lagu belum tersedia."
        );

        return;
    }


    youtubeFrame.src =
         `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;


    youtubeModal.classList.remove("hidden");

}


// =========================
// CLOSE YOUTUBE
// =========================

closeModal.addEventListener(
    "click",
    function() {

        youtubeModal.classList.add("hidden");

        // Stop video ketika popup ditutup
        youtubeFrame.src = "";

    }
);


// =========================
// CLOSE SAAT KLIK BACKGROUND
// =========================

document
    .querySelector(".modal-background")
    .addEventListener(
        "click",
        function() {

            youtubeModal.classList.add("hidden");

            youtubeFrame.src = "";

        }
    );


// =========================
// AMBIL VIDEO ID YOUTUBE
// =========================

function getYouTubeId(url) {

    if (!url) {
        return null;
    }


    // Format:
    // https://www.youtube.com/watch?v=XXXXXXXX

    if (url.includes("watch?v=")) {

        return url.split("watch?v=")[1]
            .split("&")[0];

    }


    // Format:
    // https://youtu.be/XXXXXXXX

    if (url.includes("youtu.be/")) {

        return url.split("youtu.be/")[1]
            .split("?")[0];

    }


    return null;

}


// =========================
// CAPITALIZE
// =========================

function capitalize(text) {

    return text
        .charAt(0)
        .toUpperCase()
        + text.slice(1);

}