var Buddymeme = {
	models: {},
	views: {},
	routes: {},
	utils: {}
}

Buddymeme.utils.serialize = function(fbUrl){
	var parts = fbUrl.split("/")
	var pieces = parts[parts.length-1]//.split("_n.jpg")[0]
	return pieces.substr(0,pieces.length-6)
}

Buddymeme.utils.unserialize = function(oid){
	return 'https://sphotos-b.xx.fbcdn.net/hphotos-ash3/' + oid + '_b.jpg'
}

Buddymeme.utils.unserializeThumb = function(oid){
	return 'https://sphotos-b.xx.fbcdn.net/hphotos-ash3/' + oid + '_s.jpg'
}

Buddymeme.utils.reserialize = function(fbUrl){
	return Buddymeme.utils.unserialize(Buddymeme.utils.serialize(fbUrl))
}

Buddymeme.utils.meme = function(){

}

Buddymeme.utils.getImageUrlFromOg = function(url){
	return Buddymeme.utils.unserialize(url.split('http://memeit.com/')[1].split('/')[0]);
}

Buddymeme.utils.getThumbUrlFromOg = function(url){
	return Buddymeme.utils.unserializeThumb(url.split('http://memeit.com/')[1].split('/')[0]);
}

Buddymeme.routes.Router = Backbone.Router.extend({
	
	routes: {
		"meme/*image/:caption": "getMeme",
		"meme/*image/": "getMeme",
		"meme/*image": "getMeme"
	}
	
})

Buddymeme.models.Meme = Backbone.Model.extend({
})

Buddymeme.models.Memes = Backbone.Collection.extend({
	model: Buddymeme.models.Meme
})

Buddymeme.models.User = Backbone.Model.extend({
	getData: function(){
		FB.api('/me', function(response){
			mixpanel.register({
				'distinct_id':response.id,
				'gender': response.gender
			})
			mixpanel.name_tag(response.name)
		})
	}
})

Buddymeme.models.Image = Backbone.Model.extend({
	//src, friend name, meta data (tags), fetch method, description
})

