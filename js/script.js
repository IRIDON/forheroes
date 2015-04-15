$(window).load(function() {
});

$(document).ready(function() {
	var api = [{"id":1,"description":"Ми збираємо на амуніцію для наших героїв","destination":"Ми збираємо на форму, тактичне взуття, нижню білизну, розвантаження, бронежилети та ін. в підрозділи, які знаходяться на передовій і потребує допомоги найбільше.","default_amount":300.00,"amount":0.00,"required_amount":50000,"currency":"грн.","status":"Open","images":[{"image_name":"img-1.jpg","image_description":"1Блок пост за Артёмовском. Февраль 2015. \n"}, 
 {"image_name":"img-2.jpg","image_description":"Центральный госпиталь. Артёмовск. Февраль 2015. "}]}, 
 {"id":2,"description":"Ми збираємо на лікування наших героїв","destination":"Ми збираємо на форму, тактичне взуття, нижню білизну, розвантаження, бронежилети та ін. в підрозділи, які знаходяться на передовій і потребує допомоги найбільше.","default_amount":400.00,"amount":26.55,"required_amount":100000,"currency":"грн.","status":"Open","images":[{"image_name":"img-1.jpg","image_description":"2Блок пост за Артёмовском. Февраль 2015. \n"}, 
 {"image_name":"img-2.jpg","image_description":"Центральный госпиталь. Артёмовск. Февраль 2015. "}]}, 
 {"id":3,"description":"Ми збираємо на оптику для наших героїв","destination":"Ми збираємо на біноклі, прилади нічного бачення, коліматорні приціли, тепловізори в підрозділи, які знаходяться на передовій і потребує допомоги найбільше.","default_amount":300.00,"amount":0.00,"required_amount":120000,"currency":"грн.","status":"Open","images":[{"image_name":"img-1.jpg","image_description":"3Блок пост за Артёмовском. Февраль 2015. \n"}, 
 {"image_name":"img-2.jpg","image_description":"Центральный госпиталь. Артёмовск. Февраль 2015. "}]}, 
 {"id":4,"description":"Ми збираємо на пікап для наших героїв","destination":"Ми збираємо на пікап для розвідників Правого Сектора для виконання бойових завдань в районі донецького аеропорту.","default_amount":400.00,"amount":0.00,"required_amount":150000,"currency":"грн.","status":"Open","images":[{"image_name":"img-1.jpg","image_description":"4Блок пост за Артёмовском. Февраль 2015. \n"}, 
 {"image_name":"img-2.jpg","image_description":"Центральный госпиталь. Артёмовск. Февраль 2015. "}]}, 
 {"id":5,"description":"Ми збираємо на рації для наших героїв","destination":"Ми збираємо на рації в підрозділи, які знаходяться на передовій і потребує допомоги найбільше.","default_amount":50.00,"amount":0.00,"required_amount":30000,"currency":"грн.","status":"Open","images":[{"image_name":"img-1.jpg","image_description":"Блок пост за Артёмовском. Февраль 2015. \n"}, 
 {"image_name":"img-2.jpg","image_description":"Центральный госпиталь. Артёмовск. Февраль 2015. "}]}];

 	var blockPatern = $('.js-block').html();
	var key = blockPatern.match(/\{\w*\}/g);

	var printBlock = '';

	for (var i = 0; i < api.length; i++) {
		printBlock = blockPatern;

		for (var j = 0; j < key.length; j++) {
			var id = key[j].replace(/\W/g, '');

			if ( typeof( api[i][id] ) != 'object' ) {
				printBlock = printBlock.replace(key[j], api[i][id]);
			} else {
				printBlock = printBlock.replace( key[j], createGalery( api[i][id] ) );
			}
			
		};

		$('.js-block').after('<section class="main-b" data-id="">'+printBlock+'</section>');
	};

	$('.js-block').remove();


	function createGalery(arr) {
		var result = [];

		for (var i = 0; i < arr.length; i++) {
			result.push('<div class="galery-b__i"><a href="http://app.forheroes.org.ua:8082/images/'+arr[i]['image_name']+'"><img src="http://app.forheroes.org.ua:8082/images/'+arr[i]['image_name']+'" width="240" height="180" alt="'+arr[i]['image_description']+'"></a></div>');
		};

		return result.join('');
	}
});