
function wb_form_validateForm(formId, values, errors) {
	var form = $("input[name='wb_form_id'][value='" + formId + "']").parent();
	if (!form || form.length === 0 || !errors) return;
	
	form.find("input[name],textarea[name]").css({backgroundColor: ""});
	
	if (errors.required) {
		for (var i = 0; i < errors.required.length; i++) {
			var name = errors.required[i];
			var elem = form.find("input[name='" + name + "'],textarea[name='" + name + "'],select[name='" + name + "']");
			elem.css({backgroundColor: "#ff8c8c"});
		}
	}
	
	if (Object.keys(errors).length) {
		for (var k in values) {
			var elem = form.find("input[name='" + k + "'],textarea[name='" + k + "'],select[name='" + k + "']");
			elem.val(values[k]);
		}
	}
}

function isTouchDevice() {
	return ('ontouchstart' in document.documentElement) && (
		navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		|| navigator.userAgent.match(/Opera Mini/i)
		|| navigator.userAgent.match(/IEMobile/i)
	);
}

function wb_show_alert(message, type) {
	var prompt = $("<div>")
		.addClass("alert alert-wb-form alert-" + type)
		.append(message)
		.prepend($("<button>").addClass("close")
			.html("&nbsp;&times;")
			.on("click", function() { $(this).parent().remove(); })
		)
	.appendTo("body");
	setTimeout(function() { prompt.animate({ opacity: 1, right: 0 }, 250); }, 250);
}

(function() {
	var popupInited = false;
	
	var loader, container, popup,
		iframe, closeBtn, isVisible;

	var setPopupVisible = function(visible) {
		isVisible = !!visible;
		if (isVisible) {
			container.show();
			setTimeout(function() { container.addClass('visible'); }, 10);
		} else {
			container.removeClass('visible');
			setTimeout(function() { container.hide(); }, 300);
		}
	};

	window.wb_show_popup = function(url, width, height) {
		if (!popupInited) {
			var closePopup = function() {
				iframe.attr('src', '');
				setPopupVisible(false);
			};
			popupInited = true;
			container = $('<div class="wb-popup-container">');
			popup = $('<div class="wb-popup">');
			loader = $('<div class="wb-popup-loader">').hide();
			$('<div class="ico-spin spinner">').appendTo(loader);
			iframe = $('<iframe>');
			closeBtn = $('<div class="wb-popup-btn-close">');
			closeBtn.on('click', closePopup);
			popup.append(loader);
			popup.append(closeBtn);
			popup.append(iframe);
			popup.appendTo(container);
			container.appendTo('body');
			$(document).on('keydown', function(e) {
				if (e.keyCode === 27) { // Esc
					if (isVisible) closePopup();
				}
			});
			if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
				popup.attr('style', '-webkit-overflow-scrolling: touch; overflow-y: auto;');
			}
		}
		width = width || 400;
		height = height || 320;
		loader.show();
		popup.css({ width: width + 'px', height: height + 'px' });
		iframe.on('load', function() {
			loader.hide();
		});
		iframe.attr('src', url);
		setPopupVisible(true);
	};
	
	$(window).on('message', function(e) {
		var eData = e.originalEvent.data;
		if (eData && typeof(eData) === 'object' && eData.data && typeof(eData.data) === 'object') {
			var event = eData.event, data = eData.data;
			if (event === 'wb_contact_form_sent') {
				var type = data.type ? data.type : 'success';
				if (data.state) wb_show_alert(data.state, type);
				if (type === 'success') {
					setPopupVisible(false);
				}
			}
		}
	});
})();

(function() {
	var params = [];
	
	var i, part;
	var qs_parts = location.search.replace(/^\?/, '').split('&');
	for (i = 0; i < qs_parts.length; i++) {
		part = qs_parts[i].split('=');
		if (part.length === 2) {
			params[decodeURIComponent(part[0])] = decodeURIComponent(part[1]);
		}
	}
	
	window.wb_get_query_param = function(key) {
		return (key && (key in params)) ? params[key] : null;
	};
})();

