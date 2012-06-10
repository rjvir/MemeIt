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
	return 'https://fbcdn_sphotos_a-a.akamaihd.net/hphotos-ak-ash3/' + oid + '_b.jpg'
}

Buddymeme.utils.reserialize = function(fbUrl){
	return Buddymeme.utils.unserialize(Buddymeme.utils.serialize(fbUrl))
}

Buddymeme.utils.meme = function(){

}

Buddymeme.routes.Router = Backbone.Router.extend({
	
	routes: {
		"meme/*image/:caption": "getMeme",
		"meme/*image/": "getMeme",
		"meme/*image": "getMeme",
		"": "defaultRoute"
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
/*	getRecentFromCloseFriends: function(){
		var algorithm = 'Images From The Past Month From "Close Friends"'
		var query1 = 'SELECT object_id,text FROM photo_tag WHERE subject in (SELECT actor_id FROM stream WHERE source_id=me() LIMIT 150) AND created >= now()-60*60*24*30'
		var query2 = 'SELECT object_id,src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM #query1) AND src_big_width > 200 AND src_big_height > 200'
		var multiquery = {"query1":query1, "query2":query2}
		var self = this
		
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
					mixpanel.track('fetched ' + algorithm,{
						time: (+new Date()-start),
						images: i
					})
				}						
	  		}
	  	)
	},*/
	
	//SELECT src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM photo_tag WHERE subject in (SELECT actor_id FROM stream WHERE source_id=me() LIMIT 150) AND created >= now()-60*60*24*30) AND src_big_width > 200 AND src_big_height > 200
	getRecentFromCloseFriends: function(){
		var algorithm = 'Get Recent Tags From Close Friends'
		var query = 'SELECT src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM photo_tag WHERE subject in (SELECT actor_id FROM stream WHERE source_id=me() LIMIT 150) AND created >= now()-60*60*24*30) AND src_big_width > 200 AND src_big_height > 200'
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

					mixpanel.track('fetched ' + algorithm,{
						time: (+new Date()-start),
						images: i
					})
				}
	  		}
	  	)
	  	return false	
	},
	getProfilePicturesFromCloseFriends: function(){
		var algorithm = 'Get Profile Pictures From Close Friends'
		var query = "SELECT src_big,caption,src FROM photo WHERE aid in (SELECT aid FROM album WHERE owner in (SELECT actor_id FROM stream WHERE source_id=me() LIMIT 150) AND name='Profile Pictures') AND src_big_width > 200 AND src_big_height > 200"
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

					mixpanel.track('fetched ' + algorithm,{
						time: (+new Date()-start),
						images: i
					})
				}
	  		}
	  	)	
	  	return false	
	},
	getLiked: function(){
		var algorithm = 'Images Liked By The User'
		var query = 'SELECT src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM like WHERE user_id=me() LIMIT 100) AND src_big_width > 200 AND src_big_height > 200'
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

					mixpanel.track('fetched ' + algorithm,{
						time: (+new Date()-start),
						images: i
					})
				}
	  		}
	  	)	
	  	return false	
	},
	getLikeFiltered: function(){
		var algorithm = 'Images Liked By The User With at least 1 tag'
		var query = 'SELECT src_big, caption, src FROM photo WHERE object_id in(SELECT object_id FROM photo_tag WHERE object_id in (SELECT object_id FROM photo WHERE object_id in (SELECT object_id FROM like WHERE user_id=me() LIMIT 100))) AND src_big_width > 200 AND src_big_width > 200'
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

					mixpanel.track('fetched ' + algorithm,{
						time: (+new Date()-start),
						images: i
					})
				}
	  		}
	  	)	
	  	return false	
	},
	getRecent: function(){
		var algorithm = 'Recent Images From News Feed'
		var query = "SELECT src_big,caption,src FROM photo WHERE pid in (SELECT attachment.media.photo.pid FROM stream WHERE filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') AND type=247 LIMIT 500) AND src_big_width > 200 AND src_big_height > 200"
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

					mixpanel.track('fetched ' + algorithm,{
						time: (+new Date()-start),
						images: i
					})
				}
	  		}
	  	)	
	  	return false	
	 },
	 getRecentFromMessageBuddies: function(){
		var algorithm = 'Images From The Past Month From People You Recently Messaged'
		var query1 = 'SELECT object_id,text FROM photo_tag WHERE subject in (SELECT recipients FROM thread WHERE folder_id = 0) AND created >= now()-60*60*24*30'
		var query2 = 'SELECT object_id,src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM #query1) AND src_big_width > 200 AND src_big_height > 200'
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
					mixpanel.track('fetched ' + algorithm,{
						time: (+new Date()-start),
						images: i
					})
				}						
	  		}
	  	)	 
	  	return false	
	 },
	 getPersonalProfilePictures: function(){
		var algorithm = 'Personal Profile Pictures'
		var query = "SELECT src_big,caption,src FROM photo WHERE aid in (SELECT aid FROM album WHERE owner=me() AND name='Profile Pictures') AND src_big_width > 200 AND src_big_height > 200"
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

					mixpanel.track('fetched ' + algorithm,{
						time: (+new Date()-start),
						images: i
					})
				}
	  		}
	  	)	 
	  	return false	
	 },
	 getRecentPersonalPictures: function(){
		var algorithm = 'Personal Pictures'
		var query = "SELECT src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM photo_tag WHERE subject=me() AND created >= now()-60*60*24*30) AND src_big_width > 200 AND src_big_height > 200"
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

					mixpanel.track('fetched ' + algorithm,{
						time: (+new Date()-start),
						images: i
					})
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
					self.getRecentFromFriends(0,response.data.length)
				}
			}		
		)
		 	
	  	return false	
	 },
	 getRecentFromFriends: function(min, max){
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

					mixpanel.track('fetched ' + algorithm,{
						time: (+new Date()-start),
						images: i
					})
					
					if(cont){
						self.getRecentFromFriends(u, max)
					}
					
				}
	 			
	 		}
	 	)
	 	
	 },
	 returnRandomMeme: function(image){
		var self = this
		var length = this.length
		var next = Math.floor(Math.random()*length)

		//get image and set next image
		var image = image || this.at(next)
		var imagecaption = image.get('caption')
		if(imagecaption.indexOf('http://buddymeme.com') != -1){
			var caption = ''
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
		'click #skip': 'skipMeme',
		'click #rememe': 'reMeme',
		"click .related": 'showRelated',
		"click #back": 'back'
	},
	initialize: function(){
		$('.masher').show()
		_.bindAll(this, 'render', 'setRelated', 'startSpinner', 'stopSpinner', 'preload', 'navigate')
		this.Images = new Buddymeme.models.Images
		this.Router = new Buddymeme.routes.Router
		this.Memes = new Buddymeme.models.Memes
		this.User = new Buddymeme.models.User
		this.User.getData()
		Backbone.history.start()
		self = this
		this.Router.on('route:getMeme', function(image, caption){
			self.Images.unbind("add")
			meme = new Buddymeme.models.Meme({
				image: Buddymeme.utils.unserialize(image),
				caption: decodeURIComponent(caption) || ''
			})
			next = self.Images.returnRandomMeme()
			self.Memes = new Buddymeme.models.Memes([meme, next])
			self.render()
		})
		
		this.Images.bind("add", function() {
			if(self.Images.length > 3){
				self.Images.unbind("add")
				var next = self.Images.returnRandomMeme()
				self.navigate(next)
			}
		})
		
		this.Memes.bind("add", function(){
			self.render()
			self.Images.getRecentPersonalPictures()
			self.Images.getPersonalProfilePictures()
		})

		setTimeout(function(){
			self.Images.getRecentFromCloseFriends()
			self.Images.getProfilePicturesFromCloseFriends()
			self.Images.getLiked()
			self.Images.getRecent()
			self.Images.getRecentFromMessageBuddies()
			self.Images.getRecentFromRandom()
		}, 1)

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
		
		mixpanel.track('load', {
			algorithm: meme.get('algorithm'),
			caption: meme.get('caption')			
		})
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
		};
		var target = document.getElementById('meme-container');
		this.spinner = new Spinner(opts).spin(target);	
	},
	stopSpinner: function(){
		this.spinner.stop()
	},
	mehMeme: function(){		
		meme = this.Memes.at(0)
		mixpanel.track('meh', {
			algorithm: meme.get('algorithm'),
			caption: meme.get('caption')			
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
			algorithm: meme.get('algorithm'),
			caption: meme.get('caption')			
		})

		this.reroute()
		return false
	},
	skipMeme: function (){
		meme = this.Memes.at(0)
		mixpanel.track('skip', {
			algorithm: meme.get('algorithm'),
			caption: meme.get('caption')			
		})

		this.reroute()
		return false
	},
	back: function(){
		window.history.back()
		meme = this.Memes.at(0)
		mixpanel.track('back', {
			algorithm: meme.get('algorithm'),
			caption: meme.get('caption')			
		})
		return false;
	},
	reroute: function(){
		var next = this.Memes.at(1)
		this.navigate(next) //.get('image'), next.get('caption'));
//		this.Router.navigate('meme/' + Buddymeme.utils.serialize(next.get('image')) + ((next.get('caption'))?('/' + encodeURIComponent(next.get('caption'))):''), {trigger: true})
	},
	navigate: function(image){
		this.Router.navigate('meme/' + Buddymeme.utils.serialize(image.get('image')) + ((image.get('caption'))?('/' + encodeURIComponent(image.get('caption'))):''), {trigger: true})
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
		mixpanel.track('clicked related')
		this.navigate(meme)
	},
	preload: function(image){
		img = new Image()
		img.src = Buddymeme.utils.reserialize(image.get('image'))
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
		var self = this
		FB.login(function(response){
			if (response.authResponse) {
				$('.auth').hide()
				mixpanel.track('authed', response.authResponse)
				var Masher = new Buddymeme.views.Masher()
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		}, {scope: 'read_stream,user_photos,friends_photos,user_likes,read_mailbox'})
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