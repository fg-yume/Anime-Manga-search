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
 * Sends GET requests based on user input, and populates HTML page with the received files
 *
 *	Notes:
 *		ANN: Anime News Network
 *		MAL: MyAnimeList
 */

"use strict";

// entry point
$(document).ready(init);

function init()
{
	var searchButton = document.querySelector('#searchButton');

	// Event Listeners
	// Requires:
	//	mal.js
	//	ann.js
	searchButton.addEventListener('click', findMALMedia);
	searchButton.addEventListener('click', findANNMedia);
}