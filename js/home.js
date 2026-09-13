let current_user = JSON.parse(localStorage.getItem("currentUser"))
document.getElementById("username").textContent = current_user.username;


let moods = [
    "happy",
    "sad"
]

let moodContainer = document.getElementById("moodContainer"); 

for (let mood of moods){
    let card = document.createElement("div");

    card.classList.add("mood-card");

    // warna background yg berbeda untuk mood yg berbeda
    if (mood === "happy"){
        card.classList.add("happy")
    } else if (mood === "sad"){
        card.classList.add("sad")
    }

    card.innerHTML = `
        <h2>${mood}</h2>
        <button>Recommend Song</button>
    `;

    let button = card.querySelector("button"); 
    button.addEventListener("click", function() {
        localStorage.setItem("selectedMood", mood)
        window.location.href = "recommendation.html"
    })

    moodContainer.appendChild(card)
}

// user logout 
document.getElementById("logout").addEventListener("click", function(){
    localStorage.removeItem("currentUser"); 
    alert("Anda telah mengakhiri sesi ini")
    window.location.href = "login-regis.html"
})