"use strict";

/**
 * Name: Jordan Fleming
 * Date: 10/14/2024
 * Main JavaScript file for Random User Generator project.
 */

/**
 * Initialize event listeners and set up the page.
 */
window.addEventListener("load", init);

function init() {
    const fetchButton = document.getElementById("fetchUser");
    fetchButton.addEventListener("click", makeRequest);
}

/**
 * Fetch a random user from the Random User Generator API.
 */
async function makeRequest() {
    const url = 'https://randomuser.me/api/';
    try {
        await showLoading();
        const res = await fetch(url);
        await statusCheck(res);
        const data = await res.json();
        await displayUser(data.results[0]);
        await additionalFunction();
    } catch (error) {
        handleError(error);
    }
}

/**
 * Display a loading message while fetching data.
 * @returns {Promise} A promise that resolves after a delay.
 */
async function showLoading() {
    const userProfile = document.getElementById("userProfile");
    userProfile.innerHTML = `<p>Loading user...</p>`;
    return new Promise(resolve => setTimeout(resolve, 1000)); 
}

/**
 * Display user information on the webpage.
 * @param {object} user - The user data from the API response.
 * @returns {Promise} A promise that resolves after the user is displayed.
 */
async function displayUser(user) {
    const userProfile = document.getElementById("userProfile");
    userProfile.innerHTML = `
        <img src="${user.picture.large}" alt="User Picture">
        <h2>${user.name.first} ${user.name.last}</h2>
        <p>Email: ${user.email}</p>
        <p>Location: ${user.location.city}, ${user.location.country}</p>
    `;
    return new Promise(resolve => setTimeout(resolve, 500));
}

/**
 * Handle errors during the fetch request.
 * @param {Error} error - The error that occurred.
 */
function handleError(error) {
    const userProfile = document.getElementById("userProfile");
    userProfile.innerHTML = `<p>Error fetching user: ${error.message}</p>`;
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

/**
 * Additional async function for demonstration purposes.
 * @returns {Promise} A promise that resolves after a delay.
 */
async function additionalFunction() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Additional function completed.");
            resolve();
        }, 1000);
    });
}
