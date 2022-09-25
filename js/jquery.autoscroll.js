(function test($) {
	let cookieInterval = (document.cookie).split('=').pop().split('-')[1];
	let cookieScroll = (document.cookie).split('=').pop().split('-')[0];
	$.fn.autoscroll = function(options) {
		var settings = $.extend({}, $.fn.autoscroll.defaults, options);
		return this.each(function() {
			var $this = $(this);
			//console.log(cookieScroll);
			//console.log($this[0].clientHeight - 150);
			if (($this.length > 0 && cookieScroll > $this[0].clientHeight - 150) || ($this.length > 0 && cookieScroll == $this[0].clientHeight - 150)) {
				var scrollTimer,
					scrollTop = 0;

				function scrollList() {
					var itemHeight = $this.children().eq(1).outerHeight(true);
					scrollTop++;
					if (scrollTop >= itemHeight) {
						$this.scrollTop(0).children().eq(0).appendTo($this);
						scrollTop = 0;
					} else {
						$this.scrollTop(scrollTop);
					}
				}

				$this.hover(function() {
					$this.css("overflow-y", "hidden");
					scrollTimer = setInterval(function() {
						scrollList();
					}, settings.interval);
					if($.type(settings.handlerOut) === "function") {
						settings.handlerOut();
					}
				}).trigger("mouseleave");
			}
		});
	}
	if(cookieInterval === 'spelendeWedstrijden'){
		$.fn.autoscroll.defaults = {
			interval: 95,  //25
			hideScrollbar: true,
			handlerIn: null,
			handlerOut: null

		};
	}else{
		$.fn.autoscroll.defaults = {
			interval: 25,  //25
			hideScrollbar: true,
			handlerIn: null,
			handlerOut: null

		};
	}
	$(function() {
		$("[data-autoscroll]").autoscroll();
	});
})(jQuery);
