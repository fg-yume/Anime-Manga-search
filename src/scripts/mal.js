/*
 * mal.js
 *
 * Authors:
 *	Freddy Garcia
 *	Elvis Perez
 *
 * External Requirements:
 *	resources.js
 *
 * Requests information from MyAnimeList and displays the information
 * on our html page
 */
 
// Globals
var MAL_API_URL = "http://myanimelist.net/api/anime/search.xml?";
var PROXY_MAL_PHP = "scripts/mal_request.php?";

var MALSearchQuery;
var MALUsername;
var MALPassword;

/*
 * Sets the correct query for the PHP based on what the user has searched
 * Uses PHP to pull in the XML (in a way that by-passes origin errors ^.^)
 */
function findMALMedia()
{
	//Get user's search query from text box
	MALSearchQuery = document.querySelector("#searchText").value;
	MALUsername = document.querySelector("#username").value;
	MALPassword = document.querySelector("#password").value;
	
	var username = "&username=" + MALUsername;
	var password = "&password=" + MALPassword;
	var credentials = username + password;
	
	//Add PHP scripts and api-specific query to the url
	var finalMALURL = MAL_API_URL + "q=" + MALSearchQuery;
	
	//Replace spaces in search with +'s for the url query
	finalMALURL = replaceString(finalMALURL, " ", "+");
	finalMALURL = encodeURIComponent(finalMALURL);
	
	var url = PROXY_MAL_PHP + "filename=" + finalMALURL + credentials;
	
	// Pull in the XML from MAL using PHP
	$.ajax
	(
		{
			type: "GET",
			url: url,
			dataType: "text",
			success:function(xml){
				onMALLoaded(xml);
			},
			error:function(jqXHR, textStatus, errorThrown){
				console.log(textStatus);
			}
		}
	);
}

/*
 * Grabs the data being passed in and places the information
 * on our webpage
 */
function publishMALData(data)
{
	var resultsSection = document.querySelector("#malSearchResults");
	resultsSection.textContent = "";

	var entries = data.getElementsByTagName('entry');
	
	// loop through all of the elements of the media array
	for(var i=0; i < entries.length; i++)
	{
		var entry = entries[i];
		
		// HTML elements that will be added to the page
		var mediaContainer = document.createElement('div');
			mediaContainer.setAttribute('class', "outer");
			
		var basicInfoContainer = document.createElement('div');
			basicInfoContainer.setAttribute('class', "inner");
		var synopsisContainer = document.createElement('div');
			synopsisContainer.setAttribute('class', "inner");
		var scoreContainer = document.createElement('div');
			scoreContainer.setAttribute('class', "score");
			
		var titleHeader = document.createElement('h1');
		var picture = document.createElement('img');
			picture.textContent = "Image";
		var episodeCount = document.createElement('p');
			episodeCount.textContent = "Episodes: ";
		var synopsis = document.createElement('p');
			synopsis.textContent = "Synopsis: ";
		var score = document.createElement('p');
			score.textContent = "Score: ";
		
	
		//Gather relevant attributes if available
		//Anime Title
		if(entry.getElementsByTagName("image").length > 0)
		{
			titleHeader.textContent = entry.getElementsByTagName("title")[0].firstChild.nodeValue;
		}
		else
		{
			//DIRTY CODE -- DO NOT KEEP
			titleHeader.textContent = MALSearchQuery + "!";
		}
		
		//Anime Image
		if(entry.getElementsByTagName("image").length > 0)
		{
			picture.src = entry.getElementsByTagName("image")[0].firstChild.nodeValue;
		}
		else
		{
			picture.src = "media/img404.png";
		}
		
		//# of Episodes
		if(entry.getElementsByTagName("episodes").length > 0)
		{
			episodeCount.textContent += entry.getElementsByTagName("episodes")[0].firstChild.nodeValue;
		}
		else
		{
			episodeCount.textContent += "???";
		}
		
		//Anime Synopsis
		//if(entry.getElementsByTagName("synopsis").length > 1)
		//{
			synopsis.textContent += entry.getElementsByTagName("synopsis")[0].firstChild.nodeValue;
		//}
		//else
		//{
			//synopsis.textContent += "Not Available";
		//}
		
		//Anime Rating
		if(entry.getElementsByTagName("score").length > 0)
		{
			score.textContent += entry.getElementsByTagName("score")[0].firstChild.nodeValue;
			
			//Set default score background color to white
			scoreContainer.style.backgroundColor = "rgb(255,255,255)";
			
			//Color score background based on rating for noteworthy anime
			var scoreValue = entry.getElementsByTagName("score")[0].firstChild.nodeValue
			if(scoreValue > 9)
			{
				scoreContainer.style.backgroundColor = "rgb(255,215,0)";
				score.textContent += "\nGold";
			}
			else if(scoreValue > 8)
			{
				scoreContainer.style.backgroundColor = "rgb(204,204,204)";
				score.textContent += "\nSilver";
			}
			else if(scoreValue > 7)
			{
				scoreContainer.style.backgroundColor = "rgb(205,127,50)";
				score.textContent += "\nBronze";
			}
		}
		
		//Append elements to page
		basicInfoContainer.appendChild(titleHeader);
		basicInfoContainer.appendChild(picture);
		basicInfoContainer.appendChild(episodeCount);
		synopsisContainer.appendChild(synopsis);
		scoreContainer.appendChild(score);
		
		mediaContainer.appendChild(basicInfoContainer);
		mediaContainer.appendChild(synopsisContainer);
		mediaContainer.appendChild(scoreContainer);
		
		resultsSection.appendChild(mediaContainer);
	}
	
	//If no results found (above loop will instantly end)
	if(entries.length == 0)
	{
		resultsSection.textContent = "No results found on MyAnimeList";
	}
}

/*
 * Converts entity names in the loaded XML string to their respective entity numbers in order
 * to prevent parser errors when converting the string into an XML object. Returns the string once it is fixed
 *
 * Requires:
 *	resources.js
 */
function fixString(brokenString)
{
	// Search for entity names in the string
	for(var i=0; i < ENTITY_NAME.length; i++)
	{
		// if we found the entity name
		if(brokenString.search(ENTITY_NAME[i]) !== -1)
		{
			// replace with respective entity number
			brokenString = replaceString(brokenString, ENTITY_NAME[i], ENTITY_NUMBER[i]);
		}
	}
	
	return brokenString;
}

/*
 * After the MAL XML has been loaded, various information that is available in the XML 
 * will be used to populate our HTML page
 */
function onMALLoaded(data)
{
	// remove unnecessary info from the data retrieved
	var xmlBegin = data.indexOf("<");
	var xmlEnd = data.lastIndexOf(">");
	
	// Cuts out the XML from the entire string
	var xmlString = data.substring(xmlBegin, xmlEnd + 1);
	
	xmlString = fixString(xmlString);
	
	// parse the string into an XML object
	// Requires XMLparser.js
	var xmlOBJ = parseXML(xmlString);
	
	//console.log("START XML OBJECT");
	console.log(xmlOBJ);
	
	// put data from the XML onto the page
	publishMALData(xmlOBJ);
}