var Buddymeme = {
	models: {},
	views: {},
	routes: {},
	utils: {}
}

Buddymeme.routes.Router = Backbone.Router.extend({
	
	routes: {
		"meme/:image/:caption": "getMeme",
		"": "defaultRoute"
	}
	
})

Buddymeme.models.Meme = Backbone.Model.extend({
})

Buddymeme.models.Memes = Backbone.Collection.extend({
	model: Buddymeme.models.Meme
})
Buddymeme.models.Image = Backbone.Model.extend({
	//src, friend name, meta data (tags), fetch method, description
})

Buddymeme.models.Images = Backbone.Collection.extend({
	model: Buddymeme.models.Image,
	getRecentFromCloseFriends: function(){
		var algorithm = 'Images From The Past Month From "Close Friends"'
		var query1 = 'SELECT object_id,text FROM photo_tag WHERE subject in (SELECT actor_id FROM stream WHERE source_id=me() LIMIT 150) AND created >= now()-60*60*24*30'
		var query2 = 'SELECT object_id,src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM #query1) AND src_big_width > 200 AND src_big_height > 200'
		var multiquery = {"query1":query1, "query2":query2}
		var self = this;
		
		console.log('getting ' + algorithm)
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:multiquery},
	  		function(response){
	  			if(response){
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
					console.log('fetched ' + algorithm + ' (' +(+new Date()-start)/1000 +' seconds, ' + i + ' images)')
				}						
	  		}
	  	)
	},
	getLiked: function(){
		var algorithm = 'Images Liked By The User'
		var query = 'SELECT src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM like WHERE user_id=me() LIMIT 100) AND src_big_width > 200 AND src_big_height > 200'
		var self = this;
		
		console.log('getting ' + algorithm)
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}

					console.log('fetched ' + algorithm + ' (' +(+new Date()-start)/1000 +' seconds, ' + i + ' images)')
				}
	  		}
	  	)	
	 },
	getRecent: function(){
		var algorithm = 'Recent Images From News Feed'
		var query = "SELECT src_big,caption,src FROM photo WHERE pid in (SELECT attachment.media.photo.pid FROM stream WHERE filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') AND type=247 LIMIT 500) AND src_big_width > 200 AND src_big_height > 200"
		var self = this;
		
		console.log('getting ' + algorithm)
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:query},
	  		function(response){
	  			if(response){
					data = response.data
					for(i=0; i<data.length; i++){
						var image = new Buddymeme.models.Image()
						image.set({'caption':data[i].caption, 'image':data[i].src_big, 'algorithm':algorithm, 'thumb':data[i].src})
						self.add(image)
					}

					console.log('fetched ' + algorithm + ' (' +(+new Date()-start)/1000 +' seconds, ' + i + ' images)')
				}
	  		}
	  	)	
	 },
	 getRecentFromMessageBuddies: function(){
		var algorithm = 'Images From The Past Month From People You Recently Messaged'
		var query1 = 'SELECT object_id,text FROM photo_tag WHERE subject in (SELECT recipients FROM thread WHERE folder_id = 0) AND created >= now()-60*60*24*30'
		var query2 = 'SELECT object_id,src_big,caption,src FROM photo WHERE object_id in (SELECT object_id FROM #query1) AND src_big_width > 200 AND src_big_height > 200'
		var multiquery = {"query1":query1, "query2":query2}
		var self = this;
		
		console.log('getting ' + algorithm)
		var start = +new Date()
		FB.api(
	  		'fql',
	  		{q:multiquery},
	  		function(response){
	  			if(response){
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
					console.log('fetched ' + algorithm + ' (' +(+new Date()-start)/1000 +' seconds, ' + i + ' images)')
				}						
	  		}
	  	)	 
	 },
	 returnRandomMeme: function(){
		var self = this
		var length = this.length
		var nextRandom = Math.floor(Math.random()*length)

		//get image and set next image
		var image = this.at(nextRandom)
		var imagecaption = image.get('caption')
		if(imagecaption.indexOf('http://buddymeme.com') != -1){
			var caption = ''
		} else {
			var caption = captions[Math.floor(Math.random()*captions.length)]
		}
		
		var meme = new Buddymeme.models.Meme({image: image, caption: caption})
		console.log(image.get('algorithm'))
			//this.setRelated()
/*			
			console.log('Loading First Meme...')
			setTimeout(function(){
				self.Images.bind("add", function() {
					self.Images.unbind("add")
			        self.setNewMeme()
			    })
			}, 1) */
		}
		return meme;
	 }

})
  
Buddymeme.views.Masher = Backbone.View.extend({
	el:$('.masher'),
	events: {
		'click #lol': 'lolMeme',
		'click #meh': 'mehMeme',
		'click #skip': 'skipMeme',
		'click #rememe': 'reMeme'
	},
	initialize: function(){
		$('.masher').show()
		_.bindAll(this, 'render', 'setNewMeme', 'renderMeme', 'setRelated', 'startSpinner')
		this.Images = new Buddymeme.models.Images
		this.Router = new Buddymeme.routes.Router
		this.Memes = new Buddymeme.models.Memes({router: this.Router})
		Backbone.history.start()
		self = this
		this.Router.on('route:getMeme', function(image, caption){
			meme = new Buddymeme.models.Meme({
				image: image,
				caption: caption
			})
			next = self.Images.returnRandomMeme()
			self.Memes = new Buddymeme.models.Memes([meme, next])
			self.render()
			console.log(caption)
		})
		self = this
		setTimeout(function(){
			self.Images.getRecentFromCloseFriends()
			self.Images.getLiked()
			self.Images.getRecent()
			self.Images.getRecentFromMessageBuddies()
		}, 1)

		this.startSpinner()
		this.setNewMeme()
	},
	render: function(){
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
	setNewMeme: function(){
		//get new image from facebook
		//update model

	},
	renderMeme: function(){
		//get new meme from collection
	},
	mehMeme: function(){		
		this.setNewMeme()
		return false
	},
	reMeme: function(){
		
	},
	lolMeme: function(event){
		//make facebook open graph call
				
		//reroute
			//remodel
				//rerender
		this.reroute()
		//this.setNewMeme()
		return false
	},
	skipMeme: function (){
		this.setNewMeme()
		return false
	},
	reroute: function(){
		var next = this.Memes.at(1)
		this.Router.navigate('meme/' + next.get('image') + '/' + next.get('caption'), {trigger: true})
		
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
			image = this.Images.at(i).get('thumb')
			$('.related-wrapper').append('<div class="related" style="background-image:url('+image+')"></div>')
		}
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
	},
	fbAuth: function(event){
		var self = this
		FB.login(function(response){
			if (response.authResponse) {
				$('.auth').hide()
				
				var Masher = new Buddymeme.views.Masher()
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		}, {scope: 'read_stream,user_photos,friends_photos,user_likes,read_mailbox'})
	},
	renderAuth: function(){
		$('.auth').show()
	},
	checkAuth: function(){
		var self = this
		FB.getLoginStatus(function(response){
			if (response.status === 'connected') {
				var Masher = new Buddymeme.views.Masher()
			} else {
				self.renderAuth()
			}
		})
	}
	
})