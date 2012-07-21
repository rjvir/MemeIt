<?php
//if ($_SERVER['REMOTE_ADDR'] != '173.230.145.39') exit('No direct script access allowed');

echo date('l jS \of F Y h:i:s A');
	
include('library_mixpanel.php');

//Insert Key and Secret
$api_key = '553527e71b2b486873bc8a9be6c6a06f';
$api_secret = '1ccd522400bd797ac27d885aa2da1696';

//Create Mixpanel Object
$mp = new Mixpanel($api_key, $api_secret);

//Create single-entry array with API endpoint
/*$endpoint = array('events/properties');

//Create array of properties to send
$parameters = array(
'event' => 'first caption',
'name' => 'caption',
'type' => 'general',
'unit' => 'day',
'interval' => '2'
);*/

//Create single-entry array with API endpoint
$endpoint = array('segmentation');

//Create array of properties to send
$parameters = array(
'event' => 'first caption',
'from_date' => date("Y-m-d"), 
'to_date' => date("Y-m-d"),
'on' => 'properties["caption"]'
);

//Make the request
$data = $mp->request($endpoint,$parameters);

//print the result

//print_r($data);
//var_dump($data);

//print_r($data->data->values);

//foreach($data->data->values as $piece){ print_r($piece); echo '<br /><br /><br />'; }

$results = $data->data->values;
$shifts = '';

foreach ($results as $caption=>$object) { 
	foreach ($object as $date=>$count){
		$shifts[] = array($caption, $count);
	}
}

//echo 'window.weightedcaptions = '.json_encode($json);

$captions = json_decode(str_replace('window.captions = ', '', file_get_contents('js/captions.js')));

print_r($shifts);
print_r($captions);

for($i = 0; $i < count($shifts); $i++){
	$cap = $shifts[$i][0];
	$count = $shifts[$i][1];
	
	for($x = 0; $x < $count; $x ++){
		for($j=1; $j < count($captions); $j++){
			if($captions[$j] == $cap){
				$temp = $captions[$j-1];
				$captions[$j - 1] = $cap;
				$captions[$j] = $temp;
			}
		}
	}

}

print_r($captions);

$json = 'window.captions = '.json_encode($captions);
if($json) {
	file_put_contents('js/captions.js',$json);
}
/*for(i = 0; i < firstcaptions.length; i++){
	for(j = 1; j < captionlist.length; j++){
		if(firstcaptions[i] === captionlist[j]){
			for(k = 0; k < firstcaptions[i]->value; k++){
				var temp = captionlist[i-1]
				captionlist[i-1] = captionlist[i];
				captionlist[i] = temp;
			}
		}
	}
}*/


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
	
	/* var skipchance = Math.random
	 * 
	 if()
	 * 
	 * 
	 * */
?>