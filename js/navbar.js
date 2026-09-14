fetch("components/navbar.html")
    .then(function(response) {
        return response.text();
    })

    .then(function(data) {

        document.getElementById("navbar").innerHTML = data;


        // LOGOUT

        document
            .getElementById("logout")
            .addEventListener("click", function() {

                localStorage.removeItem("currentUser");

                alert("Anda telah mengakhiri sesi ini");

                window.location.href = "login-regis.html";

            });

    });