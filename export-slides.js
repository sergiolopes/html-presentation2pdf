/**
	
	Export a lot of PNG files from your cool HTML5 presentation.
	(requires PhantomJS)

	Created by Sérgio Lopes - http://sergiolopes.org/

 */
(function(){

	// check params
	if (phantom.args.length < 2 || phantom.args.length > 5) {
	    console.log('Check your params.');
	    console.log('Usage: phantomjs export-slides.js http://example.com/presentation destination-folder/')
	    console.log('  (optional parameters to follow: <transition wait ms> <slide width px> <slide height px>)')
	    console.log('  (example: phantomjs export-slides.js http://example.com/presentation destination-folder/ 800 1024 768')
	    phantom.exit();   
	}

	// configure init params
	function optionalParam(pos, value) {
		return parseInt(phantom.args[pos]) || value;
	}

	var url = phantom.args[0];
	var outputFolder = phantom.args[1];
	var transitionWait = optionalParam(2, 50)
	var width = optionalParam(3, 1024)
	var height = optionalParam(4, width * 3/4)

	// configuring phantom
	var page = require('webpage').create();
	page.viewportSize = { width: width, height: height };

	// open pages
	console.log('Opening slides at ' + url);
	page.open(url, function () {

		// prevent recalling this callback
		// (see phantomjs issue https://code.google.com/p/phantomjs/issues/detail?id=353)
		if (arguments.callee.called) return;
		arguments.callee.called = true;

		// script
		console.log('Slides opened.');

		var i = 1;
		var lastRender = undefined;

		// do each slide screenshot. waits 0.5s for transitions
		setTimeout(function(){
			// render to string so we can compare visual changes
			var currentRender = page.renderBase64('PNG');

			// stops if last slide was reached
			if (currentRender == lastRender) {
				console.log('Render finished.');
				phantom.exit();
				return;
			}

			// render correct PNG file to output folder
			console.log('Rendering slide #' + i);
			page.render(outputFolder + '/slide' + ("" + (i + 10000)).substring(1) + '.png');

			// navigate to next slide
			page.sendEvent('keypress', page.event.key['Right']);

			// render next slide
			lastRender = currentRender;	
			i++;
			setTimeout(arguments.callee, transitionWait);

		}, transitionWait);
	});
})();