$(function() {
	// fix for forms in Instagram browser
	if (navigator.userAgent.indexOf('Instagram') > -1) {
		$('form').each(function() {
			if (this.method && this.method.toLowerCase() === 'post'
					&& this.target && this.target === '_blank') {
				$(this).removeAttr('target');
			}
		});
	}
	
	(function() {
		var extractYoutubeId = function(url) {
			var id = null;
			if (/^https?:\/\/.*youtube.*/i.test(url)) {
				var parts = url.split('?');
				if (parts.length > 1) {
					var parts2 = parts[1].split('&');
					for (var i = 0; i < parts2.length; i++) {
						var keyVal = parts2[i].split('=');
						if (keyVal.length > 1) {
							if (keyVal[0] === 'v' && keyVal[1]) {
								id = keyVal[1];
								break;
							}
						}
					}
				}
			}
			else if (/^(?:https?:\/\/|)youtu\.be\/(.+)$/i.test(url)) {
				id = RegExp.$1;
			}
			if (id) {
				id = id.replace(/[^a-zA-Z0-9\_\-]/, '');
			}
			return id;
		};
		
		$('.wb_video_background').each(function() {
			var videoContainer = $(this);
			var isSite = videoContainer.is('.wb_site_video_background');
			var url = videoContainer.data('video'),
				start = videoContainer.data('start'),
				end = videoContainer.data('end');

			if (!start) start = 0;
			if (!end) end = null;

			if (url) {
				var youtubeVideoId = extractYoutubeId(url);
				if (youtubeVideoId) {
					if (!window.YT) {
						$.getScript('https://www.youtube.com/iframe_api');
					}
					var onAPIReady = window.onYouTubeIframeAPIReady;
					window.onYouTubeIframeAPIReady = function() {
						if (typeof(onAPIReady) === 'function') onAPIReady();
						
						var youtubeElementId = videoContainer.attr('id') + '_youtube_container';
						var player = $('<div class="wb-youtube-video">' +
											'<div class="youtube" id="' + youtubeElementId + '"></div>' +
										'</div>');
						videoContainer.append(player);
						var viewportCont = isSite ? $(window) : videoContainer;
						var lastWidth, lastHeight;
						var innerCont = null;
						var inited = false;
						var resizer = function() {
							if (!innerCont) innerCont = player.children('iframe.youtube');
							if (!innerCont.length) return;
							
							var w = viewportCont.width() + 200,
								h = viewportCont.height() + 200;
							if (lastWidth === w && lastHeight === h)
								return;
							lastWidth = w; lastHeight = h;
							if (w / h > 16/9) {
								youtube.setSize(w, w / 16*9);
								innerCont.css('left', 0);
							} else {
								youtube.setSize(h / 9*16, h);
								innerCont.css('left', -(innerCont.outerWidth() - w) / 2);
							}
						};
						$(window).on('resize', resizer);

						var initVideo = function(reload) {
							player.addClass('visible');
							clearInterval(timer);
							timer = setInterval(function() {
								youtube.seekTo(start);
								if (youtube.getPlayerState() !== YT.PlayerState.PLAYING)
									youtube.playVideo();
							}, ((end ? end : youtube.getDuration() - 0.5) - start) * 1000);
							if (reload) {
								youtube.seekTo(start);
								if (youtube.getPlayerState() !== YT.PlayerState.PLAYING)
									youtube.playVideo();
							}
						};

						var timer;
						var youtube = new YT.Player(youtubeElementId, {
							events: {
								playerVars: {
									autoplay: 0,
									autohide: 1,
									modestbranding: 0,
									rel: 0,
									showinfo: 0,
									controls: 0,
									disablekb: 1,
									enablejsapi: 0,
									iv_load_policy: 3
								},
								onReady: function() {
									youtube.loadVideoById({
										videoId: youtubeVideoId,
										startSeconds: start
									});
									youtube.mute();
									resizer();
								},
								onStateChange: function(e) {
									if (e.data === YT.PlayerState.PLAYING) {
										if (!inited) {
											initVideo();
											inited = true;
										}
									} else if (e.data === YT.PlayerState.ENDED) {
										initVideo(true);
									}
								}
							}
						});
					};
				}
				else {
					var video = $('<video class="wb-video" muted playsinline>');
					var loaded = false;
					var ratio;
					var lastWidth, lastHeight;
					videoContainer.append(video);
					
					var resizer = function() {
						if (!ratio) return;
						var ew = videoContainer.width();
						var eh = videoContainer.height();
						if (lastWidth && lastWidth === ew && lastHeight && lastHeight === eh)
							return;
						lastWidth = ew; lastHeight = eh;
						var er = ew / eh;
						var nw = 0, nh = 0, nl = 0, nt = 0;
						if (ratio > er) {
							nh = eh;
							nw = nh * ratio;
							nl = (nw - ew) / 2;
						} else if (ratio < eh) {
							nw = ew;
							nh = nw / ratio;
							nt = (nh - eh) / 2;
						} else {
							nw = ew;
							nh = eh;
						}
						video.css({width: nw, height: nh, left: -nl, top: -nt});
					};
					$(window).on('resize', resizer);
					
					video.get(0).autoplay = true;
					video.on('loadeddata', function() {
						if (loaded) return;
						loaded = true;
						setInterval(function() {
							video.get(0).currentTime = start;
							if (video.get(0).paused) video.get(0).play();
						}, ((end ? end : video.get(0).duration) - start) * 1000);
						video.get(0).currentTime = start;
						video.get(0).play();
						video.addClass('visible');
						ratio = (video.width() / video.height());
						resizer();
					});
					video.get(0).src = url;
				}
			}
		});
	})();
	
	var currLang = (('currLang' in window) && window.currLang) ? window.currLang : null;
	var useTrailingSlashes = (!('useTrailingSlashes' in window) || window.useTrailingSlashes);
	var disableRightClick = (('disableRightClick' in window) && window.disableRightClick);
	var isSiteLanding = (('isSiteLanding' in window) && window.isSiteLanding);
	
	var openPopupPageUrl = (('openPopupPageUrl' in window) && window.openPopupPageUrl);
	var openPopupPageWidth = (('openPopupPageWidth' in window) && window.openPopupPageWidth);
	var openPopupPageHeight = (('openPopupPageHeight' in window) && window.openPopupPageHeight);
	
	if (disableRightClick) {
		$(document).on('contextmenu', function(e) { e.preventDefault(); });
	}
	
	var comboBoxes = $('.wb-combobox-controll');
	if (comboBoxes.length) {
		comboBoxes.each(function() {
			var thisCombo = $(this);
			var clickFunc = function() {
				var w = thisCombo.find('input').outerWidth();
				var mw = (menu = thisCombo.find('.dropdown-menu')).width();
				var ew = thisCombo.parent().outerWidth();
				if (mw < ew) menu.width(ew);
				menu.css({ marginLeft: (-w) + 'px' });
				thisCombo.find('.btn-group').toggleClass('open');
			};
			$(this).find('input').bind('click', clickFunc);
			$(this).find('.dropdown-toggle').bind('click', clickFunc);
		});
		
		$(document).bind('click', function(e) {
			var t = $(e.target);
			if (!t.is('.wb-combobox-controll')) {
				t = t.parents('.wb-combobox-controll');
				$.each($('.wb-combobox-controll'), function() {
					if (t.get(0) !== $(this).get(0)) {
						$(this).find('.btn-group').removeClass('open');
					}
				});
			}
		});
	}
	if (currLang) {
		$('.lang-selector').each(function() {
			var thisElem = $(this);
			var type = thisElem.attr('data-type');
			if (type === 'flags') {
				thisElem.find('a[data-lang="' + currLang + '"]').addClass('active');
			} else if (type === 'select') {
				var actLi = thisElem.find('li[data-lang="' + currLang + '"]');
				actLi.addClass('active');
				thisElem.find('input').val(actLi.find('a').html());
			}
		});
	}
	$('.btn-group.dropdown').each(function() {
		var ddh = $(this).height();
		var ddm = $(this).children('.dropdown-menu');
		ddm.addClass('open');
		var ddmh = ddm.height();
		ddm.removeClass('open');
		var ddt = $(this).offset().top;
		var dh = $(document).height();
		if (ddt + ddh + ddmh + 2 >= dh) {
			$(this).removeClass('dropdown').addClass('dropup');
		}
	});

	var closeMenus = function(ignoreMenu) {
		$('.wb-menu').each(function() {
			if( this == ignoreMenu )
				return;
			$(this).find('.over').removeClass('over over-out');
		});
	};

	$('body').on('touchstart', function(e) {
		var ignoreMenu = $(e.target).closest('.wb-menu');
		ignoreMenu = ignoreMenu.length ? ignoreMenu.get(0) : null;
		closeMenus(ignoreMenu);
	});

	$('.wb-menu').each(function() {
		var $menuContainer = $(this);
		var $menu = $menuContainer.children('ul');
		var ignoreHover = null;
		var isLanding = $menu.is('.menu-landing');
		var selectMenuItem = function($elem) {
			$elem.addClass('over');
			var $parent = $elem;
			while( $parent.length > 0 && $parent.is('li') ) {
				$parent.removeClass('over-out');
				$parent = $parent.parent().parent();
			}
			if( $menuContainer.is('.collapse-expanded') ) {
				$menu.find('.open-left').removeClass('open-left');
			}
			else {
				var $submenu = $elem.children('ul');
				if( $submenu.length ) {
					$parent = $elem.parent();
					if( $menu.is('.vmenu') && $parent.is('.open-left') ) {
						$submenu.addClass('open-left');
					}
					else {
						$submenu.removeClass('open-left');
						var ww = $(window).width();
						var w = $submenu.outerWidth(true);
						if( $submenu.offset().left + w >= ww )
							$submenu.addClass('open-left');
					}
					if( $submenu.offset().left < 0 )
						$submenu.removeClass('open-left');
				}
			}
		};
		var closeMenu = function() {
			$menu.find('li.over').addClass('over-out');
			setTimeout(function() {
				$menu.find('li.over-out').removeClass('over over-out');
			}, 10);
		};
		$menu
			.on('mouseover', 'li', function(e) {
				if( ignoreHover )
					return;
				selectMenuItem($(this));
			})
			.on('mouseout', 'li', function(e) {
				if( ignoreHover )
					return;
				closeMenu();
			})
			.on('touchstart', 'a', function(e) {
				var $elem = $(this).parent();
				var isOver = $elem.is('.over') || ($menuContainer.is('.collapse-expanded') && $elem.is('.active'));

				if( ignoreHover )
					clearTimeout(ignoreHover);
				ignoreHover = setTimeout(function() {ignoreHover = null;}, 2000);

				closeMenus($menuContainer.get(0));
				closeMenu();
				selectMenuItem($elem);

				if( isOver || $elem.children('ul').length == 0 ) {
					if( isLanding )
						e.stopImmediatePropagation();
				}
				else {
					e.stopImmediatePropagation();
					e.preventDefault();
				}
			})
		;
	});

	$('.wb-menu-mobile').each(function() {
		var elem = $(this);
		var btn = elem.children('.btn-collapser').eq(0);
		var isLanding = (elem.children('.menu-landing').length > 0 || elem.parents('.wb_header_fixed').length > 0);

		var onResize = function() {
			var ul = elem.children('ul');
			ul.css('max-height', ($(window).scrollTop() - ul.offset().top + $(window).height() - 20) + 'px');
		};
		
		var updateMenuPosition = function() {
			elem.children('ul').css({top: (btn.offset().top + btn.outerHeight() - $(window).scrollTop()) + 'px'});
		};
		
		btn.on('click', function(e) {
			if (elem.hasClass('collapse-expanded')) {
				elem.removeClass('collapse-expanded');
			} else {
				elem.addClass('collapse-expanded');
				updateMenuPosition();
				if (isLanding) onResize();
			}
		});
		$(document).on('click', function(e) {
			if (!$(e.target).is('#' + elem.attr('id') + ', #' + elem.attr('id') + ' *')) {
				if (elem.hasClass('collapse-expanded')) {
					elem.removeClass('collapse-expanded');
				}
				e.stopPropagation();
			}
		});
		
		$(window).scroll(function() { updateMenuPosition(); });
		
		if( isLanding ) {
			$(window).on('resize', onResize);
			elem.find('li').on('click', function() {
				elem.removeClass('collapse-expanded');
			});
		}
	});
	
	if ($('.menu-landing').length) {
		var scrolled = false;
		var activateMenuItem = function(item) {
			while( item.length > 0 && item.is('li') ) {
				item.addClass('active');
				item = item.parent().parent();
			}
		};
		var switchLandingPage = function(alias, ln, scroll) {
			ln = ln || currLang;
			var href = ln ? ln + (useTrailingSlashes ? '/' : '') + '#' + alias : '#' + alias;
			var anchor;
			$('.wb_page_anchor').each(function() {
				if (alias === this.name || encodeURIComponent(alias) === this.name
						|| alias === encodeURIComponent(this.name)) {
					anchor = $(this);
					return false;
				}
			});
			if (anchor && anchor.length) {
				if (scroll) {
					anchor.attr('name', '');
					setTimeout(function() {
						anchor.attr('name', alias);
					}, 10);
					scrolled = true;
					$('html, body').animate({ scrollTop: anchor.offset().top + 'px' }, 540, function() {
						setTimeout(function() { scrolled = false; }, 100);
					});
				}
			}
			var item = $('.menu-landing li a[href="' + href + '"]').parent();
			$('.menu-landing li').removeClass('active');
			if (item.length) {
				activateMenuItem(item);
			}
		};
		$('.menu-landing li a').on('click', function() {
			var href = $(this).attr('href'), parts = href.split('#'),
				ln = parts[0] ? parts[0].replace(/\/$/, '') : null,
				alias = parts[1];
				
			if (/^(?:http|https):\/\//.test(href)) return true;
			switchLandingPage(alias, ln, true);
		});
		$(window).on('hashchange', function() {
			var link = $('.menu-landing li a[href="' + location.hash + '"]');
			if (link.length) {
				var item = link.parent();
				activateMenuItem(item);
			}
		});
		$(window).bind('scroll', function() {
			if (scrolled) return false;
			var anchors = $('.wb_page_anchor');
			$(anchors.get().reverse()).each(function() {
				if ($(this).offset().top <= $(window).scrollTop() + $('#wb_header').height()) {
					var alias = $(this).attr('name');
					switchLandingPage(alias);
					return false;
				}
			});
		});
		$(window).trigger('hashchange');
	}
	
	$(document).on('mousedown', '.ecwid a', function() {
		var href = $(this).attr('href');
		if (href && href.indexOf('#!') === 0) {
			var url = decodeURIComponent(location.pathname) + href;
			$(this).attr('href', url);
		}
	});

	var applyAutoHeight = function(selector, getElementsCallback, getShapesCallback) {
		$(selector).each(function() {
			var currentTop = null;
			var expectedShapes = null;
			var maxHeight = {};
			var forcedHeight = {};
			var elemCount = {};
			var $elements = getElementsCallback($(this));
			var hasErrors = false;
			$elements.each(function() {
				var i;
				var $elem = $(this);
				var shapes = $elem.data('shapes');
				if( !shapes ) {
					var $shapes = getShapesCallback($elem);
					if( $shapes.length == 0 || (expectedShapes !== null && expectedShapes != $shapes.length) ) {
						hasErrors = true;
						return false;
					}
					shapes = [];
					for( i = 0; i < $shapes.length; i++ ) {
						var $shape = $($shapes.get(0));
						shapes[i] = {
							isMap: $shape.is('.wb-map'),
							elem: $shape
						};
					}
					$elem.data('shapes', shapes);
				}
				expectedShapes = shapes.length;
				for( i = expectedShapes - 1; i >= 0; i-- ) {
					if( !shapes[i].isMap )
						shapes[i].elem.css('height', '');
				}
				var top = Math.round($elem.offset().top / 5);
				if( top !== currentTop )
					$elem.css('clear', 'left'); // This is needed to fit more elements on same y position.
				currentTop = Math.round($elem.offset().top / 5);
				$elem.data('aht', currentTop);
				if( !maxHeight.hasOwnProperty(currentTop) ) {
					maxHeight[currentTop] = [];
					for( i = 0; i < expectedShapes; i++ )
						maxHeight[currentTop][i] = 0;
					forcedHeight[currentTop] = false;
					elemCount[currentTop] = 0;
				}
				if( !forcedHeight[currentTop] ) {
					for( i = expectedShapes - 1; i >= 0; i-- ) {
						if( shapes[i].isMap ) {
							maxHeight[currentTop][i] = shapes[i].elem.outerHeight();
							forcedHeight[currentTop] = true; // map element height has top priority
							break;
						}
						else
							maxHeight[currentTop][i] = Math.max(maxHeight[currentTop][i], shapes[i].elem.outerHeight());
					}
				}
				elemCount[currentTop]++;
			});
			if( hasErrors )
				return;
			$elements.each(function() {
				var $elem = $(this);
				var shapes = $elem.data('shapes');
				var aht = $elem.data('aht');
				$elem.css('clear', '');
				if( elemCount[aht] < 2 )
					return;
				for( var i = expectedShapes - 1; i >= 0; i-- )
					if( !shapes[i].isMap )
						shapes[i].elem.css('height', maxHeight[aht][i]);
			});
		});
		if (isSiteLanding) {
			$('#wb_main').children('.wb_page').each(function() {
				var bg, pageId = $(this).attr('id'); pageId = pageId.replace(/page_(\d+)$/, '$1');
				if ((bg = $('#wb_page_' + pageId + '_bg')).length) {
					bg.css('height', $(this).outerHeight() + 'px');
				}
			});
		}
		if ($('.wb_header_fixed').length) {
			var headerH = $('.wb_header_fixed').outerHeight(true);
			$('#wb_main').css('padding-top', headerH + 'px');
			$('#wb_main .wb_cont_outer').css('top', headerH + 'px');
			$('#wb_header_bg').css('height', headerH + 'px');
			$('#wb_sbg_placeholder').css('height', headerH + 'px');
		}
	};

	var recalcAutoHeightColumns = function() {
		applyAutoHeight('.auto-height', function($cont) {
			return $cont.children('.wb-cs-col');
		}, function($elem) {
			return $elem.children();
		});

		applyAutoHeight('.auto-height2', function($cont) {
			return $cont.children('.wb-cs-col');
		}, function($elem) {
			return $elem.children('.wb-cs-row').children('.wb-cs-col').children('.wb_element_shape');
		});
	};
	
	$(window).on('resize', recalcAutoHeightColumns);
	$(document).ready(recalcAutoHeightColumns);
	setTimeout(recalcAutoHeightColumns, 100);
	recalcAutoHeightColumns();
	
	(function() {
		
		var getMinContentHeight = function(elems) {
			var totalH = 0;
			elems.each(function() {
				if ($(this).is(':not(:visible)')) return true;
				var h = $(this).outerHeight();
				var t = parseInt($(this).css('top')); if (isNaN(t)) t = 0;
				totalH = Math.max((h + t), totalH);
			});
			return totalH;
		};

		var lastContentWidth = null, currentContentWidth = null;
		var applyModeAutoHeight = function(force) {
			currentContentWidth = $('.wb_cont_inner').outerWidth();
			if (!force && currentContentWidth === lastContentWidth) return;
			lastContentWidth = currentContentWidth;
			
			if (!('wbIsAutoLayout' in window)) window.wbIsAutoLayout = ($('.wb-cs-row').length > 0);
			if (window.wbIsAutoLayout) return;

			if (isSiteLanding) {
				$('#wb_main > .wb_cont_inner').find('.wb_page').each(function() {
					var bg = null;
					var $this = $(this);
					var pageId = parseInt($this.attr('id').replace(/^page_/, '')); if (isNaN(pageId)) return true;
					var minH = getMinContentHeight($this.children('.wb_element'));
					var outerMinH = getMinContentHeight($('#page_' + pageId + 'e').children('.wb_element'));
					var totalMinH = Math.max(minH, outerMinH);
					var paddingB = parseInt($this.css('padding-bottom')); if (isNaN(paddingB)) paddingB = 0;
					$this.css('height', totalMinH + 'px');
					$("#" + $this.attr('id') + "e").css('height', totalMinH + 'px');
					if ((bg = $('#wb_page_' + pageId + '_bg')).length) {
						bg.css('height', (totalMinH + paddingB) + 'px');
					}
				});
			} else {
				var paddingT = parseInt($('#wb_main').css('padding-top')); if (isNaN(paddingT)) paddingT = 0;
				var paddingB = parseInt($('#wb_main').css('padding-bottom')); if (isNaN(paddingB)) paddingB = 0;
				$('#wb_main').css('height', (getMinContentHeight($('#wb_main').find('.wb_element')) + paddingB + paddingT) + 'px');
			}
			var rootH = 0;
			$('.root').children('.wb_container').each(function() {
				if ($(this).hasClass('wb_header_fixed')) return true;
				rootH += $(this).outerHeight();
			});
//			$('body, .root, .wb_sbg').css({ height: (rootH + 'px'), minHeight: (rootH + 'px') });
		};
		
		$(window).on('resize', function() { applyModeAutoHeight(); });
		$(document).ready(function() { applyModeAutoHeight(true); });
		setTimeout(function() { applyModeAutoHeight(true); }, 100);
		window.applyModeAutoHeight = applyModeAutoHeight;
	})();
	
	(function() {
		var header = $('.wb_header_fixed');
		if (header.length) {
			var applyTopToAnchors = function() {
				var header = $('.wb_header_fixed');
				$('.wb_anchor').css('top', (-header.outerHeight()) + 'px');
			};
			$(window).on('resize', applyTopToAnchors);
			applyTopToAnchors();
			setTimeout(function() {
				applyTopToAnchors();
			}, 100);
		}
	})();
	
	(function() {
		$('.wb_anchor').each(function() {
			try {
				var anchor = $(this);
				var target = $('[href="#' + this.name + '"]');
				if (!target.length)
					target = $('[href="#' + decodeURIComponent(this.name) + '"]');
				if (!target.length)
					target = $('[href="#' + encodeURIComponent(this.name) + '"]');
				if (target.length) {
					target.each(function() {
						if ($(this).attr('data-landing') === 'true') return true;
						$(this).on('click', function() {
							$(window).scrollTop(anchor.offset().top);
						});
					});
				}
			} catch (e) {}
		});
	})();
	
	(function() {
		if ($('.wb_form_captcha').length) {
			var resizeCaptcha = function() {
				$('.wb_form_captcha').each(function() {
					if ($(this).is(':visible')) {
						var form = $(this).parents('.wb_form');
						var cpw = $(this).children(':first').width();
						var tdw = form.width() - form.find('th:first').width();
						var scale = Math.min(tdw / cpw, 1), scaleCss = 'scale(' + scale + ')';
						$(this).css({
							'transform': scaleCss,
							'-o-transform': scaleCss,
							'-ms-transform': scaleCss,
							'-moz-transform': scaleCss,
							'-webkit-transform': scaleCss,
							'max-width': tdw + 'px'
						});
					}
				});
			};
			$(window).on('resize', resizeCaptcha);
			setTimeout(function() {
				resizeCaptcha();
			}, 500);
		}
	})();
	
	(function() {
		if (isSiteLanding) return;
		
		var header = $('#wb_header');
		var main = $('#wb_main');
		var footer = $('#wb_footer');
		
		var updateMainBlockHeight = function() {
			if (!main || !header || !footer) return;
			var minMainBlockHeight = window.innerHeight - header.outerHeight(true) - footer.outerHeight(true);
			var mainBlockHeight = parseInt(main.get(0).style.height);
			if (!mainBlockHeight) mainBlockHeight = 0;
			main.css('min-height', Math.max(minMainBlockHeight, mainBlockHeight) + 'px');
		};
		$(window).on('resize', updateMainBlockHeight);
		updateMainBlockHeight();
		setTimeout(function() { updateMainBlockHeight(); }, 100);
	})();
	
	(function() {
		var updatePositionFixed = function() {
			if (isTouchDevice()) {
				if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
					$('#wb_header_bg, #wb_bgs_cont > div, .wb_sbg, .wb_element_shape > .wb_shp').each(function() {
						$(this).addClass('wb-no-fixed-bg');
						$(this).css({'background-attachment': 'scroll'});
					});
				}
				var pageCssSheet, sheet;
				for (var i = 0; i < document.styleSheets.length; i++) {
					sheet = document.styleSheets[i];
					if (sheet.ownerNode && sheet.ownerNode.getAttribute('id') === 'wb-page-stylesheet') {
						pageCssSheet = sheet; break;
					}
				}
				if (!pageCssSheet) return;
				
				var rules = pageCssSheet.cssRules || pageCssSheet.rules;
				if (!rules) return;
				
				var fixedBgCss;
				for (i = 0; i < rules.length; i++) {
					if (rules[i].selectorText === 'body.site::before') {
						if (/\bfixed\b/i.test(rules[i].cssText)) {
							fixedBgCss = rules[i].cssText;
							pageCssSheet.deleteRule(i);
							break;
						}
					}
				}
				if (fixedBgCss) {
					var css = fixedBgCss.match(/\{(.+)\}/)[1].replace(/\bfixed\b/i, 'scroll');
					css += ' position: fixed';
					$('<div class="wb_fixed_bg_hack">').prependTo('body');
					pageCssSheet.addRule('.wb_fixed_bg_hack', css);
				}
			}
		};
		updatePositionFixed();
	})();
	
	(function() {
		var isPopupMode = (parseInt(wb_get_query_param('wbPopupMode')) === 1);
		
		var baseUrl = $('head base').attr('href');
		$('a').each(function() {
			var a = $(this);
			var href = a.attr('href');
			if (/^wb_popup:([^;]*);/.test(href)) {
				a.attr('href', 'javascript:void(0)');
				if (!isPopupMode) {
					var url = RegExp.$1, w, h;
					var parts = href.split(';');
					for (var i = 0; i < parts.length; i++) {
						var pp = parts[i].split('=');
						if (pp.length !== 2 || !parseInt(pp[1])) continue;
						if (pp[0] === 'w') w = parseInt(pp[1]);
						else if (pp[0] === 'h') h = parseInt(pp[1]);
					}
					if (!/^https?:\/\//.test(url)) {
						url = baseUrl + url;
					}
					(function(url, w, h) {
						a.on('click', function() {
							wb_show_popup(url, w, h);
						});
					})(url, w, h);
				}
			}
		});
		
		if (openPopupPageUrl && !isPopupMode) {
			setTimeout(function() {
				wb_show_popup(openPopupPageUrl, openPopupPageWidth, openPopupPageHeight);
			}, 1000);
		}
		
		var bodyLandingPage = $('body').attr('data-landing-page');
		$('#wb_bgs_cont #wb_page_' + bodyLandingPage + '_bg').show();
		$('#wb_main #page_' + bodyLandingPage).show();
		$('#wb_main #page_' + bodyLandingPage + 'e').show();
	})();
});
