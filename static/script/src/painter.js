(function(){

	/* ---------------------------- 
	 * APP STATE
	 * ---------------------------- */

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

		// palette properties
		el: document.querySelector('#palette'),
		swatches: {
			el: document.querySelectorAll('.swatch')
		},

		// palette internal methods
		move: function(){

		},

		selectColor: function(element){
			var color;
			color = element.getAttribute('data-color');

			// remove active class from other swatches
			// todo - find more efficient way to remove previous swatche active class
			[].forEach.call(palette.swatches.el, function(swatch) {
				swatch.classList.remove('active');
			});
			
			// set current color globally and highlight in the palette
			state.currentColor = color;
			element.classList.add('active');
		},
		
		// palette handlers
		onMouseDown: function (e) {
			var targetEl = e.target;

			// use event delegation to determine what to do 
			if (targetEl.classList.contains('swatch')){		// user has clicked on a swatch
				palette.selectColor(targetEl);
			}
		}

	};

	/* -------------- 
	 * CANVAS
	 * -------------- */

	var canvas = {

		// canvas properties
		el : document.querySelector('#canvas'),
		pixels: {
			el: document.querySelectorAll('.pixel'),
			vertical: 4,
			horizontal: 4,
			size:25 // percent
		},

		// canvas internal methods
		render: function(pixels) {
			console.log(pixels);
		},

		// canvas handlers
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

		// Painter internal methods

		// general function to paint a single element
		paint: function (element, color) {
			element.setAttribute('data-color', color);
		},
	
		// Painter handlers

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
	 * Initialize
	 * --------------------- */

	 function init(){

		// Attach palette handlers
		palette.el.addEventListener('mousedown', palette.onMouseDown, false);

		// Attach canvas painting handlers
		canvas.el.addEventListener('mousedown', painter.onPaint, false);
		canvas.el.addEventListener('mouseup', painter.onPaint, false);
		canvas.el.addEventListener('mouseover', painter.onPaintHover, false);

		// Attach canvas structure handlers
		// dom.pixelsVertical.addEventListener('keyup', canvas.onUpdatePixelCount, false);
	 	
	 }

	 init();



	/* TODOS:
		- resize and reposition palette (use flexbox)
		- select different canvas sizes
		- update cursor imagery to reflect current color (and eventually, tool)
		- perhaps use flexbox on canvas too

	*/




})();