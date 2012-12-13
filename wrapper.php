<?
/*
https://graph.facebook.com/me/permissions?
    access_token=USER_ACCESS_TOKEN
*/
$pieces = substr($_SERVER['QUERY_STRING'],1);
$exploded = explode('/', $pieces,2);
/*http://memeit.com/#meme/<?=$exploded[0]?>/<?=$exploded[1]?>" /> */

//https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url=
//http%3A%2F%2Fa.espncdn.com%2Fphoto%2F2011%2F1018%2Fnba_top5_288.jpg
//&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image/*

$uri = $exploded[0].'/'.rawurlencode($exploded[1]);

/*

https://www.facebook.com/dialog/oauth?
    client_id=YOUR_APP_ID
   &redirect_uri=YOUR_REDIRECT_URI
   &scope=COMMA_SEPARATED_LIST_OF_PERMISSION_NAMES
   &state=SOME_ARBITRARY_BUT_UNIQUE_STRING

*/

$fb_url = 'https://www.facebook.com/dialog/oauth?client_id=132429983552387&redirect_uri=http://memeit.com/'.$uri.'&scope=publish_actions,read_stream,user_photos,friends_photos,user_likes,read_mailbox';

$explodedByCode = explode('?code=', substr($_SERVER['REQUEST_URI'],1));

if(!$explodedByCode[1] && ($_SERVER['HTTP_USER_AGENT'] != "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)")) {
	header( 'Location: '.$fb_url );
}

?>
<html>
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# meme-it: http://ogp.me/ns/fb/meme-it#">
  <meta property="fb:app_id" content="132429983552387" /> 
  <meta property="og:type"   content="meme-it:meme" />
<!--  <meta property="og:url"    content="http://memeit.com/<?=$uri?>" />-->
  <meta property="og:image"  content="http://memeit.com/proxy.php?url=https://sphotos-b.xx.fbcdn.net/hphotos-ash3/<?=$exploded[0]?>_b.jpg" />
  <meta property="og:description" content="Check out this hilarious meme I found on Meme It!" />
  <meta property="og:title"  content="<?=urldecode($exploded[1])?>" />
  <meta http-equiv="REFRESH" content="0;url=http://memeit.com/#meme/<?=$explodedByCode[0]?>" />
</head>
</html>

