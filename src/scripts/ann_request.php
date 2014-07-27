<?php
		// ann_request.php

		if(array_key_exists('filename',$_REQUEST)){
        	$fileName =$_REQUEST['filename'];
        } 
		//If the filename was not sent in the request, respond with an error and exit
		else {
        	echo "<strong>Need a <em>filename</em> to fetch!</strong>";
			//This shuts down the current php script
        	exit();
        }
        
        // check for the optional 'format' parameter
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