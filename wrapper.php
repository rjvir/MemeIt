<?
/*
https://graph.facebook.com/me/permissions?
    access_token=USER_ACCESS_TOKEN
*/
$pieces = substr($_SERVER['REQUEST_URI'],1);
$exploded = explode('/', $pieces,2);
/*http://memeit.com/#meme/<?=$exploded[0]?>/<?=$exploded[1]?>" /> */

//https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url=
//http%3A%2F%2Fa.espncdn.com%2Fphoto%2F2011%2F1018%2Fnba_top5_288.jpg
//&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image/*
?>
<html>

<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# meme-it: http://ogp.me/ns/fb/meme-it#">
  <meta property="fb:app_id" content="132429983552387" /> 
  <meta property="og:type"   content="meme-it:meme" /> 
  <meta property="og:url"    content="http://memeit.com/<?=$pieces?>" />
  <meta property="og:image"  content="http://memeit.com/proxy.php?url=https://fbcdn_sphotos_a-a.akamaihd.net/hphotos-ak-ash4/<?=$exploded[0]?>_b.jpg" />
  <meta property="og:description" content="Check out this hilarious meme I just found at memeit.com" />
  <meta property="og:title"  content="<?=$exploded[1]?>" />
  <meta http-equiv="REFRESH" content="0;url=http://memeit.com/#meme/<?=$pieces?>"></HEAD>

</head>
<body>
</body>

</html>

