const xhr = new XMLHttpRequest();

xhr.open("GET", "components/navbar.html");

xhr.onload = function() {

    if (xhr.status === 200) {

        document.getElementById("navbar").innerHTML =
            xhr.responseText;



        // LOGOUT

        document
            .getElementById("logout")
            .addEventListener("click", function() {

                localStorage.removeItem("currentUser");

                alert("Anda telah mengakhiri sesi ini");

                window.location.href = "login-regis.html";

            });

    }};

xhr.onerror = function() {

    console.error(
        "Gagal mengambil navbar"
    );

};


xhr.send();    