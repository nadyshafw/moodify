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
// YOUTUBE MODAL ELEMENT
// =========================

const youtubeModal =
    document.getElementById("youtubeModal");

const youtubeFrame =
    document.getElementById("youtubeFrame");

const closeModal =
    document.getElementById("closeModal");


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
// AMBIL DATA LAGU
// =========================

const songXHR = new XMLHttpRequest();

songXHR.open("GET", "data/song.json", true);

songXHR.onload = function () {

    console.log("Status:", songXHR.status);
    console.log("Response:", songXHR.responseText);

    if (songXHR.status === 200) {

        let songs;

        try {

            songs =
                JSON.parse(songXHR.responseText);

        } catch (error) {

            console.error(
                "JSON tidak valid:",
                error
            );

            songContainer.innerHTML = `
                <p class="no-song">
                    Data lagu tidak valid.
                </p>
            `;

            return;
        }


        // =========================
        // FILTER LAGU BERDASARKAN MOOD
        // =========================

        const recommendedSongs =
            songs.filter(function (song) {

                return song.mood.toLowerCase()
                    === selectedMood;

            });


        // =========================
        // JIKA TIDAK ADA LAGU
        // =========================

        if (recommendedSongs.length === 0) {

            songContainer.innerHTML = `
                <p class="no-song">
                    No songs found for this mood.
                </p>
            `;

            return;
        }


        // =========================
        // TAMPILKAN SONG CARD
        // =========================

        recommendedSongs.forEach(function (song) {

            const card =
                document.createElement("div");

            card.classList.add("song-card");


            card.innerHTML = `

                <div class="song-cover">
                    ${song.cover}
                </div>

                <div class="song-info">

                    <div class="song-title-row">

                        <h3>
                            ${song.title}
                        </h3>

                        <button
                            class="favorite-button"
                            data-id="${song.id}"
                        >
                            ♡
                        </button>

                    </div>

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
        // EVENT FAVORITE
        // =========================

        const favoriteButtons =
            document.querySelectorAll(
                ".favorite-button"
            );

        favoriteButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const songId =
                        Number(button.dataset.id);

                    const song =
                        songs.find(function (song) {

                            return song.id === songId;

                        });

                    if (song) {

                        toggleFavorite(
                            song,
                            button
                        );

                    }

                }
            );

        });


        // =========================
        // TOGGLE FAVORITE
        // =========================

        function toggleFavorite(song, button) {

            let favorites =
                JSON.parse(
                    localStorage.getItem("favorites")
                ) || [];


            const existingSong =
                favorites.find(function (favorite) {

                    return favorite.id === song.id;

                });


            if (existingSong) {

                let newFavorites = [];

                for (const favorite of favorites) {

                    if (favorite.id !== song.id) {

                        newFavorites.push(favorite);

                    }

                }

                favorites = newFavorites;

                button.textContent = "♡";

            } else {

                favorites.push(song);

                button.textContent = "♥";

            }


            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

        }


        // =========================
        // CEK FAVORITE
        // =========================

        function updateFavoriteButtons() {

            let favorites =
                JSON.parse(
                    localStorage.getItem("favorites")
                ) || [];


            const favoriteButtons =
                document.querySelectorAll(
                    ".favorite-button"
                );


            favoriteButtons.forEach(function (button) {

                const songId =
                    Number(button.dataset.id);


                const isFavorite =
                    favorites.some(function (song) {

                        return song.id === songId;

                    });


                if (isFavorite) {

                    button.textContent = "♥";

                } else {

                    button.textContent = "♡";

                }

            });

        }

        updateFavoriteButtons();


        // =========================
        // EVENT PLAY
        // =========================

        const playButtons =
            document.querySelectorAll(".card-play");


        playButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const songId =
                        Number(button.dataset.id);


                    const song =
                        songs.find(function (song) {

                            return song.id === songId;

                        });


                    if (song) {

                        openYouTube(song);

                    }

                }
            );

        });


        // =========================
        // EVENT DETAIL
        // =========================

        const detailButtons =
            document.querySelectorAll(".card-detail");


        detailButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const songId =
                        Number(button.dataset.id);


                    selectedSong =
                        songs.find(function (song) {

                            return song.id === songId;

                        });


                    if (selectedSong) {

                        showSongDetail(
                            selectedSong
                        );

                    }

                }
            );

        });

    } else {

        console.error(
            "Gagal mengambil song.json. Status:",
            songXHR.status
        );

        songContainer.innerHTML = `
            <p class="no-song">
                Failed to load songs.
            </p>
        `;

    }

};


// =========================
// ERROR REQUEST
// =========================

songXHR.onerror = function () {

    console.error(
        "XMLHttpRequest gagal."
    );

    songContainer.innerHTML = `
        <p class="no-song">
            Failed to load songs.
        </p>
    `;

};


// Jalankan request
songXHR.send();


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
    function () {

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
    function () {

        songDetail.classList.add("hidden");

    }
);


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
    function () {

        youtubeModal.classList.add("hidden");

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
        function () {

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


    if (url.includes("watch?v=")) {

        return url
            .split("watch?v=")[1]
            .split("&")[0];

    }


    if (url.includes("youtu.be/")) {

        return url
            .split("youtu.be/")[1]
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