Buddymeme.models.Images = Backbone.Collection.extend({
	model: Buddymeme.models.Image,
	getRecentFromCloseFriends: function(){
		var algorithm = 'Get Recent Tags From Close Friends'
		var query = 'SELECT src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM photo_tag WHERE subject in (SELECT actor_id FROM stream WHERE source_id=me() LIMIT 150) AND created >= now()-60*60*24*30) AND src_big_width > 300 AND src_big_height > 300'
		var self = this;
		
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}

				}
	  		}
	  	)
	  	return false	
	},
	getProfilePicturesFromCloseFriends: function(){
		var algorithm = 'Get Profile Pictures From Close Friends'
		var query = "SELECT src_big,caption,src FROM photo WHERE aid in (SELECT aid FROM album WHERE owner in (SELECT actor_id FROM stream WHERE source_id=me() LIMIT 150) AND name='Profile Pictures') AND src_big_width > 300 AND src_big_height > 300"
		var self = this;
		
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}
				}
	  		}
	  	)	
	  	return false	
	},
	getLiked: function(){
		var algorithm = 'Images Liked By The User'
		var query = 'SELECT src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM like WHERE user_id=me() LIMIT 100) AND src_big_width > 300 AND src_big_height > 300'
		var self = this;
		
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}
				}
	  		}
	  	)	
	  	return false	
	},
	getLikeFiltered: function(){
		var algorithm = 'Images Liked By The User With at least 1 tag'
		var query = 'SELECT src_big, caption, src FROM photo WHERE object_id in (SELECT object_id FROM photo_tag WHERE object_id in (SELECT object_id FROM photo WHERE object_id in (SELECT object_id FROM like WHERE user_id=me() LIMIT 100))) AND src_big_width > 300 AND src_big_width > 300'
		var self = this;
		
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}
				}
	  		}
	  	)	
	  	return false	
	},
	getRecent: function(){
		var algorithm = 'Recent Images From News Feed'
		var query = "SELECT src_big,caption,src FROM photo WHERE pid in (SELECT attachment FROM stream WHERE filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') AND type=247 LIMIT 500) AND src_big_width > 300 AND src_big_height > 300"
		var self = this;
		
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}
				}
	  		}
	  	)	
	  	return false	
	 },
	 getRecentFromMessageBuddies: function(){
		var algorithm = 'Images From The Past Month From People You Recently Messaged'
		var query1 = 'SELECT object_id,text FROM photo_tag WHERE subject in (SELECT recipients FROM thread WHERE folder_id = 0) AND created >= now()-60*60*24*120'
		var query2 = 'SELECT object_id,src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM #query1) AND src_big_width > 300 AND src_big_height > 300'
		var multiquery = {"query1":query1, "query2":query2}
		var self = this;
		
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:multiquery},
	  		function(response){
	  			if(response && response.data){
					var data1 = response.data[0]['fql_result_set']
					var data2 = response.data[1]['fql_result_set']
					var data = []
					for(var i = 0; i < data2.length; i++){			
						data[data2[i].object_id] = {'image': data2[i].src_big, 'caption':data2[i].caption, 'name':'', algorithm:algorithm, 'thumb':data2[i].src}
						
					}
					for(var i = 0; i < data1.length; i++){
						if(data[data1[i].object_id]) {
							data[data1[i].object_id].name = data1[i].text
							var image = new Buddymeme.models.Image()
							image.set(data[data1[i].object_id])
							self.add(image)
						}
					}
				}						
	  		}
	  	)	 
	  	return false	
	 },
	 getPersonalProfilePictures: function(){
		var algorithm = 'Personal Profile Pictures'
		var query = "SELECT src_big,caption,src FROM photo WHERE aid in (SELECT aid FROM album WHERE owner=me() AND name='Profile Pictures') AND src_big_width > 300 AND src_big_height > 300"
		var self = this;
		
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}
				}
	  		}
	  	)	 
	  	return false	
	 },
	 getRecentPersonalPictures: function(){
		var algorithm = 'Personal Pictures'
		var query = "SELECT src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM photo_tag WHERE subject=me() AND created >= now()-60*60*24*30) AND src_big_width > 300 AND src_big_height > 300"
		var self = this;
		
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}
				}
	  		}
	  	)	 	
	  	return false	
	 },
	 getPersonalPictures: function(){
		var algorithm = 'All Personal Pictures'
		var query = "SELECT src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM photo_tag WHERE subject=me() AND src_big_width > 300 AND src_big_height > 300"
		var self = this;
		
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}
				}
	  		}
	  	)	 	
	  	return false	
	 },
	 getUploads: function(){
		var algorithm = 'Personal Uploads'
		var query = "SELECT src_big,caption,src FROM photo WHERE aid in (SELECT aid,name FROM album WHERE owner=me())"
		var self = this;
		
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}
				}
	  		}
	  	)	 	
	  	return false	
	 },
	 getRecentFromRandom: function(image){
		var algorithm = 'Get Recent From Random'
		var query = "SELECT uid1 FROM friend WHERE uid2 = me()"
		var self = this;
		
		FB.api(
			'fql',
			{q:query},
			function(response){
				if(response && response.data){
					self.getRecentFromFriends(response.data.length)
				}
			}		
		)
		 	
	  	return false	
	 },
	 getRecentFromFriends: function(count){
		var algorithm = 'Get Recent From Random'
		var start = +new Date()
		var max = Math.floor(Math.random()*(count+30))
		var min = max - 30
	 	var query = "SELECT src_big, caption, src FROM photo WHERE object_id in (SELECT object_id FROM photo_tag WHERE subject in (SELECT uid1 FROM friend WHERE uid2 = me() LIMIT " + min + "," + max + ") AND created >= now()-60*60*24*30)"
	 	var self = this
	 	FB.api(
	 		'fql',
	 		{q:query},
	 		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}
					
				}
	 			
	 		}
	 	)
	 },
	 getRecentFromFriendsMultiple: function(min, max){
	 	var algorithm = 'Get Recent From Random'
	 	if((20+min) <= max) {
	 		var u = 20+min
	 		var cont = true
	 	} else {
	 		var u = max
	 		var cont = false
	 	}
		var start = +new Date()
	 	var query = "SELECT src_big, caption, src FROM photo WHERE object_id in (SELECT object_id FROM photo_tag WHERE subject in (SELECT uid1 FROM friend WHERE uid2 = me() LIMIT " + min + "," + u + ") AND created >= now()-60*60*24*30)"
	 	var self = this
	 	var count = 0
	 	FB.api(
	 		'fql',
	 		{q:query},
	 		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}
					
					if(cont && count < 5){
						count = count+1
						self.getRecentFromFriends(u, max)
					}					
				}
	 			
	 		}
	 	)
	 	
	 },
	 getOgFromFriends: function(){
		var algorithm = 'Get OG Views From Friends'
		var query = "SELECT uid FROM user WHERE is_app_user = '1' AND uid IN (SELECT uid2 FROM friend WHERE uid1 = me())"
		var self = this
		
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response && response.data){
					data = response.data
					for(i=0; i<data.length;i++){
						self.getOgFromFriend(data[i].uid)
					}
/*					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					} */
				}
	  		}
	  	)	 	
	  	return false	
		
	 },
	 getOgFromFriend: function(uid){
		var algorithm = 'Get OG Views From Friends'
	 	var url = 'http://graph.facebook.com/'+uid+'/meme-it:view'
	 	var self = this
	 	FB.api(uid+'/meme-it:view', function(response){
	 		if(response.data.length > 0){
				for(i=0;i<response.data.length;i++){
		 			var caption = response.data[i].data.meme.title;
		 			var img = Buddymeme.utils.getImageUrlFromOg(response.data[i].data.meme.url)
		 			var thumb = Buddymeme.utils.getThumbUrlFromOg(response.data[i].data.meme.url)
					var image = new Buddymeme.models.Image()
					image.set({'viewCaption':caption, 'image':img, 'algorithm':algorithm, 'thumb':thumb})
					self.add(image)
				}
		 	}
	 	})
	 },
	 
	 //this function generates a random Meme object - optionally, you can pass in an image object and it will generate a meme object from that image
	 returnRandomMeme: function(image){
	 	//setting the self variable for when 'this' goes away. don't worry about this.
		var self = this
		
		//gets the total number of images stored right now, and selects a random number in that range
		var length = this.length
		var next = Math.floor(Math.random()*length)

		//if an image was passed in, that's the image that's going to be meme'd. If not, then it will be the random image we just generated
		var image = image || this.at(next)

		//this is the caption associated with the image, if any
		var imagecaption = image.get('caption')
		
		//if there is a 'viewCaption' ,that will be the caption of the image. This means that if there was a caption from the 'view' action, we don't generate a random caption and instead use the exact caption used from a friend's view action, so it will say "friend 1 and friend 2 viewed the same meme'
		if(image.get('viewCaption')){
			var caption = image.get('viewCaption')
		} else {
		
		//otherwise, just get a random caption from the captions variable in captions.js
		
		//FRONT END CAPTION ALGORITHM
			var cap_alg = function() {
				var skipper = Math.random()*100;
				var cap_number = Math.floor(Math.random()*captions.length);
				var capper = ((cap_number/captions.length) * 8) + 1;
				if((cap_number * cap_number) > skipper) {
					cap_alg();
				}
				return cap_number;
			}
			
			var caption = captions[cap_alg()];
			/**/
			
			
			//var caption = captions[Math.floor(Math.random()*captions.length)]
			
		}
		
		//create a meme object to be returned by the function, and return it
		var meme = new Buddymeme.models.Meme({image: image.get('image'), caption: caption, algorithm: image.get('algorithm')})
		return meme
	 },
	 returnAndDeleteRandomMeme: function(){
		var self = this
		
		var length = this.length
		var next = Math.floor(Math.random()*length)

		var image = this.at(next)
		this.remove(next)

		var imagecaption = image.get('caption')
		
		if(image.get('viewCaption')){
			var caption = image.get('viewCaption')
		} else {
			var caption = captions[Math.floor(Math.random()*captions.length)]
		}
		
		var meme = new Buddymeme.models.Meme({image: image.get('image'), caption: caption, algorithm: image.get('algorithm')})
		return meme
	 }
})
  
