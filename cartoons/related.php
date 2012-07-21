<?

foreach($memes as $meme){
	if($meme[4]){
		$shownmemes[] = $meme;
	}
}

$shown = array_rand($shownmemes, 2);
$count = 0;

foreach($shown as $num){
	if(($memes[$num][0] != $clean) && $count < 5){
		echo '<a class="related" href="?i='.$memes[$num][0].'" style="background-image:url('.$memes[$num][1].');"></a>';
		$count ++;
	}
}


?>