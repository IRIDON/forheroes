var slideStart = 0;

$(document).ready(function() {
	var api = [{"id":1,"description":"Ми збираємо на амуніцію для наших героїв","destination":"Ми збираємо на форму, тактичне взуття, нижню білизну, розвантаження, бронежилети та ін. в підрозділи, які знаходяться на передовій і потребує допомоги найбільше.","default_amount":300.00,"amount":0.00,"required_amount":50000,"currency":"грн.","status":"Open","images":[{"image_name":"img-1.jpg","image_tmb_name":"img-1-tmb.jpg","image_description":"Блок пост за Артёмовском. Февраль 2015. \n"}, 
 {"image_name":"img-2.jpg","image_tmb_name":"img-2-tmb.jpg","image_description":"Центральный госпиталь. Артёмовск. Февраль 2015. "}]}, 
 {"id":2,"description":"Ми збираємо на лікування наших героїв","destination":"Ми збираємо на форму, тактичне взуття, нижню білизну, розвантаження, бронежилети та ін. в підрозділи, які знаходяться на передовій і потребує допомоги найбільше.","default_amount":400.00,"amount":26.55,"required_amount":100000,"currency":"грн.","status":"Open","images":[{"image_name":"img-1.jpg","image_tmb_name":"img-1-tmb.jpg","image_description":"Блок пост за Артёмовском. Февраль 2015. \n"}, 
 {"image_name":"img-2.jpg","image_tmb_name":"img-2-tmb.jpg","image_description":"Центральный госпиталь. Артёмовск. Февраль 2015. "}]}, 
 {"id":3,"description":"Ми збираємо на оптику для наших героїв","destination":"Ми збираємо на біноклі, прилади нічного бачення, коліматорні приціли, тепловізори в підрозділи, які знаходяться на передовій і потребує допомоги найбільше.","default_amount":300.00,"amount":0.00,"required_amount":120000,"currency":"грн.","status":"Open","images":[{"image_name":"img-1.jpg","image_tmb_name":"img-1-tmb.jpg","image_description":"Блок пост за Артёмовском. Февраль 2015. \n"}, 
 {"image_name":"img-2.jpg","image_tmb_name":"img-2-tmb.jpg","image_description":"Центральный госпиталь. Артёмовск. Февраль 2015. "}]}, 
 {"id":4,"description":"Ми збираємо на пікап для наших героїв","destination":"Ми збираємо на пікап для розвідників Правого Сектора для виконання бойових завдань в районі донецького аеропорту.","default_amount":400.00,"amount":0.00,"required_amount":150000,"currency":"грн.","status":"Open","images":[{"image_name":"img-1.jpg","image_tmb_name":"img-1-tmb.jpg","image_description":"Блок пост за Артёмовском. Февраль 2015. \n"}, 
 {"image_name":"img-2.jpg","image_tmb_name":"img-2-tmb.jpg","image_description":"Центральный госпиталь. Артёмовск. Февраль 2015. "}]}, 
 {"id":5,"description":"Ми збираємо на рації для наших героїв","destination":"Ми збираємо на рації в підрозділи, які знаходяться на передовій і потребує допомоги найбільше.","default_amount":50.00,"amount":0.00,"required_amount":30000,"currency":"грн.","status":"Open","images":[{"image_name":"img-1.jpg","image_tmb_name":"img-1-tmb.jpg","image_description":"Блок пост за Артёмовском. Февраль 2015. \n"}, 
 {"image_name":"img-2.jpg","image_tmb_name":"img-2-tmb.jpg","image_description":"Центральный госпиталь. Артёмовск. Февраль 2015. "}]}];


	var projecAgr = addContent(api);

	projecAgr.sort(function() {
		return (Math.round(Math.random())-0.5);
	});

	for (var i = 0; i < projecAgr.length; i++) {
		$('.js-mainSlider .slides').append(projecAgr[i]);
	};

	var projectId = getUrlVars()['project_id'];

	if (projectId != undefined) {
		slideStart = $('.js-mainSlider .slides').children('li[data-id="'+projectId+'"]').index();
	}

});

$(window).load(function() {
	$('.js-mainSlider').flexslider({
		animation: "slide",
		slideshow: false,
		animationLoop: false,
		startAt: slideStart
	});
});

function addContent(arg) {
	var result = [];
	var blockPatern = $('.js-block').html();
	var key = blockPatern.match(/\{\w*\}/g);
	var printBlock = '';

	for (var i = 0; i < arg.length; i++) {
		printBlock = blockPatern;

		for (var j = 0; j < key.length; j++) {
			var id = key[j].replace(/\W/g, '');
			var replaceId = '';

			if ( typeof( arg[i][id] ) != 'object' ) {
				replaceId = arg[i][id];
			} else {
				replaceId = createGalery( arg[i][id] );
			}

			printBlock = printBlock.replace( key[j], replaceId );
		};

		result.push('<li class="" data-id="'+arg[i]['id']+'">'+printBlock+'</li>');
	};

	$('.js-block').remove();

	return result;
}
function createGalery(arg) {
	var result = [];

	for (var i = 0; i < arg.length; i++) {
		result.push('<div class="galery-b__i"><a data-gallery href="http://app.forheroes.org.ua:8082/images/'+arg[i]['image_name']+'" target="_blank"><img src="http://app.forheroes.org.ua:8082/images/'+arg[i]['image_tmb_name']+'" width="240" height="180" alt="'+arg[i]['image_description']+'"></a></div>');
	};

	return result.join('');
}

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