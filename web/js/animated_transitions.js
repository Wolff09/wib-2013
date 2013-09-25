/* This code is an abused form of: http://tympanus.net/codrops/2013/05/07/a-collection-of-page-transitions/ */
/* all available class names can be found in /css/animations.css */

var	isAnimating = false,
	endCurrPage = false,
	endNextPage = false,
	animEndEventNames = {
		'WebkitAnimation' : 'webkitAnimationEnd',
		'OAnimation' : 'oAnimationEnd',
		'msAnimation' : 'MSAnimationEnd',
		'animation' : 'animationend'
	},
	// animation end event name
	animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
	// support css animations
	support = Modernizr.cssanimations,
	animationDefaultInClass = 'pt-page-rotateInNewspaper pt-page-delay500',
	animationDefaultOutClass = 'pt-page-rotateOutNewspaper';

function animated_transition(curr, next, inc, ouc) {
	if (!isAnimating && curr != next) {
		isAnimating = true;

		var $currPage = $(curr);
		var $nextPage = $(next).addClass( 'pt-page-current' );
		var outClass = ouc || animationDefaultOutClass;
		var inClass = inc || animationDefaultInClass;

		$currPage.addClass( outClass ).on( animEndEventName, function() {
			$currPage.off( animEndEventName );
			endCurrPage = true;
			if( endNextPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		$nextPage.addClass( inClass ).on( animEndEventName, function() {
			$nextPage.off( animEndEventName );
			endNextPage = true;
			if( endCurrPage ) {
				onEndAnimation( $currPage, $nextPage );
			}
		} );

		if( !support ) {
			onEndAnimation( $currPage, $nextPage );
		}
	}
}

function onEndAnimation( $outpage, $inpage ) {
	endCurrPage = false;
	endNextPage = false;
	resetPage( $outpage, $inpage );
	isAnimating = false;
}

function resetPage( $outpage, $inpage ) {
	// TODO: the classes here must exactly match!
	$outpage.attr('class', 'box pt-page');
	$inpage.attr('class', 'box pt-page pt-page-current');
}


/* Example transition pairs as found here (see above, too): http://tympanus.net/Development/PageTransitions/ */
// all available class names can be found in /css/animations.css
// in='pt-page-moveFromRight', out='pt-page-moveToLeft'
// in='pt-page-moveFromLeft', out='pt-page-moveToRight'
// in='pt-page-moveFromBottom', out='pt-page-moveToTop'
// in='pt-page-moveFromTop', out='pt-page-moveToBottom'
// in='pt-page-moveFromRight pt-page-ontop', out='pt-page-fade'
// in='pt-page-moveFromLeft pt-page-ontop', out='pt-page-fade'
// in='pt-page-moveFromBottom pt-page-ontop', out='pt-page-fade'
// in='pt-page-moveFromTop pt-page-ontop', out='pt-page-fade'
// in='pt-page-moveFromRightFade', out='pt-page-moveToLeftFade'
// in='pt-page-moveFromLeftFade', out='pt-page-moveToRightFade'
// in='pt-page-moveFromBottomFade', out='pt-page-moveToTopFade'
// in='pt-page-moveFromTopFade', out='pt-page-moveToBottomFade'
// in='pt-page-moveFromRight', out='pt-page-moveToLeftEasing pt-page-ontop'
// in='pt-page-moveFromLeft', out='pt-page-moveToRightEasing pt-page-ontop'
// in='pt-page-moveFromBottom', out='pt-page-moveToTopEasing pt-page-ontop'
// in='pt-page-moveFromTop', out='pt-page-moveToBottomEasing pt-page-ontop'
// in='pt-page-moveFromRight pt-page-ontop', out='pt-page-scaleDown'
// in='pt-page-moveFromLeft pt-page-ontop', out='pt-page-scaleDown'
// in='pt-page-moveFromBottom pt-page-ontop', out='pt-page-scaleDown'
// in='pt-page-moveFromTop pt-page-ontop', out='pt-page-scaleDown'
// in='pt-page-scaleUpDown pt-page-delay300', out='pt-page-scaleDown'
// in='pt-page-scaleUp pt-page-delay300', out='pt-page-scaleDownUp'
// in='pt-page-scaleUp', out='pt-page-moveToLeft pt-page-ontop'
// in='pt-page-scaleUp', out='pt-page-moveToRight pt-page-ontop'
// in='pt-page-scaleUp', out='pt-page-moveToTop pt-page-ontop'
// in='pt-page-scaleUp', out='pt-page-moveToBottom pt-page-ontop'
// in='pt-page-scaleUpCenter pt-page-delay400', out='pt-page-scaleDownCenter'
// in='pt-page-moveFromRight pt-page-delay200 pt-page-ontop', out='pt-page-rotateRightSideFirst'
// in='pt-page-moveFromLeft pt-page-delay200 pt-page-ontop', out='pt-page-rotateLeftSideFirst'
// in='pt-page-moveFromTop pt-page-delay200 pt-page-ontop', out='pt-page-rotateTopSideFirst'
// in='pt-page-moveFromBottom pt-page-delay200 pt-page-ontop', out='pt-page-rotateBottomSideFirst'
// in='pt-page-flipInLeft pt-page-delay500', out='pt-page-flipOutRight'
// in='pt-page-flipInRight pt-page-delay500', out='pt-page-flipOutLeft'
// in='pt-page-flipInBottom pt-page-delay500', out='pt-page-flipOutTop'
// in='pt-page-flipInTop pt-page-delay500', out='pt-page-flipOutBottom'
// in='pt-page-scaleUp', out='pt-page-rotateFall pt-page-ontop'
// in='pt-page-rotateInNewspaper pt-page-delay500', out='pt-page-rotateOutNewspaper'
// in='pt-page-moveFromRight', out='pt-page-rotatePushLeft'
// in='pt-page-moveFromLeft', out='pt-page-rotatePushRight'
// in='pt-page-moveFromBottom', out='pt-page-rotatePushTop'
// in='pt-page-moveFromTop', out='pt-page-rotatePushBottom'
// in='pt-page-rotatePullRight pt-page-delay180', out='pt-page-rotatePushLeft'
// in='pt-page-rotatePullLeft pt-page-delay180', out='pt-page-rotatePushRight'
// in='pt-page-rotatePullBottom pt-page-delay180', out='pt-page-rotatePushTop'
// in='pt-page-rotatePullTop pt-page-delay180', out='pt-page-rotatePushBottom'
// in='pt-page-moveFromRightFade', out='pt-page-rotateFoldLeft'
// in='pt-page-moveFromLeftFade', out='pt-page-rotateFoldRight'
// in='pt-page-moveFromBottomFade', out='pt-page-rotateFoldTop'
// in='pt-page-moveFromTopFade', out='pt-page-rotateFoldBottom'
// in='pt-page-rotateUnfoldLeft', out='pt-page-moveToRightFade'
// in='pt-page-rotateUnfoldRight', out='pt-page-moveToLeftFade'
// in='pt-page-rotateUnfoldTop', out='pt-page-moveToBottomFade'
// in='pt-page-rotateUnfoldBottom', out='pt-page-moveToTopFade'
// in='pt-page-rotateRoomLeftIn', out='pt-page-rotateRoomLeftOut pt-page-ontop'
// in='pt-page-rotateRoomRightIn', out='pt-page-rotateRoomRightOut pt-page-ontop'
// in='pt-page-rotateRoomTopIn', out='pt-page-rotateRoomTopOut pt-page-ontop'
// in='pt-page-rotateRoomBottomIn', out='pt-page-rotateRoomBottomOut pt-page-ontop'
// in='pt-page-rotateCubeLeftIn', out='pt-page-rotateCubeLeftOut pt-page-ontop'
// in='pt-page-rotateCubeRightIn', out='pt-page-rotateCubeRightOut pt-page-ontop'
// in='pt-page-rotateCubeTopIn', out='pt-page-rotateCubeTopOut pt-page-ontop'
// in='pt-page-rotateCubeBottomIn', out='pt-page-rotateCubeBottomOut pt-page-ontop'
// in='pt-page-rotateCarouselLeftIn', out='pt-page-rotateCarouselLeftOut pt-page-ontop'
// in='pt-page-rotateCarouselRightIn', out='pt-page-rotateCarouselRightOut pt-page-ontop'
// in='pt-page-rotateCarouselTopIn', out='pt-page-rotateCarouselTopOut pt-page-ontop'
// in='pt-page-rotateCarouselBottomIn', out='pt-page-rotateCarouselBottomOut pt-page-ontop'
// in='pt-page-rotateSidesIn pt-page-delay200', out='pt-page-rotateSidesOut'
// in='pt-page-rotateSlideIn', out='pt-page-rotateSlideOut'