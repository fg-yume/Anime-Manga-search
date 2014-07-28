/*
 * main.js
 *
 * Authors:
 *	Freddy Garcia
 *	Elvis Perez
 *
 * External Requirements:
 *	ann.js
 *	mal.js
 *
 * APIs used:
 *	Anime News Network (http://www.animenewsnetwork.com)
 *	MyAnimeList (http://www.myanimelist.net)
 *
 * Adds event listeners to the page to support its functionality
 *
 *	Notes:
 *		ANN: Anime News Network
 *		MAL: MyAnimeList
 */
"use strict";

// Encapsulate the application within this variable
var app = app || {};

// Globals
app.searchQuery = ""; // the anime/manga query that the user has requested

/*
 * Sets up page functionality with event listeners
 */
app.init = function()
{
	var searchButton = document.querySelector('#searchButton');
	
	searchButton.addEventListener('click', findMALMedia, false);
	searchButton.addEventListener('click', findANNMedia, false);
};

// entry point
window.addEventListener('load', app.init, false);