<!doctype html>
<html>
	<head>
		<title>Meme It!</title>
		<link rel="stylesheet" href="css/buddymeme.css"/>
		<script type="text/javascript" src="http://use.typekit.com/rzf1fbu.js"></script>
		<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
	</head>	
	<body>
		<script>
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '132429983552387', // App ID
		      channelUrl : '//www.talktomindy.com/channel.php', // Channel File
		      status     : true, // check login status
		      cookie     : true, // enable cookies to allow the server to access the session
		      xfbml      : true  // parse XFBML
		    });
		    
			$(function(){
				$('#meme').css('max-height', window.innerHeight*.9 + 'px')

				var authie = new Buddymeme.views.Auth

				window.fbtest = function(){
					FB.api('/me/buddy-meme:lol&meme=http://samples.ogp.me/177014649093920','post',  function(response) {
						if (!response || response.error) {
						    alert('Error occured');
						  } else {
						    alert('Post was successful! Action ID: ' + response.id);
						  }
					});
				}

			})
		  };
		
		  // Load the SDK Asynchronously
		  (function(d){
		     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement('script'); js.id = id; js.async = true;
		     js.src = "//connect.facebook.net/en_US/all.js";
		     ref.parentNode.insertBefore(js, ref);
		   }(document));
		</script>

		<div class="auth">
			<button id="auth">Auth</button>
		</div>
		<div class="masher">
			<div class="container">
				<div class="inner-container">
					<div class="sidebar-container">
						<div class="sidebar">
							<div class="sidebar-inner">
								<div class="sidebar-wrapper">
									<div class="logo">BuddyMeme</div>
									<div class="votebar">
										<a href="#" id="lol" class="vote"><div class="icon"></div>LOL</a>
										<a href="#" id="meh" class="vote" ><div class="icon"></div>meh</a>
										<div style="clear:both"></div>
									</div>
									<div style="clear:both;"></div>
									<a id="rememe">Re-Caption This Picture</a>
									<div id="related-container" class="related-container">
										<div class="related-wrapper">
											<div class="related"></div>
											<div class="related"></div>
											<div class="related"></div>
											<div class="related"></div>
										</div>
										<div style="clear:both;"></div>
									</div>
									<div style="clear:both"></div>
									<div class="skip-container">
										<a id="skip">Skip this meme &raquo;</a>
									</div>
								</div>
							</div>
						</div>	
					</div>
					<div class="main-container">
						<div class="main">
							<div class="main-inner">
								<div class="meme-container" id="meme-container">
									<canvas id="meme">
									</canvas>
								</div>
							</div>
						</div>
					</div>
					<div style="clear:both"></div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js"></script>
		<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js"></script>
		<script type="text/javascript" src="js/spinner.js"></script>
		<script type="text/javascript" src="js/meme.js"></script>
		<script type="text/javascript" src="js/captions.js"></script>
		<script type="text/javascript" src="js/buddymeme.js"></script>
	</body>
</html>