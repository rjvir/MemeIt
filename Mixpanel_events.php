<?php
        
	
include('library_mixpanel.php');

//Insert Key and Secret
$api_key = '553527e71b2b486873bc8a9be6c6a06f';
$api_secret = '1ccd522400bd797ac27d885aa2da1696';

//Create Mixpanel Object
$mp = new Mixpanel($api_key, $api_secret);

//Create single-entry array with API endpoint
$endpoint = array('events/properties');

//Create array of properties to send
$parameters = array(
'event' => 'first caption',
'name' => 'caption',
'type' => 'general',
'unit' => 'day',
'interval' => '2'
);

/*
//Create single-entry array with API endpoint
$endpoint = array('segmentation');

//Create array of properties to send
$parameters = array(
'event' => 'first caption',
'from_date' => '2012-07-02', 
'to_date' => '2012-07-02',
'on' => 'properties["caption"]'
);
*/

//Make the request
$data = $mp->request($endpoint,$parameters);

//print the result

print_r($data);
//var_dump($data);






//Token = 'c0d8bd417fae5251175bf6da64ba694f';
	
/* 1. Request first caption, captions from mixpanel and store in an array....if a caption has 3 appearances as a first caption, put it in the array three times.
API Key: 553527e71b2b486873bc8a9be6c6a06f
API Secret:1ccd522400bd797ac27d885aa2da1696
Token:c0d8bd417fae5251175bf6da64ba694f

var API_Key = 553527e71b2b486873bc8a9be6c6a06f
var API_Secret = 1ccd522400bd797ac27d885aa2da1696
var Token = c0d8bd417fae5251175bf6da64ba694f
//All requests must have the following parameters: api_key, expire, sig.
//expire is any UTC time in the future that represents how long you wish the request consuming data to last. 
//For example, if you wish the request to only last 1 minute, you would calculate the UTC time as of now and then add 60 representing 1 minute ahead.




//Request to Mixpanel API, that sets values into an array




 * * 2. Loop through the first captions array
 * 		3. If(first caption[i] === captionlist)
 

//The lower the number in the array, the more valuable the caption
for(i = 0; i < firstcaptions.length; i++){
	for(j = 1; j < captionlist.length; j++){
		if(firstcaptions[i] === captionlist[j]){
			[captionlist[j], captionlist[j-1]] = [captionlist[j-1], captionlist[j]];
		}
	}
}
	*/
?>