Buddymeme.views.Masher = Backbone.View.extend({
	el:$('.masher'),
	events: {
		'click #lol': 'lolMeme',
		'click #meh': 'mehMeme',
		'click #next': 'skipMeme',
		'click #rememe': 'reMeme',
		"click .related": 'showRelated',
		"click #prev": 'back',
		"click #logout": 'logout',
		"click .fbshare": 'fbshare',
		"click .fbsend": 'fbsend',
		"click #unlock": 'shareSite'
	},
	initialize: function(){
		$('.masher').show()
		_.bindAll(this, 'render', 'setRelated', 'startSpinner', 'stopSpinner', 'preload', 'navigate', 'key_handler', 'unlockPremium')
		$(document).bind('keydown', this.key_handler);
		this.Images = new Buddymeme.models.Images
		this.ogImages = new Buddymeme.models.Images
		this.Router = new Buddymeme.routes.Router
		this.Memes = new Buddymeme.models.Memes
		this.User = new Buddymeme.models.User
		this.User.getData()
		this.doubleViewCounter = 0
		this.loadCounter = 0
		first = true;
		var self = this
		this.Router.on('route:getMeme', function(image, caption){
			//self.Images.unbind("add")
			meme = new Buddymeme.models.Meme({
				image: Buddymeme.utils.unserialize(image),
				caption: decodeURIComponent(caption) || ''
			})
			
/*			if(self.Memes.at(1)){
				meme.set('algorithm', self.Memes.at(1).get('algorithm'))
			} */

			if(self.algorithm){
				meme.set('algorithm', self.algorithm)
			}
			
			url = 'http://memeit.com/'+Buddymeme.utils.serialize(meme.get('image'))+'/'+encodeURIComponent(meme.get('caption'))
			ogPost = function(){
				FB.api('/me/meme-it:view&meme='+url,'post',  function(response) {
					mixpanel.track('og view', {
						'algorithm': meme.get('algorithm'),
						'caption': meme.get('caption')			
					})
				})
			}
			
			if((typeof ogTimeout === 'undefined')){
			} else {
				clearTimeout(ogTimeout)			
			}
			
			if((this.loadCounter == 0) || (self.Memes.at(0) && (self.Memes.at(0).get('algorithm') == 'Get OG Views From Friends'))){
				ogPost()
			} else {
				ogTimeout = setTimeout(ogPost,3000)
			}

			if((self.doubleViewCounter < 20) && self.ogImages.length > 0){
				next = self.ogImages.returnAndDeleteRandomMeme()
				self.doubleViewCounter++
			} else {
				next = self.Images.returnRandomMeme()
			}

			self.Memes = new Buddymeme.models.Memes([meme, next])
			
			if(first == true){
				mixpanel.track('first caption', {'caption':decodeURIComponent(caption)})
				first = false;
			}
						
			this.loadCounter++
			self.render()
		})
			
		this.Images.bind("add", function() {
			if(self.Images.length > 3){
				self.Images.unbind("add")
				setTimeout(function(){
					self.Images.getRecentPersonalPictures()
					self.Images.getPersonalProfilePictures()
					self.Images.getRecentFromCloseFriends()
					self.Images.getProfilePicturesFromCloseFriends()
					self.Images.getLiked()
					self.Images.getUploads()
					self.Images.getPersonalPictures()
				}, 1)
				if(Backbone.history.start()){
//					var meme = new Buddymeme.models.meme({image: )
//					var next = self.Images.returnRandomMeme()
				} else {
					var next = self.Images.returnRandomMeme()
					self.navigate(next)
					first = false			
				}
				$('.sharing-overlay').show()
			}
		})
		
		this.Memes.bind("add", function(){
			self.render()
		})

		setTimeout(function(){
 			var caption = 'Genius. Billionaire. Playboy. Philanthropist.'
 			var img = 'https://fbcdn_sphotos_a-a.akamaihd.net/hphotos-ak-ash3/428953_3625731639306_616515114_b.jpg'
 			var thumb = 'https://fbcdn_sphotos_a-a.akamaihd.net/hphotos-ak-ash3/428953_3625731639306_616515114_s.jpg'
			var image = new Buddymeme.models.Image()
			image.set({'viewCaption':caption, 'image':img, 'algorithm':'nba meme', 'thumb':thumb})
			self.Images.add(image)
			self.Images.getLikeFiltered()
			self.Images.getRecent()
			self.Images.getRecentFromMessageBuddies()
			self.Images.getRecentFromRandom()
			self.ogImages.getOgFromFriends()
		}, 1)

		FB.api('me/og.likes', function(response){
			if(response.data.length > 0) {
				self.unlockPremium()
			}
		})

		$('#unlock').mouseenter(function(){
			unlockCopy = $('#unlock').html()
			$('#unlock').html('Like Memeit.com');
		}).mouseleave(function(){
			$('#unlock').html(unlockCopy);		
		})

		this.startSpinner()
	},
	render: function(){
		self = this
		meme = this.Memes.at(0)
		this.spinner.spin()
		if(typeof meme.get('caption') == "string"){
			Meme(Buddymeme.utils.reserialize(meme.get('image')), 'meme', '', meme.get('caption'), function(){
				self.spinner.stop()
			})
		}
		
		//set copyable link url
		$('#link').val('http://memeit.com/'+Buddymeme.utils.serialize(meme.get('image'))+'/'+encodeURIComponent(meme.get('caption')))
		
		//create facebook like button
		//<div class="fb-like" data-href="" data-send="false" data-layout="button_count" data-width="1" data-show-faces="true" data-font="arial"></div>
		
		$('.fb-like-container').html('<div class="fb-like" data-href="http://memeit.com/' + Buddymeme.utils.serialize(meme.get('image')) + '/' + encodeURIComponent(meme.get('caption')) + '" data-send="false" data-layout="button_count" data-width="1" data-show-faces="true" data-font="arial"></div>')
		FB.XFBML.parse()
		//$('.fb-like-container').innerHTML = attr('data-href', 'http://memeit.com/'+Buddymeme.utils.serialize(meme.get('image'))+'/'+encodeURIComponent(meme.get('caption')))
		mixpanel.track('newload', {
			'algorithm': meme.get('algorithm'),
			'caption': meme.get('caption')			
		})
		console.log(this.Memes.at(0).get('algorithm'))
		this.preload(this.Memes.at(1))
		this.setRelated()
		
	},
	startSpinner: function(){
		var opts = {
		  lines: 16, // The number of lines to draw
		  length: 12, // The length of each line
		  width: 5, // The line thickness
		  radius: 20, // The radius of the inner circle
		  rotate: 0, // The rotation offset
		  color: '#000', // #rgb or #rrggbb
		  speed: 3, // Rounds per second
		  trail: 30, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: true, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9, // The z-index (defaults to 2000000000)
		  top: 'auto', // Top position relative to parent in px
		  left: 'auto' // Left position relative to parent in px
		}
		var target = document.getElementById('meme-container')
		this.spinner = new Spinner(opts).spin(target)
	},
	stopSpinner: function(){
		this.spinner.stop()
	},
	mehMeme: function(){		
		meme = this.Memes.at(0)
		mixpanel.track('meh', {
			'algorithm': meme.get('algorithm'),
			'caption': meme.get('caption')			
		})
		this.reroute()
		return false
	},
	reMeme: function(){
		var next = this.Images.returnRandomMeme(this.Memes.at(0))
		this.navigate(next)
	},
	lolMeme: function(event){
		meme = this.Memes.at(0)
		mixpanel.track('lol', {
			'algorithm': meme.get('algorithm'),
			'caption': meme.get('caption')			
		})

		this.reroute()
		return false
	},
	skipMeme: function (){
		meme = this.Memes.at(0)
		mixpanel.track('skip', {
			'algorithm': meme.get('algorithm'),
			'caption': meme.get('caption')			
		})

		this.reroute()
		return false
	},
	back: function(){
		window.history.back()
		meme = this.Memes.at(0)
		mixpanel.track('back', {
			'algorithm': meme.get('algorithm'),
			'caption': meme.get('caption')			
		})
		return false
	},
	reroute: function(){
		var next = this.Memes.at(1)
		this.navigate(next) //.get('image'), next.get('caption'));
//		this.Router.navigate('meme/' + Buddymeme.utils.serialize(next.get('image')) + ((next.get('caption'))?('/' + encodeURIComponent(next.get('caption'))):''), {trigger: true})
	},
	navigate: function(image){
		this.Router.navigate('meme/' + Buddymeme.utils.serialize(image.get('image')) + ((image.get('caption'))?('/' + encodeURIComponent(image.get('caption'))):''), {trigger: true})
		this.algorithm = image.get('algorithm')
	},
	setRelated: function(){
		length = this.Images.length
		var rands = []
		var count = 0
		while(rands.length < 4){
		  var randomnumber=Math.floor(Math.random()*length)
		  var found=false
		  for(var i=0;i<rands.length;i++){
		    if(rands[i]==randomnumber){
		    	found=true
		    	break
		    }
		  }
		  if(!found) {
		  	rands[rands.length]=randomnumber
		  }

		  count++

		  if (count >= 100) {
		  	break
		  }
		}
		
		$('.related-wrapper').empty()
		for(i = 0; i<rands.length; i++){
			image = this.Images.at(rands[i]).get('thumb')
			$('.related-wrapper').append('<div class="related" style="background-image:url('+image+')" data-index=' + rands[i] + '></div>')
		}
	},
	showRelated: function(evt){
		index = $(evt.target).attr('data-index')
		image = this.Images.at(index)
		meme = this.Images.returnRandomMeme(image)
		this.spinner.spin()
		mixpanel.track('clicked related', {
			'algorithm': meme.get('algorithm'),
			'caption': meme.get('caption')			
		})
		this.navigate(meme)
	},
	preload: function(image){
		img = new Image()
		img.src = Buddymeme.utils.reserialize(image.get('image'))
	},
	key_handler: function(evt){
		switch(evt.which){
			case 37:
				this.back()
				break;
			case 38:
//				this.lolMeme()
				break;
			case 39:
				this.skipMeme()
				break;
			case 40:
//				this.mehMeme()
				break;
			default:
		}
	},
	logout: function(evt){
		self = this
		FB.logout(function(response){
			window.location.reload()
		})
	},
	fbshare: function(evt){
		var meme = this.Memes.at(0)
		var image = meme.get('image')
		var imageId = Buddymeme.utils.serialize(image)
		var caption = meme.get('caption')
		var encodedCaption = encodeURIComponent(caption)
/*		FB.ui({
			method:'feed', 
			link:'http://memeit.com/' + imageId + '/' + encodedCaption,
			name: caption,
			caption:'Meme It!'
		}, function(resposne){
			console.log(response)
		}) */
//		popup = window.open('http://facebook.com/sharer.php?u=http://memeit.com/' + imageId + '/' + encodedCaption, 'share','height=320,width=640')
		
		var left = (screen.width/2)-(640/2);
		var top = (screen.height/2)-(340/2)-100;
		var popup = window.open ('http://facebook.com/sharer.php?u=http://memeit.com/' + imageId + '/' + encodedCaption, 'share', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+640+', height='+340+', top='+top+', left='+left);

		if (popup.focus) {newwindow.focus()}
		return false;
	
		mixpanel.track('fbshare', {
			'algorithm': meme.get('algorithm'),
			'caption': meme.get('caption')			
		})
	},
	fbsend: function(evt){
		var meme = this.Memes.at(0)
		var image = meme.get('image')
		var imageId = Buddymeme.utils.serialize(image)
		var caption = meme.get('caption')
		var encodedCaption = encodeURIComponent(caption)
		var url = 'https://www.facebook.com/connect/uiserver.php?app_id=132429983552387&method=permissions.request&redirect_uri=' + encodeURIComponent('http://memeit.com/' + imageId + '/' + encodedCaption) + '&response_type=token&display=page&auth_referral=1'
		var url = 'http://memeit.com/' + imageId + '/' + encodedCaption
		FB.ui({
			method:'send', 
			link: url,//'http://memeit.com/' + imageId + '/' + encodedCaption,
/*			picture: 'https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url=' + image + '&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image/*', */
/*			picture: 'http://memeit.com/proxy.php?url=' + image, */
			name: caption,
			caption:'Meme It!'
		}, function(resposne){
			console.log(response)
		})
		mixpanel.track('fbsend', {
			'algorithm': meme.get('algorithm'),
			'caption': meme.get('caption')			
		})
	},
	shareSite: function(){
		FB.api('/me/og.likes', {object: 'http://memeit.com'}, 'post', function(response){
		})
		mixpanel.track('unlock')
		this.unlockPremium()
	},
	unlockPremium: function(){
		$('#unlock').hide()
		$('.premium-disclaimer').html('Dirty Captions Enabled!')
		//window.captions = window.premiumcaptions
	}

})

