(function(){

	/* ---------------------------- 
	 * DOM ELEMENTS & STATE
	 * ---------------------------- */
	 var dom = {
		tool: document.querySelector('#tool'),
		palette: document.querySelector('#palette'),
		canvas: document.querySelector('#canvas'),
		swatches: document.querySelectorAll('.swatch'),
		pixels: document.querySelectorAll('.pixel'),
		pixelsVertical: document.querySelector('.pixel-count')
	};
	var state = {
		currentColor: 'red',
		currentTool: 'paintbrush',
		isPainting: false,
		paletteIsMoving: false
	};

	/* -------------- 
	 * PALETTE
	 * -------------- */
	var palette = {
		move: function(){

		},
		selectColor: function(element){
			var color;
			color = element.getAttribute('data-color');

			// remove active class from other swatches
			// todo - find more efficient way to remove previous swatche active class
			[].forEach.call(dom.swatches, function(swatch) {
				swatch.classList.remove('active');
			});
			
			// set current color globally and highlight in the palette
			state.currentColor = color;
			element.classList.add('active');
		},

		// event handler for mousedown anywhere on the palette
		onPaletteMouseDown: function (e) {
			var targetEl = e.target;

			// use event delegation to determine what to do 
			if (targetEl.classList.contains('swatch')){
				// user has clicked on a swatch
				palette.selectColor(targetEl);

			} else if (targetEl.classList.contains('handle')) {
				// user has clicked on the handle and wants to move the palette
				console.log('moving palette');

			}
		}
	};

	/* -------------- 
	 * CANVAS
	 * -------------- */
	var canvas = {

		// canvas props
		pixels: {
			vertical: 4,
			horizontal: 4,
			size:25 // percent
		},

		// canvas methods
		render: function(pixels) {
			console.log(pixels);
		},
		onUpdatePixelCount: function(e) {
			var targetEl = e.target;

			var direction = targetEl.getAttribute('data-direction');
			var amount = parseInt(targetEl.value, 10);

			if (typeof amount === 'number'){
				canvas.pixels[direction] = amount;
				canvas.render(canvas.pixels);
			}
		}
	};

	/* --------------------- 
	 * PAINTING METHODS
	 * --------------------- */
	var painter = {

		// general function to paint a single element
		paint: function (element, color) {
			element.setAttribute('data-color', color);
		},
	
		// event handler for when painting on the canvas
		onPaint: function (e) {
			// Determine if current event is mousedown or mouseup
			var action = e.type.toLowerCase().slice(5);
			var targetEl = e.target;

			// set document state based on current mouse event. 
			if (action === 'down') {
				// mousedown: set isPainting to true and allow users to paint a range of pixels in one stroke
				state.isPainting = true;
			} else {
				// mouseup: turn off isPainting mode
				state.isPainting = false;
			}

			// event delegation - determine we've clicked on a pixel
			if (targetEl.classList.contains('pixel')){
				painter.paint(targetEl, state.currentColor);
			}
		},

		// Event handler to support painting a range of pixels in one stroke
		// works only if global state isPainting is true
		onPaintHover: function (e){
			var targetEl = e.target;

			if (targetEl.classList.contains('pixel') && state.isPainting){
				painter.paint(targetEl, state.currentColor);			
			}
		}

	};

	/* --------------------- 
	 * ATTACH EVENT HANDLERS
	 * --------------------- */

	// Palette handlers
	dom.palette.addEventListener('mousedown', palette.onPaletteMouseDown, false);

	// Canvas painting handlers
	dom.canvas.addEventListener('mousedown', painter.onPaint, false);
	dom.canvas.addEventListener('mouseup', painter.onPaint, false);
	dom.canvas.addEventListener('mouseover', painter.onPaintHover, false);

	// Canvas structure handlers
	dom.pixelsVertical.addEventListener('keyup', canvas.onUpdatePixelCount, false);



	/* TODOS:
		- resize and reposition palette (use flexbox)
		- select different canvas sizes
		- update cursor imagery to reflect current color (and eventually, tool)
		- perhaps use flexbox on canvas too

	*/




})();