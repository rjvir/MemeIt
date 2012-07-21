<?
	include('memes.php'); 
	foreach($memes as $meme){
		if($meme[0] == $_GET['i']){
			$clean = $meme[0];
			$url = $meme[1];
			$title = $meme[2];
			$desc = $meme[3];
		}
	}
?>
<html>
	<head>
		<link rel="stylesheet" href="css/main.css" />
		<title>Meme It! | <?=$title?></title>
	</head>
	<body>
		<div class="masher">
			<div class="container">
				<div class="inner-container">
					<div class="sidebar-container">
						<div class="sidebar">
							<div class="sidebar-inner">
								<div class="sidebar-wrapper">
									<div class="logo">BuddyMeme</div>
									<div class="browse-container">
										<a id="next" class="browse uibutton">Next Meme &raquo;</a>
										<div style="clear:both;"></div>
									</div>
									<div id="related-container" class="related-container">
										<div class="related-wrapper">
											<? include('related.php'); ?>
										</div>
										<div style="clear:both;"></div>
									</div>
									<!--<div class="fb-like-box" data-href="https://www.facebook.com/pages/Meme-It/492890397393134" data-width="220" data-colorscheme="light" data-show-faces="false" data-stream="false" data-header="false"></div> -->
								</div>
							</div>
						</div>	
					</div>
					<div class="main-container">
						<div class="main">
							<div class="main-inner">
								<div class="meme-container" id="meme-container">
									<!-- AddThis Button BEGIN -->
									<div class="addthis_toolbox addthis_floating_style addthis_counter_style">
									<a class="addthis_button_facebook_like" fb:like:layout="box_count"></a>
									<a class="addthis_button_tweet" tw:count="vertical"></a>
									<a class="addthis_button_google_plusone" g:plusone:size="tall"></a>
									<a class="addthis_counter"></a>
									</div>
									<script type="text/javascript">var addthis_config = {"data_track_addressbar":true};</script>
									<script type="text/javascript" src="http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4fdeb68215a52599"></script>
									<!-- AddThis Button END -->
									<img id="meme" class="meme" src="<?=$url?$url:'http://i.imgur.com/L7fAh.jpg'?>" />
									<div class="description"></div>
								</div>
							</div>
						</div>
					</div>
					<div style="clear:both"></div>
				</div>
			</div>
 	<!-- Affinity Ad Cloud Placeholder and Customization Code (Required) -->
<script type='text/javascript'>
     var _phPubId       = 'iae73';
     var _phWidth       = '160';
     var _phHeight      = '600';
     var _phBgColor     = '#ebebeb'; // For background color
     var _phBorderColor = '#999999'; // For border color
     var _phTextColor1  = '#006699'; // For Link 1 color
     var _phTextColor2  = '#333333'; // For Link 2 color
     var url = 'http://ph.affinity.com/ph-adcloud-m.js?' + 'h='+escape(location.hostname) + '&amp;pb=' + escape(_phPubId);
     document.write(unescape("%3Cscript src='" + url + "' type='text/javascript'%3E%3C/script%3E"));
</script>
		</div>
<!-- Affinity Primary Site Code (Required) -->
<script type='text/javascript'>
     var _phPubId = 'iae73';
     var url = 'http://ph.affinity.com/i/ph-i.js?' + 'h='+escape(location.hostname) + '&amp;pb=' + escape(_phPubId);
     document.write(unescape("%3Cscript src='" + url + "' type='text/javascript'%3E%3C/script%3E"));
</script>
	</body>
</html>