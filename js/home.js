let current_user = JSON.parse(localStorage.getItem("currentUser"))
document.getElementById("username").textContent = current_user.username;



let moods = [
    "happy",
    "sad"
]

let moodContainer = document.getElementById("moodContainer"); 

for (let mood of moods) {

    let card = document.createElement("div");

    card.classList.add("mood-card");

    if (mood === "happy") {
        card.classList.add("happy");
    } else if (mood === "sad") {
        card.classList.add("sad");
    }

    let emoji = "";

    if (mood === "happy") {
        emoji = "";
    } else if (mood === "sad") {
        emoji = "";
    }

    card.innerHTML = `
        <div class="mood-emoji">${emoji}</div>
        <h2>${mood}</h2>
    `;

    card.addEventListener("click", function() {
        localStorage.setItem("selectedMood", mood);
        window.location.href = "recommendation.html";
    });

    moodContainer.appendChild(card);
}

