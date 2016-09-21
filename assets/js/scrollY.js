var scrollY = function(y) {
	if (window.jQuery) {
		FB.Canvas.getPageInfo(function(pageInfo) {
			$({
					y: pageInfo.scrollTop
				})
				.animate({
					y: y
				}, {
					duration: 1000,
					step: function(offset) {
						FB.Canvas.scrollTo(0, offset);

					}
				});
		});
	} else {
		FB.Canvas.scrollTo(0, y);
		return false;
	}
};