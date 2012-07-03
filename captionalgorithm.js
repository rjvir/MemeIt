/**
 * @author David Fontenot
 */

/* 1. Request first caption, captions from mixpanel and store in an array....if a caption has 3 appearances as a first caption, put it in the array three times.

//Request to Mixpanel API, that sets values into an array




 * * 2. Loop through the first captions array
 * 		3. If(first caption[i] === captionlist)
 

//The lower the number in the array, the more valuable the caption
for(i = 0; i < firstcaptions.length; i++){
	for(j = 1; j < captionlist.length; j++){
		if(firstcaptions[i] === captionlist[j]){
			[captionlist[j], captionlist[j-1]] = [captionlist[j-1], captionlist[j]];
		}
	}
}
