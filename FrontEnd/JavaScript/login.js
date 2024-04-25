const element = {
    password: document.querySelector("#password"),
    email: document.querySelector("#email"),
    submit: document.querySelector("#submitInfo"),
};

let boutonLogin = element.submit.addEventListener("click", (a) => {
    a.preventDefault();
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: element.email.value,
        password: element.password.value,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.token) {
               sessionStorage.setItem("token", data.token);
               window.location.replace("index.html");
            } 
            else {
                throw new Error("Erreur dans l'e-mail ou le mot de passe");
            }
        })
        .catch((error) => {
            alert(error.message);
        });
});