(function(){

	// cache DOM elements
	var dom = {
		tool: document.querySelector('#tool'),
		swatches: document.querySelectorAll('.swatch'),
		pixels: document.querySelectorAll('.pixel'),
		palette: document.querySelector('#palette'),
		canvas: document.querySelector('#canvas'),
		pixelsVertical: document.querySelector('.pixel-count')
	};

	// cache state
	var state = {
		currentColor: 'red',
		currentTool: 'paintbrush',
		isPainting: false,
		pixels: {
			vertical: 4,
			horizontal: 4,
			size:25 // percent
		}
	};

	// util functions
	function paintPixel(pixel, color) {
		pixel.setAttribute('data-color', color);
	}

	function renderCanvas(pixels) {
		console.log(pixels);

	}

	// event handlers for palette and canvas
	function onColorSelect(e) {
		var color;
		var targetEl = e.target;

		if (targetEl.classList.contains('swatch')){
			color = targetEl.getAttribute('data-color');

			// set global current color
			state.currentColor = color;

			// remove active class from other swatches
			[].forEach.call(dom.swatches, function(swatch) {
				swatch.classList.remove('active');
			});
			
			// highlight active color
			targetEl.classList.add('active');
		}
	}

	function onPixelPaint(e) {
		var action = e.type.toLowerCase().slice(5);
		var targetEl = e.target;

		if (action === 'down') {
			state.isPainting = true;
		} else {
			state.isPainting = false;
		}

		if (targetEl.classList.contains('pixel')){
			paintPixel(targetEl, state.currentColor);
		}
	}

	function onPixelHover(e){
		var targetEl = e.target;

		if (targetEl.classList.contains('pixel') && state.isPainting){
			paintPixel(targetEl, state.currentColor);			
		}
	}

	function onUpdatePixelCount(e) {
		var targetEl = e.target;

		var direction = targetEl.getAttribute('data-direction');
		var amount = parseInt(targetEl.value, 10);

		if (typeof amount === 'number'){
			state.pixels[direction] = amount;
			renderCanvas(state.pixels);
		}

	}

	// Attach palette handlers
	dom.palette.addEventListener('mousedown', onColorSelect, false);

	// Attach canvas handlers
	dom.canvas.addEventListener('mousedown', onPixelPaint, false);
	dom.canvas.addEventListener('mouseup', onPixelPaint, false);
	dom.canvas.addEventListener('mouseover', onPixelHover, false);

	// Attach pixel resize handlers
	dom.pixelsVertical.addEventListener('keyup', onUpdatePixelCount, false);

	// dom.pixelCount.addEventListener('keyup', onUpdatePixelCount, false);



	/* TODOS:
		- resize and reposition palette (use flexbox)
		- select different canvas sizes
		- update cursor imagery to reflect current color (and eventually, tool)
		- perhaps use flexbox on canvas too

	*/




})();