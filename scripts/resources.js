/*
 * resources.js
 *
 * Author:
 *	Freddy Garcia
 *
 * Source:
 *	Varies
 *
 * Various external resources that are used in other javascript files
 */
 
// Globals
var parseXML;
var ENTITY_NUMBER = new Array(
"&#160;",
"&#161;",
"&#162;",
"&#163;",
"&#164;",
"&#165;",
"&#166;",
"&#167;",
"&#168;",
"&#169;",
"&#170;",
"&#171;",
"&#172;",
"&#173;",
"&#174;",
"&#175;",
"&#176;",
"&#177;",
"&#178;",
"&#179;",
"&#180;",
"&#181;",
"&#182;",
"&#183;",
"&#184;",
"&#185;",
"&#186;",
"&#187;",
"&#188;",
"&#189;",
"&#190;",
"&#191;",
"&#192;",
"&#193;",
"&#194;",
"&#195;",
"&#196;",
"&#197;",
"&#198;",
"&#199;",
"&#200;",
"&#201;",
"&#202;",
"&#203;",
"&#204;",
"&#205;",
"&#206;",
"&#207;",
"&#208;",
"&#209;",
"&#210;",
"&#211;",
"&#212;",
"&#213;",
"&#214;",
"&#215;",
"&#216;",
"&#217;",
"&#218;",
"&#219;",
"&#220;",
"&#221;",
"&#222;",
"&#223;",
"&#224;",
"&#225;",
"&#226;",
"&#227;",
"&#228;",
"&#229;",
"&#230;",
"&#231;",
"&#232;",
"&#233;",
"&#234;",
"&#235;",
"&#236;",
"&#237;",
"&#238;",
"&#239;",
"&#240;",
"&#241;",
"&#242;",
"&#243;",
"&#244;",
"&#245;",
"&#246;",
"&#247;",
"&#248;",
"&#249;",
"&#250;",
"&#251;",
"&#252;",
"&#253;",
"&#254;",
"&#255;",
"&#338;",
"&#339;",
"&#352;",
"&#353;",
"&#376;",
"&#402;",
"&#710;",
"&#732;",
"&#8194;",
"&#8195;",
"&#8201;",
"&#8204;",
"&#8205;",
"&#8206;",
"&#8207;",
"&#8211;",
"&#8212;",
"&#8216;",
"&#8217;",
"&#8218;",
"&#8220;",
"&#8221;",
"&#8222;",
"&#8224;",
"&#8225;",
"&#8226;",
"&#8230;",
"&#8240;",
"&#8242;",
"&#8243;",
"&#8249;",
"&#8250;",
"&#8254;",
"&#8364;",
"&#8482;",
"&#8592;",
"&#8593;",
"&#8594;",
"&#8595;",
"&#8596;",
"&#8629;",
"&#8968;",
"&#8969;",
"&#8970;",
"&#8971;",
"&#9674;",
"&#9824;",
"&#9827;",
"&#9829;",
"&#9830;"
);

var ENTITY_NAME = new Array(
"&nbsp;",
"&iexcl;",
"&cent;",
"&pound;",
"&curren;",
"&yen;",
"&brvbar;",
"&sect;",
"&uml;",
"&copy;",
"&ordf;",
"&laquo;",
"&not;",
"&shy;",
"&reg;",
"&macr;",
"&deg;",
"&plusmn;",
"&sup2;",
"&sup3;",
"&acute;",
"&micro;",
"&para;",
"&middot;",
"&cedil;",
"&sup1;",
"&ordm;",
"&raquo;",
"&frac14;",
"&frac12;",
"&frac34;",
"&iquest;",
"&Agrave;",
"&Aacute;",
"&Acirc;",
"&Atilde;",
"&Auml;",
"&Aring;",
"&AElig;",
"&Ccedil;",
"&Egrave;",
"&Eacute;",
"&Ecirc;",
"&Euml;",
"&Igrave;",
"&Iacute;",
"&Icirc;",
"&Iuml;",
"&ETH;",
"&Ntilde;",
"&Ograve;",
"&Oacute;",
"&Ocirc;",
"&Otilde;",
"&Ouml;",
"&times;",
"&Oslash;",
"&Ugrave;",
"&Uacute;",
"&Ucirc;",
"&Uuml;",
"&Yacute;",
"&THORN;",
"&szlig;",
"&agrave;",
"&aacute;",
"&acirc;",
"&atilde;",
"&auml;",
"&aring;",
"&aelig;",
"&ccedil;",
"&egrave;",
"&eacute;",
"&ecirc;",
"&euml;",
"&igrave;",
"&iacute;",
"&icirc;",
"&iuml;",
"&eth;",
"&ntilde;",
"&ograve;",
"&oacute;",
"&ocirc;",
"&otilde;",
"&ouml;",
"&divide;",
"&oslash;",
"&ugrave;",
"&uacute;",
"&ucirc;",
"&uuml;",
"&yacute;",
"&thorn;",
"&yuml;",
"&OElig;",
"&oelig;",
"&Scaron;",
"&scaron;",
"&Yuml;",
"&fnof;",
"&circ;",
"&tilde;",
"&ensp;",
"&emsp;",
"&thinsp;",
"&zwnj;",
"&zwj;",
"&lrm;",
"&rlm;",
"&ndash;",
"&mdash;",
"&lsquo;",
"&rsquo;",
"&sbquo;",
"&ldquo;",
"&rdquo;",
"&bdquo;",
"&dagger;",
"&Dagger;",
"&bull;",
"&hellip;",
"&permil;",
"&prime;",
"&Prime;",
"&lsaquo;",
"&rsaquo;",
"&oline;",
"&euro;",
"&trade;",
"&larr;",
"&uarr;",
"&rarr;",
"&darr;",
"&harr;",
"&crarr;",
"&lceil;",
"&rceil;",
"&lfloor;",
"&rfloor;",
"&loz;",
"&spades;",
"&clubs;",
"&hearts;",
"&diams;"
);

//console.log("Entity Number length: " + ENTITY_NUMBER.length);
//console.log("Entity Name length: " + ENTITY_NAME.length);
 
/*
 * Source: http://stackoverflow.com/questions/1026069/capitalize-the-first-letter-of-string-in-javascript
 *
 * Capitalizes the first letter in the given string and returns it
 */
function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
 *	Source: http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
 *
 *	Replaces all occurrences of a certain string with the given value
 */
function replaceString(string, search, replacement)
{
	// splits the string at the point of occurrence, creating an array of string that do not include the 'search'
	// and joins the array using 'replacement'
	// the final string is returned
	return string.split(search).join(replacement);
}

/*
 * Source: http://stackoverflow.com/questions/3054108/how-to-convert-string-to-xml-object-in-javascript
 *
 * Parses the given string to XML format. The type of parsing that is 
 * used is based on the parser object that is available in the window
 */
  
// if DOMParser object exists
if(window.DOMParser)
{
	// parse the string using DOMParser
	parseXML = function(xmlStr)
	{
		var xmlDoc = new window.DOMParser();

		return xmlDoc.parseFromString(xmlStr, "text/xml");
	};
}
 
// If ActiveXObject exists
else if(typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM"))
{
	// parse the string using ActiveXObject
	parseXML = function(xmlStr)
	{
		var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(xmlStr);
		
		return xmlDoc;
	};
}
 
// Neither DOMParser nor ActiveXObject exist
else
{
	// returns null
	parseXML = function() 
	{
		return null;
	}
}