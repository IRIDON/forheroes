$(document).ready(function() {

	var API = ( location.href.indexOf('forheroes.org.ua') == -1 ) ? 'data.json': 'http://app.forheroes.org.ua:8082/api/projects';
	
	if ( $('#projectBlock').length ) {
		$.ajax({ 
			type: 'GET', 
			dataType: 'json', 
			url: API, 
			success: function (data) {
				var source   = $('#projectBlock').html();
				var template = Handlebars.compile(source);
				var html = template(data);

				$('#projectBlockContainer').html(html);

				/* Get start project */
				var slideStart = 0;
				var projectId = getUrlVars()['project_id'];

				if (projectId != undefined) {
					slideStart = $('.js-mainSlider .slides').children('li[data-id="'+projectId+'"]').index();
				}

				/* Create slider */
				$('.js-mainSlider').flexslider({
					animation: "slide",
					slideshow: true,
					slideshowSpeed: 7000,
					pauseOnHover: true,
					animationLoop: false,
					startAt: slideStart
				});
			} 
		});
	}

	$('#toogleMenuBtn').on('click', function(event) {
		event.preventDefault();

		$(this).toggleClass('on');

		SendInfoGA('MobleMenu', ($(this).hasClass('on') ? 'show':'hidden' ) );
	});

	for (var i = 0; i < $('.js-headMenu a').length; i++) {
		var item = $('.js-headMenu a')[i];
		var href = item.href.replace(window.location.origin+'/', '');
		var loc = window.location.pathname.replace('/', '');

		href = (href === '') ? './' : href;
		
		if ( loc.indexOf(href) != -1 ) {
			item.classList.add('active');
		}
	};

	$(document).on('click', '.js-showDes', function(event) {
		event.preventDefault();

		$('.js-destination').toggleClass('on');

		var id = $(this).parents('.js-block').data('id');

		SendInfoGA('projectDestination', 'project-'+id );
	});

	$('.js-mainSlider').on('click', 'button', function() {
		var id = $(this).parents('.js-block').data('id');
		var price = $(this).parents('.js-block').find('input[name=amount]').val();

		SendInfoGA('projectSubmit', 'project-'+id, price);
	});

	$('.js-galery').on('click', 'a', function() {
		var id = $(this).parent('.js-block').data('id');

		SendInfoGA('projectGalery', 'project-'+id);
	});

	$('.js-social').on('click', 'a', function() {
		var val = $(this).attr('title');

		SendInfoGA('socialShare-'+val, $('.js-mainSlider').find('.flex-active-slide').data('id') );
	});
});

$(window).load(function() {
	$('body').removeClass('load');

	$('#fb-share').on('click', function(event) {
		event.preventDefault();

		var block = $('.js-mainSlider').find('.flex-active-slide');

		postToFeed(
			block.find('h1').text(),
			block.find('.js-destination').text(),
			window.location.origin+'?project_id='+block.data('id'),
			block.find('img').eq(0).parent('a').attr('href')
		);
	});

	window.fbAsyncInit = function() {
		FB.init({
		    appId: '863626517043636',
		    status: true,
		    cookie: true,
		    xfbml: true
		}); 
	};

	(function() {
		var e = document.createElement('script'); e.async = true;
		e.src = document.location.protocol +
		  '//connect.facebook.net/en_US/all.js';
		document.getElementById('fb-root').appendChild(e);
	}());

	function postToFeed(title, desc, url, image) {
		var obj = {
			method: 'feed',
			link: url,
			picture: image,
			name: title,
			description: desc
		};
		function callback(response){
			console.log(response)
		}
		FB.ui(obj, callback);
	}

	$('#tw-share').on('click', function(event) {
		event.preventDefault();

		var block = $('.js-mainSlider').find('.flex-active-slide');

 		url  = 'http://twitter.com/share?';
        url += 'text='      + encodeURIComponent(block.find('h1').text());
        url += '&url='      + encodeURIComponent(window.location.origin+'?project_id='+block.data('id'));
        url += '&counturl=' + encodeURIComponent(window.location.origin+'?project_id='+block.data('id'));

        window.open(url,'','toolbar=0,status=0,width=626,height=436');
	});
});

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
};

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
};

function eraseCookie(name) {
    createCookie(name,"",-1);
};

/* getUrlVars, USAGE: (example.com/index?var1=2&var2=2), getUrlVars()["var1"]
   ========================================================================== */
function getUrlVars() {
    vars = [];
    var el;
    var elems = unescape(window.location.href).slice(window.location.href.indexOf('?') + 1).split('&');
    
    for(var i = 0; i < elems.length; i++) {
        el = elems[i].split('=');
        vars.push(el[1]);
        vars[el[0]] = el[1];
    };
    
    return vars;
};

/* getInternetExplorerVersion
   ========================================================================== */
function getInternetExplorerVersion() {
    var rv = -1; // Return value assumes failure.

    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
    };

    return rv;
};

function SendInfoGA(group, lable, metod) {
	var metod = metod || 'Click';

	ga('send', 'event', group, metod, lable);
};
