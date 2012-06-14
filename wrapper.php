<?

$pieces = substr($_SERVER['REQUEST_URI'],1);
$exploded = explode('/', $pieces,2);
/*http://memeit.com/#meme/<?=$exploded[0]?>/<?=$exploded[1]?>" /> */
?>
<html>

<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# meme-it: http://ogp.me/ns/fb/meme-it#">
  <meta property="fb:app_id" content="132429983552387" /> 
  <meta property="og:type"   content="meme-it:meme" /> 
  <meta property="og:url"    content="http://memeit.com<?=$pieces?>" />
  <meta property="og:image"  content="https://fbcdn_sphotos_a-a.akamaihd.net/hphotos-ak-ash3/<?=$exploded[1]?>/_b.jpg" />
  <meta property="og:description" content="Check out this hilarious meme I just found at memeit.com" />
  <meta property="og:title"  content="<?=$exploded[0]?>" />
  <meta http-equiv="REFRESH" content="0;url=http://memeit.com/#meme/<?=$pieces?>"></HEAD>

</head>
<body>

</body>

</html>