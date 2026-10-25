//RESUELVE TUS EJERCICIOS AQUI

//1

async function getAllBreeds() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return Object.keys(data.message);
}

//2

async function getRandomDog() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data.message;
}

//3

async function getAllImagesByBreed() {
    const response = await fetch("https://dog.ceo/api/breed/komondor/images");

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data.message;
}

//4

async function getAllImagesByBreed2(breed) {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data.message;
}

//5

async function getGitHubUserProfile(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

//6

async function printGithubUserProfile(username) {
    const data = await getGitHubUserProfile(username);

    const img = data.avatar_url;
    const name = data.name;
    const imagen = document.createElement("img");

    imagen.setAttribute("src", img);
    imagen.setAttribute("alt", name);

    const titulo = document.createElement("h2");
    titulo.textContent = name;

    document.body.appendChild(imagen);
    document.body.appendChild(titulo);

    return { img, name };
}

//7

async function getAndPrintGitHubUserProfile(username) {
    const data = await getGitHubUserProfile(username);

    return `<section>
    <img src="${data.avatar_url}" alt="${data.name}">
    <h1>${data.name}</h1>
    <p>Public repos: ${data.public_repos}</p>
</section>`;
}

//8

document.addEventListener("DOMContentLoaded", function () {

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Usuario de GitHub");

    const boton = document.createElement("button");
    boton.textContent = "Buscar";

    const resultado = document.createElement("div");

    document.body.appendChild(input);
    document.body.appendChild(boton);
    document.body.appendChild(resultado);


    boton.addEventListener("click", async function () {
        const username = input.value;

        try {
            const tarjeta = await getAndPrintGitHubUserProfile(username);
            resultado.innerHTML = tarjeta;
        } catch (error) {
            resultado.innerHTML = "<p>Usuario no encontrado</p>";
        }
    });

});

//9 

async function fetchGithubUsers(userNames) {

    const promesas = userNames.map((name) => fetch(`https://api.github.com/users/${name}`));
    const responses = await Promise.all(promesas);
    const users = await Promise.all(responses.map((response) => response.json()));


    users.forEach((user) => {
        console.log(user.html_url);
        console.log(user.name);
    });

    return users;
}

