<?php
		// ann_request.php
		//Author: Cody Van De Mark
		//This is a simple and VERY insecure proxy server
		//This takes a url, then reaches out to it to pull down data and send it back to the requesting client
		
		//array_key_exists is a function in php to that tells you if a key is in an associative array
		//If the associate array has the key, it returns true, if it does not, it returns false
		// check to see if there is a required 'filename' parameter in the query string
		// example: image_proxy.php?filename=http://www.blahblah.com/file.jpg
		if(array_key_exists('filename',$_REQUEST)){
			//$_REQUEST is an associative array built into PHP that contains the web request
			//This will have all of the values from the request and information about the request
        	$fileName =$_REQUEST['filename'];
			
			// Decode the URI
			//$fileName = urldecode($fileName);
			
			//print $fileName
        } 
		//If the filename was not sent in the request, respond with an error and exit
		else {
        	echo "<strong>Need a <em>filename</em> to fetch!</strong>";
			//This shuts down the current php script
        	exit();
        }
        
        // check for the optional 'format' parameter
        // example: image_proxy.php?filename=http://www.blahblah.com/file.jpg&format=jpeg
		// If the client requested a return type, set our return type variable to that
        // we need this when returning the content-type
        // if it doesn't exist, set "text/xml" as a default
        if(array_key_exists('format',$_REQUEST)){
			//Set $format to the $_REQUEST array at the format key
        	$format= $_REQUEST['format'];
        } else {
        	$format = "text/xml";
        }
        
        // get the contents from the file using the file_get_contents function
		// This can be a url or a file. PHP does not care which it is
     	$fileData = file_get_contents($fileName);
     	
     	// send a content-type header for the response so that the client browser will understand what is coming back
		header("content-type: $format");
        // echo the content from the file or url
    	echo $fileData;
?>