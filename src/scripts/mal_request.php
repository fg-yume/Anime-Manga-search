<?php
	/*
	 * mal_request.php
	 * 
	 * Author:
	 *	Freddy Garcia
	 *	Elvis Perez
	 *
	 * Retrieves data from the url being sent to this file, and echo's the contents out
	 */
	
	/*
	 * Checks if the following cURL functions are available:
	 *	curl_init()
	 *	curl_setopt()
	 *	curl_exec()
	 *	curl_close()
	 *
	 * Returns true or false based on their existence
	 */
	function cURLcheckBasicFunctions() 
	{ 
	  if( !function_exists("curl_init") && 
		  !function_exists("curl_setopt") && 
		  !function_exists("curl_exec") && 
		  !function_exists("curl_close") ) 
		  
		  return false; 
	  else 
		return true; 
	} 

	// store filename if provided
	if(array_key_exists('filename',$_REQUEST))
        $fileName = $_REQUEST['filename'];

	// exit if filename not provided
	else 
	{
		echo "<strong>Need a <em>filename</em> to fetch!</strong>";
		//This shuts down the current php script
		exit();
	}
	
	// store credentials if provided
	if(array_key_exists('username', $_REQUEST))
		$username = $_REQUEST['username'];
	
	// exit if credentials not provided	
	else
	{
		echo "<strong>Need <em>username</em> to fetch!</strong";
		
		// shut down
		exit();
	}
	
	if(array_key_exists('password', $_REQUEST))
		$password = $_REQUEST['password'];
	
	// exit if credentials not provided	
	else
	{
		echo "<strong>Need <em>password</em> to fetch!</strong";
		
		// shut down
		exit();
	}
	 
	// Variables that will be used for cURL settings
	$credentials = $username . ":" . $password;
	$userAgent = "api-edu-cf53d4f1524ab61c35bc529a600f755c";
	
	$headers = array
	(
		"Content-Type: application/xml",
		"Accept: application/xml"
    );
	
	if( !cURLcheckBasicFunctions() )
		return "UNAVAILABLE:cURL Basic Functions";
		
	else
	{
		// Initialize the cURL handler
		$curl = curl_init();
			// Ensure that the request is being interpreted as GET
			curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
			// URL to be used in to cURL is specified here.
			curl_setopt($curl, CURLOPT_URL, $fileName);
			// Our user agent
			curl_setopt($curl, CURLOPT_USERAGENT, $userAgent);
			// Credentials - FORMAT: "username:password"
			curl_setopt($curl, CURLOPT_USERPWD, $credentials);
			curl_setopt($curl, CURLOPT_HEADER, true);
			// Using the settings that we provided for the header
			curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
			// Error messages will be verbose
			curl_setopt($curl, CURLOPT_VERBOSE, true);
			// HTTP Authentication which will be used to verify our credentials
			curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);

		$fileData = curl_exec($curl);
		
		if(curl_errno($curl))
			print "Error: " . curl_error($curl);
		
		else
		{
			// echo's the received data
			echo $fileData;
		}
		
		// close the request
		curl_close($curl);
	}
?>