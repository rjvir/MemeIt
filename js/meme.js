window.Meme = function(image, canvas, top, bottom, callback) {

	/*
	Default top and bottom
	*/

	top = top || '';
	bottom = bottom || '';

	/*
	Deal with the canvas
	*/

	// If it's nothing, set it to a dummy value to trigger error
	if (!canvas)
		canvas = 0;

	// If it's a string, conver it
	if (canvas.toUpperCase)
		canvas = document.getElementById(canvas);

	// If it's jQuery or Zepto, convert it
	if (($) && (canvas instanceof $))
		canvas = canvas[0];

	// Throw error
	if (!(canvas instanceof HTMLCanvasElement))
		throw new Error('No canvas selected');

	// Get context
	var context = canvas.getContext('2d');

	/*
	Deal with the image
	*/

	// If there's no image, set it to a dummy value to trigger an error
	if (!image)
		image = 0;

	// Convert it from a string
	if (image.toUpperCase) {
		var src = image;
		image = new Image();
		image.src = src;
	}

	// Set the proper width and height of the canvas
	var setCanvasDimensions = function(w, h) {
		canvas.width = w;
		canvas.height = h;
	};
	setCanvasDimensions(image.width, image.height);	

	callback = callback || function(){}

	/*
	Draw a centered meme string
	*/

	var drawText = function(text, topOrBottom, y) {
		
		//text = text.toUpperCase;

		// Variable setup
		topOrBottom = topOrBottom || 'top';
		var fontSize = (canvas.height / 8);
		if (fontSize>60){
			fontSize = 60
		}
		var x = canvas.width / 2;
		if (typeof y === 'undefined') {
			y = fontSize;
			if (topOrBottom === 'bottom')
				y = canvas.height - 20;
		}

		// Should we split it into multiple lines?
		if (context.measureText(text).width > (canvas.width * 1.0)) {

			// Split word by word
			var words = text.split(' ');
			var wordsLength = words.length;

			// Start with the entire string, removing one word at a time. If
			// that removal lets us make a line, place the line and recurse with
			// the rest. Removes words from the back if placing at the top;
			// removes words at the front if placing at the bottom.
			if (topOrBottom === 'top') {
				var i = wordsLength;
				while (i --) {
					var justThis = words.slice(0, i).join(' ');
					if (context.measureText(justThis).width < (canvas.width * .9)) {
						drawText(justThis, topOrBottom, y);
						drawText(words.slice(i, wordsLength).join(' '), topOrBottom, y + fontSize);
						return;
					}
				}
			}
			else if (topOrBottom === 'bottom') {
				for (var i = 0; i < wordsLength; i ++) {
					var justThis = words.slice(i, wordsLength).join(' ');
					if (context.measureText(justThis).width < (canvas.width * .9)) {
						drawText(justThis, topOrBottom, y);
						drawText(words.slice(0, i).join(' '), topOrBottom, y - fontSize);
						return;
					}
				}
			}

		}

		// Draw!
		context.fillText(text, x, y, canvas.width * 1.0);
		context.strokeText(text, x, y, canvas.width * 1.0);

	};

	/*
	Do everything else after image loads
	*/

	image.onload = function() {

		// Set dimensions
		setCanvasDimensions(this.width, this.height);

		// Draw the image
		context.drawImage(image, 0, 0);

		// Set up text variables
		context.fillStyle = 'white';
		context.strokeStyle = 'black';
		context.lineWidth = 2;
		var fontSize = (canvas.height / 8);
		if(fontSize > 60){
			fontSize = 60
		}
		context.font = '800 ' + fontSize + 'px futura-pt-1';
		context.textAlign = 'center';

		// Draw them!
		drawText(top, 'top');
		drawText(bottom, 'bottom');
		callback()

	};

};