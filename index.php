<!doctype html>
<html>
	<head>
		<title>Meme It!</title>
		<link rel="stylesheet" href="css/buddymeme.css"/>
		<script type="text/javascript" src="http://use.typekit.com/rzf1fbu.js"></script>
		<link rel="icon" href="http://memeit.s3.amazonaws.com/favicon.png" type="image/x-icon">
		<link rel="shortcut icon" href="http://memeit.s3.amazonaws.com/favicon.png" type="image/x-icon">
		<!-- start TypeKit --><script type="text/javascript">try{Typekit.load();}catch(e){}</script><!-- end TypeKit -->
		
		<!-- start Mixpanel --><script type="text/javascript">(function(d,c){var a,b,g,e;a=d.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"===d.location.protocol?"https:":"http:")+'//api.mixpanel.com/site_media/js/api/mixpanel.2.js';b=d.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b);c._i=[];c.init=function(a,d,f){var b=c;"undefined"!==typeof f?b=c[f]=[]:f="mixpanel";g="disable track track_pageview track_links track_forms register register_once unregister identify name_tag set_config".split(" ");
		for(e=0;e<g.length;e++)(function(a){b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,0)))}})(g[e]);c._i.push([a,d,f])};window.mixpanel=c})(document,[]);
		mixpanel.init("c0d8bd417fae5251175bf6da64ba694f");</script><!-- end Mixpanel -->
		
		<!-- start Google Analytics --><script type="text/javascript">

 		 var _gaq = _gaq || [];
  		_gaq.push(['_setAccount', 'UA-18115656-8']);
 		 _gaq.push(['_trackPageview']);
	
  		(function() {
  		  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  		  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
   		 var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 		})();
		</script><!-- end Google Analytics -->
	</head>	
	<body>
		<script>
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '132429983552387', // App ID
		      channelUrl : '//www.memeit.com/channel.php', // Channel File
		      status     : true, // check login status
		      cookie     : true, // enable cookies to allow the server to access the session
		      xfbml      : true  // parse XFBML
		    });
		    
			$(function(){
				$('#meme').css('max-height', window.innerHeight*.9 + 'px')

				var authie = new Buddymeme.views.Auth

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
			<div style="display:table;width:100%;height:100%;">
				<div class="auth-wrapper">
					<div class="auth-box">
						<img src="/images/splash-logo.png" class="splash-logo" />
						<div class="pitch">View hilarious memes of your friends. We need you to login with Facebook so we can fetch photos of your friends. We never post anything without your permission.</div>
						<button id="auth">Login with Facebook</button>
					</div>
				</div>
			</div>
		</div>
		<div class="masher">
			<div class="container">
				<div class="inner-container">
					<div class="sidebar-container">
						<div class="sidebar">
							<div class="sidebar-inner">
								<div class="sidebar-wrapper">
									<div class="logo">BuddyMeme</div>
									<div class="browse-container">
										<a id="prev" class="browse uibutton">&laquo;</a>
										<a id="next" class="browse uibutton">Next Meme &raquo;</a>
										<div style="clear:both;"></div>
									</div>
									<div class="sharing-container">
										<a class="uibutton confirm fbshare" target="_blank">Share</a>										
										<a class="uibutton confirm fbsend">Send to Friend</a>										
									</div>
									<div style="clear:both;"></div>
									<a id="rememe">Shuffle Caption</a>
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
									<div class="sharing-overlay">
										<div class="sharing-inner">
											<div class="animation-wrapper">
												<a class="uibutton large confirm fbshare" id="fbshare"><div class="icon"></div>Share</a>
												<a class="uibutton large confirm fbsend" id="fbsend"><div class="icon"></div>Send to Friend</a>
												<div class="fb-like-container"><div class="fb-like" data-href="" data-send="false" data-layout="button_count" data-width="1" data-show-faces="true" data-font="arial"></div></div>
												<div class="copy">
													<input name="link" id="link" onclick="select()" readonly="readonly"/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div style="clear:both"></div>
				</div>
			</div>
			<div class="footer"><a id="logout">Logout</a></div>
		</div>
		<a class="mixpanel" href="https://mixpanel.com/f/partner" target="_blank"><img src="https://mixpanel.com/site_media/images/partner/badge_blue.png" alt="Mobile and Web Analytics" /></a>
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
		<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js"></script>
		<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js"></script>
		<script type="text/javascript" src="js/spinner.js"></script>
		<script type="text/javascript" src="js/meme.js"></script>
		<script type="text/javascript" src="js/captions.js"></script>
		<script type="text/javascript" src="js/buddymeme.js"></script>
		
		<!-- begin olark code --><script data-cfasync="false" type='text/javascript'>/*{literal}<![CDATA[*/
window.olark||(function(c){var f=window,d=document,l=f.location.protocol=="https:"?"https:":"http:",z=c.name,r="load";var nt=function(){f[z]=function(){(a.s=a.s||[]).push(arguments)};var a=f[z]._={},q=c.methods.length;while(q--){(function(n){f[z][n]=function(){f[z]("call",n,arguments)}})(c.methods[q])}a.l=c.loader;a.i=nt;a.p={0:+new Date};a.P=function(u){a.p[u]=new Date-a.p[0]};function s(){a.P(r);f[z](r)}f.addEventListener?f.addEventListener(r,s,false):f.attachEvent("on"+r,s);var ld=function(){function p(hd){hd="head";return["<",hd,"></",hd,"><",i,' onl' + 'oad="var d=',g,";d.getElementsByTagName('head')[0].",j,"(d.",h,"('script')).",k,"='",l,"//",a.l,"'",'"',"></",i,">"].join("")}var i="body",m=d[i];if(!m){return setTimeout(ld,100)}a.P(1);var j="appendChild",h="createElement",k="src",n=d[h]("div"),v=n[j](d[h](z)),b=d[h]("iframe"),g="document",e="domain",o;n.style.display="none";m.insertBefore(n,m.firstChild).id=z;b.frameBorder="0";b.id=z+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){b.src="javascript:false"}b.allowTransparency="true";v[j](b);try{b.contentWindow[g].open()}catch(w){c[e]=d[e];o="javascript:var d="+g+".open();d.domain='"+d.domain+"';";b[k]=o+"void(0);"}try{var t=b.contentWindow[g];t.write(p());t.close()}catch(x){b[k]=o+'d.write("'+p().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}a.P(2)};ld()};nt()})({loader: "static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend","declare","identify"]});
/* custom configuration goes here (www.olark.com/documentation) */
olark.identify('1679-587-10-7412');/*]]>{/literal}*/</script><noscript><a href="https://www.olark.com/site/1679-587-10-7412/contact" title="Contact us" target="_blank">Questions? Feedback?</a> powered by <a href="http://www.olark.com?welcome" title="Olark live chat software">Olark live chat software</a></noscript><!-- end olark code -->
	
	</body>
</html>