var topWindow = window.top;
var scrollPos = 0;
var scrollAmount = 0;
var scrollValue = 0;
var direction = 'forward';
var flipTime = true;
topWindow.addEventListener('scroll', function(){
	scrollValue = topWindow.document.documentElement.scrollTop || topWindow.document.body.scrollTop;
	if(scrollValue < scrollPos){
		scrollAmount = scrollAmount + (scrollPos - scrollValue);
	}
	else{
		scrollAmount = scrollAmount + (scrollValue - scrollPos);
	}
	scrollPos = scrollValue;
	if(scrollAmount >= spotible.api.getVariable('SCROLL_AMOUNT')){
		if(direction == 'forward' && flipTime){
			$('#flipbook').turn('next');
			flipTime = false;
			setTimeout(function(){ 
				flipTime = true;
			}, 500);
		}
		else if(flipTime){
			$('#flipbook').turn('previous');
			flipTime = false;
			setTimeout(function(){ 
				flipTime = true;
			}, 500);
		}
		scrollAmount = 0;
	}

	$('#flipbook').bind('first', function(event) {
		direction = 'forward';
	});

	$('#flipbook').bind('last', function(event) {
		direction = 'back';
	});
}, false);