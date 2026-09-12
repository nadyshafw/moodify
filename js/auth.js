const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");


// LOGIN → REGISTER

showRegister.addEventListener("click", function () {
    loginForm.classList.add("d-none");
    registerForm.classList.remove("d-none");
});



// REGISTER → LOGIN

showLogin.addEventListener("click", function () {
    registerForm.classList.add("d-none");
    loginForm.classList.remove("d-none");
});



// REGISTER


document.getElementById("register").addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;



    if (password !== confirmPassword) {
        alert("Password tidak sama!");
        return;
    }


    const users = JSON.parse(localStorage.getItem("users")) || [];


    // Cek username
    const existingUser = users.find(function (user) {
        return user.username === username;
    });

    if (existingUser) {
        alert("Username sudah digunakan!");
        return;
    }


    // Buat user baru
    const newUser = {
        username: username,
        email: email,
        password: password
    };


    users.push(newUser);



    localStorage.setItem("users", JSON.stringify(users));


    alert("Register berhasil!");



    registerForm.classList.add("d-none");
    loginForm.classList.remove("d-none");



    document.getElementById("register").reset();

});



// LOGIN


document.getElementById("login").addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;


    const users = JSON.parse(localStorage.getItem("users")) || [];



    const user = users.find(function (user) {

        return user.username === username &&
               user.password === password;

    });


    if (user) {

        alert("Login berhasil! Selamat datang " + user.username);

    } else {

        alert("Username atau password salah!");

    }

});

