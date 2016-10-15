(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var $window = $(window),
			$body = $('body'),
			$sidebar = $('#sidebar');

		// Hack: Enable IE flexbox workarounds.
		if (skel.vars.IEVersion < 12) {
			$body.addClass('is-ie');
		}

		// // Disable animations/transitions until the page has loaded.
		if (skel.canUse('transition')) {
			$body.addClass('is-loading');
		}

		$(document).ready(function() {
			window.setTimeout(function() {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Forms.

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Hack: Activate non-input submits.
		$('form').on('click', '.submit', function(event) {

			// Stop propagation, default.
			event.stopPropagation();
			event.preventDefault();

			// Submit form.
			$(this).parents('form').submit();

		});

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function() {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Sidebar.
		if ($sidebar.length > 0) {

			var $sidebarLink = $sidebar.find('a');

			$sidebarLink
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
					if ($this.attr('href').charAt(0) !== '#') {
						return;
					}

					// Deactivate all links.
					$sidebarLink.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

				})
				.each(function() {

					var $this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
					if ($section.length < 1) {
						return;
					}

					// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						initialize: function() {

							// Deactivate section.
							if (skel.canUse('transition') && id !== '#intro')
								$section.addClass('inactive');

							// First element
							if (id === '#intro') {
								$this.addClass('active');
							}


						},
						enter: function() {

							// Activate section.
							$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
							if ($sidebarLink.filter('.active-locked').length === 0) {

								$sidebarLink.removeClass('active');
								$this.addClass('active');

							}

							// Otherwise, if this section's link is the one that's locked, unlock it.
							else if ($this.hasClass('active-locked')) {
								$this.removeClass('active-locked');
							}

						}
					});

				});

		}

		// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				// If <=large, >small, and sidebar is present, use its height as the offset.
				if (skel.breakpoint('large').active &&
					!skel.breakpoint('small').active &&
					$sidebar.length > 0) {
						return $sidebar.height();
					}

				return 0;

			}
		});

		// Spotlights.
		if (skel.canUse('transition')) {
			$('.profiles > section')
			.scrollex({
				mode: 'middle',
				top: '-10vh',
				bottom: '-10vh',
				initialize: function() {
					console.log("hi");
					// Deactivate section.
					if (skel.canUse('transition')) {
						$(this).addClass('inactive');
					}

				},
				enter: function() {
					// Activate section.
					$(this).removeClass('inactive');
				}

			});
		}

		// Features.
		if (skel.canUse('transition')) {
			$('.features')
			.scrollex({
				mode: 'middle',
				top: '-20vh',
				bottom: '-20vh',
				initialize: function() {
					// Deactivate section.
					$(this).addClass('inactive');
				},
				enter: function() {
					// Activate section.
					$(this).removeClass('inactive');
				}
			});
		}

	});

})(jQuery);
