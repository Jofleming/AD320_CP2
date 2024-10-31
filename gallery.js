"use strict";

/**
 * Name: Jordan Fleming
 * Date: 10/14/2024
 * JavaScript file for Random User Generator project Gallery page.
 */

window.addEventListener("load", init);

function init() {
    const fetchButton = document.getElementById("fetchProfiles");
    fetchButton.addEventListener("click", fetchProfiles);
}

/**
 * Fetch multiple user profiles from the Random User Generator API.
 */
async function fetchProfiles() {
    const url = 'https://randomuser.me/api/?results=6';
    try {
        const res = await fetch(url);
        await statusCheck(res);
        const data = await res.json();
        displayProfiles(data.results);
    } catch (error) {
        handleError(error);
    }
}

/**
 * Display user profiles in the gallery.
 * @param {Array} users - An array of user objects.
 */
function displayProfiles(users) {
    const gallery = document.getElementById("profileGallery");
    gallery.innerHTML = "";

    users.forEach(user => {
        const profileDiv = document.createElement("div");
        profileDiv.className = "profile";
        profileDiv.innerHTML = `
            <img src="${user.picture.thumbnail}" alt="${user.name.first} ${user.name.last}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>Email: ${user.email}</p>
        `;
        gallery.appendChild(profileDiv);
    });
}

/**
 * Handle errors during the fetch request.
 * @param {Error} error - The error that occurred.
 */
function handleError(error) {
    const gallery = document.getElementById("profileGallery");
    gallery.innerHTML = `<p>Error fetching profiles: ${error.message}</p>`;
}

/**
 * Check the response status and throw an error if not ok.
 * @param {Response} res - The response object.
 * @returns {Response} - The response if successful.
 * @throws {Error} - If the response status is not ok.
 */
async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}
