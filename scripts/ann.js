/*
 * ann.js
 *
 * Authors:
 *	Freddy Garcia
 *	Elvis Perez
 *
 * External Requirements:
 *	resources.js
 *
 * Requests information from Anime News Network and displays the information
 * in our html page
 */
 
 // Globals
 var ANN_API_URL = "http://cdn.animenewsnetwork.com/encyclopedia/api.xml?";
 
 var PROXY_ANN_PHP = "scripts/ann_request.php?filename=";
 var PROXY_IMAGE_PHP = "scripts/image_request.php?image=";
 
 var ANNSearchQuery;
 
/*
 * Sets the correct query for the PHP based on what the user has searched
 * Uses PHP to pull in the XML (in a way that by-passes origin errors ^.^)
 */
function findANNMedia()
{
	//Get user's search query from text box
	ANNSearchQuery = document.querySelector("#searchText").value;
	
	//Add PHP scripts and api-specific query to the url
	var finalANNURL = ANN_API_URL + "title=~" + ANNSearchQuery;
	
	//Replace spaces in search with +'s for the url query
	finalANNURL = replaceString(finalANNURL, " ", "+");
	
	//encode urls to preserve special characters in PHP
	finalANNURL = encodeURIComponent(finalANNURL);
	
	console.log(finalANNURL);
	
	// Pull in the XML from ANN using PHP
	$.ajax
	(
		{
			type: "GET",
			url: PROXY_ANN_PHP + finalANNURL,
			dataType: "xml",
			success:function(xml){
				onANNLoaded(xml);
			}
		}
	);
}

/*
 * Grabs the data from the media that is being passed in (<anime> or <manga> tag)
 * and appends it to the specified destination in our HTML page
 * changes are made based on the mediaType that is passed in
 *
 * Note: destination is an existing HTML tag in our page
 */
function publishANNData(destination, media, mediaType)
{	
	// loop through all of the elements of the media array
	for(var i=0; i < media.length; i++)
	{
		// HTML elements that will be added to the page
		var mediaContainer = document.createElement('div');
			mediaContainer.setAttribute('class', "outer");
		var basicInfoContainer = document.createElement('div');
			basicInfoContainer.setAttribute('class', "inner");
		var synopsisContainer = document.createElement('div');
			synopsisContainer.setAttribute('class', "inner");
		var titleHeader = document.createElement('h1');
		var picture = document.createElement('img');
			picture.textContent = "Image";
		var genreList = document.createElement('ul');
			genreList.textContent = "Genres";
		var synopsis = document.createElement('p');
			synopsis.textContent = "Synopsis: ";
		
		// tags from the current media
		var infoTags = media[i].getElementsByTagName('info');
		
		// Attributes from the current media
		var title = media[i].getAttribute('name');
		var specificType = media[i].getAttribute('precision');
			specificType = capitalizeFirstLetter(specificType);
		var genres = new Array(); // there can be more than one genre
		
		// loop through the <info> tags
		if(infoTags !== 'undefined')
		{
			for(var j=0; j < infoTags.length; j++)
			{
				// If the <info> tag specifies a picture
				if(infoTags[j].getAttribute('type') === "Picture")
				{
					// set source of our <img> tag (picture) to that of 'src' in the <info> tag in ANN
					picture.src = PROXY_IMAGE_PHP + infoTags[j].getAttribute('src');
				}
				
				// If the <info> tag specifies a genre
				else if(infoTags[j].getAttribute('type') === "Genres")
				{		
					// Add the genre to our array of genres
					genres.push(infoTags[j].firstChild.nodeValue);
				}
				
				// If the <info> tag specifies a plot summary
				else if(infoTags[j].getAttribute('type') === "Plot Summary")
				{
					// Append the text to our synopsis <p>
					synopsis.textContent += infoTags[j].firstChild.nodeValue;
				}
			}
		}
		
		// set text for the <h1>
		titleHeader.textContent = specificType + ": " + title;
			
		/* APPENDS */
		
		basicInfoContainer.appendChild(titleHeader);
		
		//console.log(picture.src.length);
			
		// appends the image that was provided by the XML.
		// if none is provided, uses a default image instead
		if(picture.src.length === 0)
			picture.src = "media/img404.png";
		basicInfoContainer.appendChild(picture);
		
		// Only append the list of genres if necessary
		if(genres.length > 0)
		{
			for(var k=0; k < genres.length; k++)
			{
				// create list item for the genre
				var genreItem = document.createElement('li');
				genreItem.textContent = genres[k];
				
				// append item to the list of genres
				genreList.appendChild(genreItem);
			}
			
			basicInfoContainer.appendChild(genreList);
		}
		else // genres.length = 0
		{
			// Tell the user there are no genres specified :(
			var noGenre = document.createElement('p');
			noGenre.textContent = "There are no specified genres for this " + mediaType;
			
			basicInfoContainer.appendChild(noGenre);
		}
		
		// Append the synopsis if it is provided
		if(synopsis.textContent.length > 10)
		{
			synopsisContainer.appendChild(synopsis);
		}
		else // synopsis.length <= 10
		{
			// Default when no synopsis is provided
			synopsis.textContent += "Not Available";
			synopsisContainer.appendChild(synopsis);
		}
		
		// append the containers to destination
		mediaContainer.appendChild(basicInfoContainer);
		mediaContainer.appendChild(synopsisContainer);
		
		destination.appendChild(mediaContainer);
	}
}

/*
 * After the ANN XML has been loaded, various information that is available 
 * will be used to populate our HTML page
 */
function onANNLoaded(xml)
{
	console.log(xml);
	
	// Clear out #searchResults <section> every time
	var resultsSection = document.querySelector("#searchResults");
	resultsSection.textContent = "";
	
	// get the mangas and animes for the search query
	var mangas = xml.getElementsByTagName('manga');
	var animes = xml.getElementsByTagName('anime');
	var warning = xml.getElementsByTagName('warning');
	
	// Only run through this if there are mangas
	if(mangas.length > 0)
		publishANNData(resultsSection, mangas, "Manga");
	
	// Only run through this if there are animes
	if(animes.length > 0)
		publishANNData(resultsSection, animes, "Anime");
		
	if(warning.length > 0)
		resultsSection.textContent = "No results found on Anime News Network";
}