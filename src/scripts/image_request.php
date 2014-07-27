<?php
	/*
	 * image_request.php
	 *
	 * Source: http://websguides.com/showthread.php?462-how-to-bypass-image-hotlink-protection-using-php
	 *
	 * Gets content of the file (image) that is passed to this script
	 * and returns the contents
	 */
	header('Content-Type: image');

	if ($image = $_GET["image"])
	{
		$contents = file_get_contents($image);
		echo $contents;
	}
?>