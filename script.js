var resizeTimer;
var flipbookHTML;
var currentPage = 1;
var firstLoad = true;
var iOS_1 = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var iOS_2 = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

window.addEventListener('resize', function() {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function() {
		console.log('Resize Detected');
		// Done Resizing
		if(!firstLoad && !iOS_1 && !iOS_2){ //IPhone triggers the 'resize' listener when the user attempts to turn the page, causing the flipbook to rebuild itself, preventing the user from flipping through the pages
			initFB();
		}
	}, 250);
});

function saveHTML(){
	flipbookHTML = document.getElementById('flipbook').innerHTML;
}

function initFB(){
	console.log('INIT');
	if(!firstLoad && !iOS_1 && !iOS_2){
		console.log('DESTROY');
		$('#flipbook').turn('destroy');
	}
	document.getElementById('flipbook').innerHTML = flipbookHTML;
	var width = document.getElementById('fbSize').width;
	var height = document.getElementById('fbSize').height;
	console.log('width = ' + width);
	console.log('height = ' + height);
	if(width == 0 || height == 0){
		setTimeout(function(){
			initFB();
		}, 500);
	}
	else{
		$('#flipbook').turn({
			width: width,
			height: height,
			display: 'single'
		});
		if(firstLoad){
			firstLoad = false;
			setTimeout(function(){
				$('#flipbook').turn('peel', 'br');
			}, 500);
			setTimeout(function(){
				$('#flipbook').turn('next');
			}, 1500);
		}
		else{
			$('#flipbook').turn('page', currentPage);
		}
		$('#flipbook').removeClass('hidden');
		$('#flipbook').bind('turned', function(event, page, pageObject) {
			currentPage = page;
			$('#flipbook').turn('peel', 'br');
		});
	}
}