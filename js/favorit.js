let favoriteSongs = JSON.parse(localStorage.getItem("favorites"))
// NAMA KEY Local Storage = "favorites"

if(!favoriteSongs) {
    favoriteSongs = []
}

// favoriteSongs = data lagu yang sudah difavoritkan

// CARD SONGS
let songContainer = document.getElementById("songContainer")
fetch("../data/song.json") 
.then(Response => Response.json())
.then(data => {
    let favorite = favoriteSongs
    favorite.forEach(song => {
        let card = document.createElement("div")
        card.className = "song-card"
        // div (class="song-card")
        card.innerHTML = `
            <div class="song-cover">
                ${song.cover}
            </div>

            <div class="song-info">
                <div class="song-title-row">
                    <h3>${song.title}</h3>
                    
                    <button
                        class="card-delete"
                        data-id="${song.id}"
                    >
                        🗑️
                    </button>
                </div>

                <p>${song.artist}</p>

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
            
        `
        // pakai tag <h3> HTML untuk judul
        // song.title = judul lagu dari song.json
        songContainer.appendChild(card)
    })

    // PLAY
    const playButtons = document.querySelectorAll(".card-play")
    playButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const songId = Number(button.dataset.id)

            const song = favorite.find(function(song) {
                return song.id === songId
            })

            if (song) {
                console.log(song.title)
                console.log(song.youtubeUrl)
                openYouTube(song)
                
            }
        })
    })

    // DELETEE
    const deleteButtons = document.querySelectorAll(".card-delete")
    deleteButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const songId = Number(button.dataset.id)

            favoriteSongs = favoriteSongs.filter(function(song) {
                return song.id !== songId
            })

            localStorage.setItem("favorites", JSON.stringify(favoriteSongs))

            button.closest(".song-card").remove()
        }) 
    })

    // VIEW DETAILS
    const detailButtons = document.querySelectorAll(".card-detail")
    detailButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const songId = Number(button.dataset.id)

            const song = favorite.find(function(song) {
                    return song.id === songId
                })

            if (song) {
                document.getElementById("detailCover").textContent = song.cover
                document.getElementById("detailTitle").textContent = song.title
                document.getElementById("detailArtist").textContent = song.artist
                document.getElementById("detailMood").textContent = song.mood
                document.getElementById("detailGenre").textContent = song.genre
                document.getElementById("detailDescription").textContent = song.description
                document.getElementById("songDetail").classList.remove("hidden")
            }
        })
    })

    // BACK - VIEW DETAILS
    const closeDetail = document.getElementById("closeDetail")
    closeDetail.addEventListener("click", function() {
        document.getElementById("songDetail").classList.add("hidden")
    })

    // PLAY - VIEW DETAILS
    const playButton = document.getElementById("playButton")
    playButton.addEventListener("click", function() {
        const title = document.getElementById("detailTitle").textContent

        const song = favorite.find(function(song) {
            return song.title === title
        })

        if (song) {
            openYouTube(song)
        }
    })
})


// OPEN YTB
function openYouTube(song) {
    const videoId = getYouTubeId(song.youtubeUrl)
    document.getElementById("youtubeFrame").src =
        `https://www.youtube.com/embed/${videoId}?autoplay=1`

    document.getElementById("youtubeModal").classList.remove("hidden")
}

function getYouTubeId(url) {
    if (url.includes("watch?v=")) {
        return url.split("watch?v=")[1]
    }

    if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1]
    }
}

const closeModal = document.getElementById("closeModal")
closeModal.addEventListener("click", function() {
    document.getElementById("youtubeModal").classList.add("hidden")
    document.getElementById("youtubeFrame").src = ""
})

const modalBackground = document.querySelector(".modal-background")
modalBackground.addEventListener("click", function() {
    document.getElementById("youtubeModal").classList.add("hidden")
    document.getElementById("youtubeFrame").src = ""
})