Buddymeme.views.Auth = Backbone.View.extend({
	el:$('.auth'),
	events: {
		'click #auth': 'fbAuth'
	},
	initialize: function(){
		_.bindAll(this, 'fbAuth','checkAuth','renderAuth')
		this.checkAuth()
		mixpanel.track('loaded splash')
	},
	fbAuth: function(event){
//		window.location = 'https://www.facebook.com/dialog/oauth?api_key=132429983552387&app_id=132429983552387&client_id=132429983552387&display=page&domain=memeit.com&locale=en_US&redirect_uri=http%3A%2F%2Fstatic.ak.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D8%23cb%3Df5749b7ac%26origin%3Dhttp%253A%252F%252Fmemeit.com%252Ff1e4d2a084%26domain%3Dmemeit.com%26relation%3Dopener%26frame%3Df376ea420&response_type=token%2Csigned_request&scope=read_stream%2Cuser_photos%2Cfriends_photos%2Cuser_likes%2Cread_mailbox';
		var self = this
		FB.login(function(response){
			if (response.authResponse) {
				$('.auth').hide()
				mixpanel.track('authed', response.authResponse)
				var Masher = new Buddymeme.views.Masher()
			} else {
				alert('you must authorize in order to use Meme It');
				console.log('User cancelled login or did not fully authorize.');
			}
		}, {scope: 'publish_actions,read_stream,user_photos,friends_photos,user_likes,read_mailbox,xmpp_login'})
		mixpanel.track('clicked auth')
	},
	renderAuth: function(){
		$('.auth').show()
	},
	checkAuth: function(){
		var self = this
		FB.getLoginStatus(function(response){
			if (response.status === 'connected') {
				var Masher = new Buddymeme.views.Masher()
				mixpanel.track('already logged in')
			} else {
				self.renderAuth()
			}
		})
	}
	
})